from catboost import CatBoostRegressor
import pandas as pd
from data_preprocessing import prepare_df_1, columns_num_inc_model


def predict_num_inc_model(df_1: pd.DataFrame):
    """Predict number of incidents for 1 year for every object
    Preprocess df and add new column to initial df
    Return sorted by predicted_num_inc dataFrame with big number of predicted incidents"""

    _, num_cols, cat_cols = columns_num_inc_model()
    df = prepare_df_1(df_1)
    X = df[num_cols + cat_cols]

    boosting_model = CatBoostRegressor()
    boosting_model.load_model("Data/num_inc_model")

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
