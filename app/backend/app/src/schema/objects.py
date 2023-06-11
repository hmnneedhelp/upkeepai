import datetime

from pydantic import BaseModel


class MKDShort(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class MKD(BaseModel):
    id: int
    name: str
    parent_id: int | None
    login: str | None
    form_of_ownership: str | None  # 755 форма собственности
    year_built: int | None  # 756 постройки
    year_reconstructed: int | None  # 757 год реконструкции
    series_of_project: str | None
    num_floors: int | None  # 759 кол-во этажей
    num_entrances: int | None  # 760 кол-во подъездов
    num_apartments: int | None  # 761 кол-во квартир
    total_area: float | None  # 762 общая площадь
    living_area: float | None  # 763 общая площадь жилая
    non_living_area: float | None  # 764 общая площадь нежилая
    building_volume: int | None  # 765 строительный объем
    wear_and_tear: int | None  # 766 износ объекта
    energy_efficiency: str | None  # 767 класс энергоэффективности
    wall_material: str | None
    accident_rate: str | None  # 770 признак аварийности
    num_passenger_elevators: int | None  # 771 кол-во пассажирских лифтов
    num_freight_passenger_elevators: int | None  # 772 кол-во грузо-пассажирских
    roof_cleaning: str | None
    roofing_material: str | None
    unom: int | None  # 782 UNOM
    housing_stock: str | None
    mkd_status: str | None  # 3163 статус МКД
    mkd_management_status: str | None
    num_freight_elevators: int | None  # 3363 кол-во грузовых лифтов
    reason_for_status_change: str | None  # 3468 причины изменения статуса
    mkd_category: str | None  # 103506 категория МКД

    class Config:
        orm_mode = True


class Overhaul(BaseModel):
    id: int
    period: int
    name: str
    num_entrance: int | None
    elev_num: str | None
    plan_start: datetime.date
    plan_end: datetime.date
    fact_start: datetime.date
    fact_end: datetime.date

    class Config:
        orm_mode = True


class OverhaulCreate(Overhaul):
    unom: int


class Incident(BaseModel):
    id: int
    name: str
    source: str
    opened: datetime.date
    closed: datetime.date

    class Config:
        orm_mode = True


class IncidentCreate(Incident):
    unom: int


class Coordinate(BaseModel):
    latitude: float
    longitude: float

    class Config:
        orm_mode = True


class Predict(BaseModel):
    id: int
    name: str
    unom: int
    works_list: list[str]
    num_works: int

    class Config:
        orm_mode = True


class PredictShort(BaseModel):
    works_list: list[str]
    num_works: int

    class Config:
        orm_mode = True


class MKDDetail(BaseModel):
    mkd: MKD
    coordinates: Coordinate | None
    overhauls: list[Overhaul] | None
    incidents: list[Incident] | None
    predict: PredictShort | None


class MKDListIncident(BaseModel):
    id: int
    name: str
    unom: int
    year_built: int | None
    num_apartments: int | None
    incidents: int
    overhauls: int

    class Config:
        orm_mode = True


class MKDListFeature(BaseModel):
    id: int
    name: str
    year_built: int | None
    num_apartments: int | None
    num_floors: int | None
    num_entrances: int | None
    num_passenger_elevators: int | None
    overhauls: int | None

    class Config:
        orm_mode = True


class UnionPredict(BaseModel):
    name: str
    unom: int
    works_list: list[str]
    num_works: int

    class Config:
            orm_mode = True
