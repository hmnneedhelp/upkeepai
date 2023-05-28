from data_preprocessing import (
    create_df_1_2,
    columns_num_inc_model,
    create_df_inc_cap,
    columns_num_works_model,
)
from prediction import predict_num_inc_model
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from catboost import CatBoostRegressor
import pandas as pd
import numpy as np
import tensorflow as tf


def train_num_inc_model(df_1: pd.DataFrame, df_2: pd.DataFrame):
    """Train the Model for predict number of incidents for 1 year for every object"""

    target_col, num_cols, cat_cols = columns_num_inc_model()

    df = create_df_1_2(df_1, df_2)
    df = df[num_cols + cat_cols + target_col].drop_duplicates()

    # Сделаем разбиение оригинальных данных на тренировочную и тестовую выборку.
    X_train, X_test, y_train, y_test = train_test_split(
        df[num_cols + cat_cols], df[target_col], train_size=0.8, random_state=142
    )

    # Обучение модели.
    boosting_model = CatBoostRegressor(n_estimators=200, learning_rate=0.1)

    boosting_model.fit(X_train, y_train, cat_features=cat_cols)

    boosting_model.save_model("Data/num_inc_model")

    # Предсказания
    y_test_pred = boosting_model.predict(X_test)

    r2 = r2_score(y_test, y_test_pred.round())

    return r2


def train_cap_works_model(df_1, df_3, df_4):
    """Train the Model for predict names of works
    for capital repair for 1 year for every object"""

    # предскажем кол-во инцидентов для дома за год
    df = predict_num_inc_model(df_1)

    # предскажем кол-во инцидентов для дома за год
    df = create_df_inc_cap(df, df_3, df_4, train=True)

    # выбираем данные для обучения
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
    y = df[target_col]  # Вектор целевой переменной

    # Сделаем разбиение оригинальных данных на тренировочную и тестовую выборку.
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, train_size=0.8, random_state=42
    )

    # Создание модели нейросети
    model = tf.keras.models.Sequential(
        [
            tf.keras.layers.Dense(
                64, activation="relu", input_shape=(X_train.shape[1],)
            ),
            tf.keras.layers.Dense(64, activation="relu"),
            tf.keras.layers.Dense(
                19, activation="sigmoid"
            ),  # 19 выходных нейронов и активация sigmoid
        ]
    )

    # Компиляция модели
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

    # Обучение модели
    model.fit(X_train, y_train, epochs=30, batch_size=32)

    # Сохранение модели
    model.save("Data/num_works_model.h5")

    # ф-я потерь и метрика
    loss, accuracy = model.evaluate(X_test, y_test)

    return loss, accuracy
