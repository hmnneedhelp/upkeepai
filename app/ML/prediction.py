from catboost import CatBoostRegressor
import pandas as pd
import numpy as np
import tensorflow as tf
from data_preprocessing import (
    prepare_df_1,
    columns_num_inc_model,
    create_df_inc_cap,
    columns_num_works_model,
)
from sklearn.preprocessing import StandardScaler


def predict_num_inc_model(df_1: pd.DataFrame):
    """Predict number of incidents for 1 year for every object
    Preprocess df and add new column to initial df
    Return dataFrame with number of predicted incidents"""

    df = prepare_df_1(df_1)

    _, num_cols, cat_cols = columns_num_inc_model()
    X = df[num_cols + cat_cols]

    boosting_model = CatBoostRegressor()
    boosting_model.load_model("Data/num_inc_model")

    # Предсказания
    y_pred = boosting_model.predict(X).round()

    df["num_inc_pred"] = y_pred

    return df


def predict_by_house(df_1, df_3, df_4):
    """find the best candidates to capital repare by prediction:
    num_incidents
    num capital works
    names of cap works"""

    # предскажем кол-во инцидентов для дома за год
    df = predict_num_inc_model(df_1)

    df = create_df_inc_cap(df, df_3, df_4, train=False)

    # выбираем данные
    target_col, num_cols, cat_cols = columns_num_works_model()

    # Разделение данных на числовые и категориальные признаки
    numerical_features = df[num_cols]
    categorical_features = df[cat_cols].applymap(int)

    # OHE
    # encoder = OneHotEncoder(handle_unknown='ignore')
    # categorical_features_encoded = encoder.fit_transform(categorical_features).toarray()

    # Масштабирование числовых признаков
    scaler = StandardScaler()
    numerical_features_scaled = scaler.fit_transform(numerical_features)
    categorical_features_scaled = scaler.fit_transform(categorical_features)

    # Объединение числовых и закодированных категориальных признаков
    X = np.concatenate((numerical_features_scaled, categorical_features_scaled), axis=1)

    # Загрузка модели
    model = tf.keras.models.load_model("Data/num_works_model.h5")

    # предскажем виды работ по кап ремонту
    threshold = 0.35  # Порог вероятности
    predictions = (model.predict(X) > threshold).astype(int)

    # трансформируем в вектор наименований работ
    works = []
    num_works = []
    for i in range(predictions.shape[0]):  # objects loop
        work_list_i = []
        num_works.append(predictions[i].sum())
        for j in range(predictions.shape[1]):  # works loop
            if predictions[i, j] == 1:
                work_list_i.append(target_col[j])
        works.append(work_list_i)

    df["num_works"] = num_works  # добавим число работ
    df["works"] = works

    df_prediction = df[["unom", "works", "num_works", "Год постройки", "Is_lift"]]

    # удалим лифты из работ, если в доме нет лифта

    df_prediction = df_prediction[["unom", "works", "num_works"]]
    df_prediction = df_prediction[df_prediction.num_works > 0]
    df_prediction = df_prediction.set_index(["unom"])
    df_prediction = df_prediction.sort_values(by="num_works", ascending=False)

    return df_prediction


def predict_by_house_and_inc(df_1: pd.DataFrame, df_2: pd.DataFrame):
    """find the best candidates to capital repare by incidents in previous year"""

    # Почистим табл с инцидентами
    df_incident = df_2[df_2["Источник"] != "ASUPR"]  # только жалобы, без датчиков
    df_incident = df_incident[["Наименование", "Источник", "unom"]]  # нужные столбцы
    df_incident = df_incident.dropna()
    # оставим только подходящие нам источники данных для кап ремонта
    df_incident = df_incident.loc[df_incident["Источник"].isin(["EDC", "NG", "MGI"])]

    work_inc_dict = {
        "замена лифтового оборудования": "Поломка лифта|Лифт требует ремонта",
        "ремонт внутридомовых инженерных сетей электроснабжения": "электр",
        "ремонт внутридомовых инженерных систем водоотведения (канализации) (выпуски и сборные трубопроводы)": "канализац|инженерн",
        "ремонт внутридомовых инженерных систем газоснабжения": "газ|инженерн",
        "ремонт внутридомовых инженерных систем горячего водоснабжения (разводящие магистрали)": "Отсутствие ГВС",
        "ремонт внутридомовых инженерных систем горячего водоснабжения (стояки)": "инженерн",
        "ремонт внутридомовых инженерных систем теплоснабжения (разводящие магистрали)": "отопл|инженерн",
        "ремонт внутридомовых инженерных систем теплоснабжения (стояки)": "тепл|инженерн",
        "ремонт внутридомовых инженерных систем холодного водоснабжения (разводящие магистрали)": "протечка|инженерн",
        "ремонт внутридомовых инженерных систем холодного водоснабжения (стояки)": "инженерн",
        "ремонт или замена мусоропровода": "техническое содержание мусоропровода",
        "ремонт крыши": "Повреждение кровли|ротечка с кровли",
        "ремонт подвальных помещений, относящихся к общему имуществу собственников помещений": "подвал|протечк",
        "ремонт подъездов, направленный на восстановление их надлежащего состояния и проводимый при выполнении иных работ": "протечка.+подъезд|двер",
        "ремонт пожарного водопровода": "пожарн",
        "ремонт фасада": "фасад",
        "ремонт фасада (замена оконных блоков, расположенных в помещениях общего пользования в многоквартирном доме)": "окн",
    }

    df_works = prepare_df_1(df_1)[["unom"]]
    for k, v in work_inc_dict.items():
        mask = df_incident["Наименование"].str.contains(v)
        df_works = df_works.merge(
            df_incident.loc[mask].groupby("unom").size().rename(k),
            how="left",
            on="unom",
        )
    df_works = df_works.fillna(0).astype(int)

    # будем учитывать только те работы, что имеют > 10 обращений
    df__ = df_works.copy()
    for col in df__.columns[1:]:
        df__[col].where(df__[col] > 10, 0, inplace=True)
        df__[col].where(df__[col] < 10, 1, inplace=True)

    df__ = df__.set_index(["unom"])
    # подсчитаем число работ для каждого дома
    df__["num_works"] = df__.sum(axis=1)

    # get predict
    works_list = list(df__.columns)[:-1]  # list of names works
    works = []  # len = number of unoms
    for i in df__.index:  # loop for unoms
        row_list = df__.loc[i, :].values.flatten().tolist()[:-1]  # vec of prediction
        work_list_i = []
        for j in range(len(row_list)):  # loop for columns (works)
            if row_list[j] == 1:
                work_list_i.append(works_list[j])
        works.append(work_list_i)
    df__["works_list"] = works

    # prediction
    df_prediction = df__[["works_list", "num_works"]]
    df_prediction = df_prediction[df_prediction.num_works != 0]
    df_prediction = df_prediction.sort_values(by="num_works", ascending=False)

    return df_prediction
