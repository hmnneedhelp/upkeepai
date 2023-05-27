from model_training import train_num_inc_model
from prediction import predict_num_inc_model, predict_by_house_and_inc
import pandas as pd

"""download the files"""
# load data for prediction
df_1 = pd.read_excel(
    "Data/1_Многоквартирные дома с технико-экономическими характеристиками.xlsx"
)
df_2 = pd.read_excel(
    "Data/2_Инциденты,_зарегистрированные_на_объектах_городского_хозяйства.xlsx"
)
df_3 = pd.read_excel(
    "Data/3_Работы по капитальному ремонту, проведенные в многоквартирных домах.xlsx"
)
df_4 = pd.read_excel(
    "Data/4_Виды работ по капитальному ремонту многоквартирных домов.xlsx", header=1
)
df_4a = pd.read_excel(
    "Data/4_Виды работ по содержанию и ремонту общего имущества многоквартирных домов.xlsx"
)
df_5 = pd.read_excel(
    "Data/5_Типы событий, регистрируемых по типу объекта многоквартирный дом.xlsx"
)

# предсказание на основе характеристик дома
# train new model
r2 = train_num_inc_model(df_1, df_2)

# find the best candidates to capital repare
# by prediction num_incidents
df_cap = predict_num_inc_model(df_1)


# предсказание на основе инцидентов
df_prediction = predict_by_house_and_inc(df_1, df_2)
