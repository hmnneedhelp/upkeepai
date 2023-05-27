from data_preprocessing import (
    create_df_1_2,
    columns_num_inc_model,
    # create_df_inc_cap,
    # columns_inc_cap_model,
)
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from catboost import CatBoostRegressor
import pandas as pd


def train_num_inc_model(df_1: pd.DataFrame, df_2: pd.DataFrame):
    """Train the Model for predict number of incidents for 1 year for every object"""

    target_col, num_cols, cat_cols = columns_num_inc_model()

    df = create_df_1_2(df_1, df_2)
    df = df[num_cols + cat_cols + target_col].drop_duplicates()

    # Сделаем разбиение оригинальных данных на тренировочную и тестовую выборку.
    X_train, X_test, y_train, y_test = train_test_split(
        df[num_cols + cat_cols], df[target_col], train_size=0.8, random_state=42
    )

    # Обучение модели.
    boosting_model = CatBoostRegressor(n_estimators=200, learning_rate=0.5)

    boosting_model.fit(X_train, y_train, cat_features=cat_cols)

    boosting_model.save_model("Data/num_inc_model")

    # Предсказания
    y_test_pred = boosting_model.predict(X_test)

    r2 = r2_score(y_test, y_test_pred.round())

    return r2

    # def train_cap_works_model():
    """Train the Model for predict names of works 
    for capital repair for 1 year for every object"""
