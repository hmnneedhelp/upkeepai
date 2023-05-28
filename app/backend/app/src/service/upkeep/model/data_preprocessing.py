import pandas as pd
import numpy as np


def prepare_df_1(df_1: pd.DataFrame):
    # подготовка 1 табл
    old_names = list(df_1)
    new_names = [
        "ID_object",
        "Address_object",
        "PARENT_ID",
        "LOGIN",
        # "Назначение",
        "Форма собственности",
        "Год постройки",
        "Год реконструкции",
        "Серия проекта",
        "Количество этажей",
        "Количество подъездов",
        "Количество квартир",
        "Общая площадь",
        "Общая площадь жилых помещений",
        "Общая площадь нежилых помещений",
        "Строительный объем",
        "Износ объекта (по БТИ)",
        "Класс энергоэффективности",
        "Материал стен",
        "Признак аварийности здания",
        "Количество пассажирских лифтов",
        "Количество грузопассажирских лифтов",
        "Очередность уборки кровли",
        "Материал кровли",
        "unom",
        # "Вид социального объекта",
        "Тип жилищного фонда",
        "Статус МКД",
        "Статус управления МКД",
        "Количество грузовых лифтов",
        "Причина Изменения Статуса МКД",
        "Категория МКД",
    ]
    new_col = dict(zip(old_names, new_names))
    df_1 = df_1[1:].rename(columns=new_col)
    df_1.unom = df_1.unom.astype(int)

    df_1 = df_1.fillna(0)

    # приведем типы данных к верным
    column_int_list = [
        "ID_object",
        "Год постройки",
        "Количество этажей",
        "Количество подъездов",
        "Количество квартир",
        "Количество пассажирских лифтов",
        "Количество грузопассажирских лифтов",
        "Количество грузовых лифтов",
    ]
    for column in column_int_list:
        df_1[column] = df_1[column].astype(int)

    column_str_list = [
        "Серия проекта",
        "Материал стен",
        "Признак аварийности здания",
        "Очередность уборки кровли",
        "Материал кровли",
        "Тип жилищного фонда",
    ]
    for column in column_str_list:
        df_1[column] = df_1[column].astype(str)

    column_float_list = [
        "Общая площадь",
        "Общая площадь жилых помещений",
        "Общая площадь нежилых помещений",
    ]

    for column in column_float_list:
        df_1[column] = df_1[column].astype(float)

    # добавим общее Количество лифтов
    df_1["num_lift"] = (
        df_1["Количество пассажирских лифтов"]
        + df_1["Количество грузопассажирских лифтов"]
        + df_1["Количество грузовых лифтов"]
    )

    # добавим наличие лифтов в доме
    df_1["Is_lift"] = df_1["num_lift"] > 0
    df_1 = df_1.dropna()

    return df_1


def create_df_1_2(df_1: pd.DataFrame, df_2: pd.DataFrame):
    df_1 = prepare_df_1(df_1)

    # разделим данные инцидентов по жалобам и датчики
    df_incident = df_2[df_2["source"] != "ASUPR"]  # жалобы

    # К каждому дому добавим инфо о кол-ве заявок кол-во проблем с датчиков
    df_1_2 = df_1.merge(
        df_incident.groupby("unom").size().rename("num_incident"), how="left", on="unom"
    )

    # отфильтруем слишком большое число обращений
    df_1_2 = df_1_2.drop(
        np.where(df_1_2["num_incident"] > (df_1_2.num_incident.max() * 0.8))[0]
    )
    df_1_2 = df_1_2.dropna()

    return df_1_2


def columns_num_inc_model():
    # выберем колонки для обучения модели для предсказания кол-ва инцидентов
    target_col = ["num_incident"]
    num_cols = [
        "Количество этажей",
        "Количество подъездов",
        "Количество квартир",
        "Общая площадь",
        "num_lift",
    ]
    cat_cols = [
        "Серия проекта",
        "Материал стен",
        "Материал кровли",
        "Тип жилищного фонда",
        "Статус МКД",
        "Is_lift",
    ]
    return target_col, num_cols, cat_cols


def prepare_df_3(df_3: pd.DataFrame, df_4: pd.DataFrame):
    # подготовка 3 табл. некоторые данные не совпадают, приведем к стандарту
    old_name = list(set(df_3["WORK_NAME"]).difference(df_4["Наименование"]))
    new_name = [
        "ремонт или замена мусоропровода",
        "ремонт фасада (замена оконных блоков, расположенных в помещениях общего пользования в многоквартирном доме)",
        "ремонт подвальных помещений, относящихся к общему имуществу собственников помещений",
        "ремонт фасада",
        "ремонт или замена внутреннего водостока",
        "ремонт внутридомовых инженерных сетей электроснабжения",
        "ремонт подъездов, направленный на восстановление их надлежащего состояния и проводимый при выполнении иных работ",
    ]
    df_3["WORK_NAME"] = df_3["WORK_NAME"].replace(old_name, new_name)
    return df_3


def create_df_3_4(df_3: pd.DataFrame, df_4: pd.DataFrame):
    # Соединим табл 3 и 4 (проводимый в 2022 г кап рем и виды работ по кап рем)
    df_3 = prepare_df_3(df_3)
    df_3_4 = df_3.merge(df_4, how="inner", left_on="WORK_NAME", right_on="Наименование")
    df_3_4 = df_3_4.drop(columns="Наименование")
    return df_3_4