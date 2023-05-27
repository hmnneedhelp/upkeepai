from catboost import CatBoostRegressor
import pandas as pd
from src.service.upkeep.model.data_preprocessing import (
    prepare_df_1,
    columns_num_inc_model,
)


def predict_num_inc_model(df_1: pd.DataFrame):
    """Predict number of incidents for 1 year for every object
    Preprocess df and add new column to initial df
    Return sorted by predicted_num_inc dataFrame with big number of predicted incidents
    """

    _, num_cols, cat_cols = columns_num_inc_model()
    df = prepare_df_1(df_1)
    X = df[num_cols + cat_cols]

    boosting_model = CatBoostRegressor()
    boosting_model.load_model("/app/backend/app/src/service/upkeep/model/num_inc_model")

    # Предсказания
    y_pred = boosting_model.predict(X).round()

    # кол-во заявок не мб отрицательным
    y_pred[y_pred < 0] = 0
    y_pred = y_pred.astype(int)

    # отсортируем дома по кол-ву предсказанных заявок
    df["predicted_num_inc"] = y_pred
    df_sorted = df.sort_values(by="predicted_num_inc", ascending=False)

    # для кап ремонта отберем те, по которым поступает много жалоб
    df_cap = df_sorted[df_sorted.predicted_num_inc > 300]

    return df_cap


def predict_by_house_and_inc(df_1: pd.DataFrame, df_2: pd.DataFrame):
    """find the best candidates to capital repare by incidents in previous year"""

    # Почистим табл с инцидентами
    df_incident = df_2[df_2["source"] != "ASUPR"]  # только жалобы, без датчиков
    df_incident = df_incident[["name", "source", "unom"]]  # нужные столбцы
    df_incident = df_incident.dropna()
    # оставим только подходящие нам источники данных для кап ремонта
    df_incident = df_incident.loc[df_incident["source"].isin(["EDC", "NG", "MGI"])]

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
        mask = df_incident["name"].str.contains(v)
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
