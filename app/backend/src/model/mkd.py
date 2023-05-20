# from src.db.session import Base
# from sqlalchemy.orm import Mapped, mapped_column, foreign, relationship
# from sqlalchemy.types import String, Integer
# from sqlalchemy import ForeignKey, Column
#
#
# class MKD(Base):
#     __tablename__ = 'mkd'
#
#     id: Mapped[int] = mapped_column(primary_key=True, index=True)
#     name: Mapped[str] = mapped_column(String)
#     parent_id: Mapped[int] = mapped_column(Integer)
#     login: Mapped[str] = mapped_column(String)
#     col_755: Mapped[str] = mapped_column(String)  # Форма собственности
#     col_756: Mapped[int] = mapped_column(Integer)  # Год постройки
#     col_757: Mapped[int] = mapped_column(Integer)  # Год реконструкции
#     col_758: Mapped[int] = mapped_column(Integer)  # Год реконструкции
#     col_759_id = Column(Integer, ForeignKey('series_of_projects.id'))
#     col_759 = relationship("SeriesOfProjects", back_populates="mkd")  # Серия проекта
#
# class SeriesOfProjects(Base):
#     __tablename__ = 'series_of_projects'
#
#     id: Mapped[int] = mapped_column(primary_key=True)
#     name: Mapped[str] = mapped_column(String)
#     mkd = relationship("MKD", back_populates="col_759")

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Mkd(Base):
    __tablename__ = 'mkd'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    parent_id = Column(Integer)
    login = Column(String)
    form_of_ownership = Column(String) # 755 форма собственности
    year_built = Column(Integer) # 756 постройки
    year_reconstructed = Column(Integer) # 757 год реконструкции
    series_of_project_id = Column(Integer, ForeignKey('series_of_projects.id')) # 758 серия проекта
    series_of_project = relationship("SeriesOfProjects", back_populates="mkds")
    num_floors = Column(Integer) # 759 кол-во этажей
    num_entrances = Column(Integer) # 760 кол-во подъездов
    num_apartments = Column(Integer) # 761 кол-во квартир
    total_area = Column(Integer) # 762 общая площадь
    living_area = Column(Integer) # 763 общая площадь жилая
    non_living_area = Column(Integer) # 764 общая площадь нежилая
    building_volume = Column(Integer) # 765 строительный объем
    wear_and_tear = Column(Integer) # 766 износ объекта
    energy_efficiency = Column(String) # 767 класс энергоэффективности
    wall_material_id = Column(Integer, ForeignKey('wall_material.id')) # 769 материал стен
    wall_material = relationship("WallMaterial", back_populates="mkds")
    accident_rate_id = Column(Integer, ForeignKey('accident_rate.id')) # 770 признак аварийности
    accident_rate = relationship("AccidentRate", back_populates="mkds")
    num_passenger_elevators = Column(Integer) # 771 кол-во пассажирских лифтов
    num_freight_passenger_elevators = Column(Integer) # 772 кол-во грузо-пассажирских
    roof_cleaning_id = Column(Integer, ForeignKey('roof_cleaning.id')) # 775 очередь уборки кровли
    roof_cleaning = relationship("RoofCleaning", back_populates="mkds")
    roofing_material_id = Column(Integer, ForeignKey('roofing_material.id')) # 781 материалы кровли
    roofing_material = relationship("RoofingMaterial", back_populates="mkds")
    unom = Column(String) # 782 UNOM
    housing_stock_id = Column(Integer, ForeignKey('housing_stock.id')) # 2463 тип жилого фонда
    housing_stock = relationship("HousingStock", back_populates="mkds")
    mkd_status_id = Column(Integer, ForeignKey('mkd_status.id')) # 3163 статус МКД
    mkd_status = relationship("MkdStatus", back_populates="mkds")
    mkd_management_status_id = Column(Integer, ForeignKey('mkd_management_status.id')) # 3243 статус управдения МКД
    mkd_management_status = relationship("MkdManagementStatus", back_populates="mkds")
    num_freight_elevators = Column(Integer) # 3363 кол-во грузовых лифтов
    reason_for_status_change = Column(String) # 3468 причины изменения статуса
    mkd_category_id = Column(Integer, ForeignKey('mkd_category.id')) # 103506 категория МКД
    mkd_category = relationship("MkdCategory", back_populates="mkds")


class SeriesOfProjects(Base):
    __tablename__ = 'series_of_projects'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="series_of_project")


class WallMaterial(Base):
    __tablename__ = 'wall_material'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="wall_material")

class AccidentRate(Base):
    __tablename__ = 'accident_rate'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="accident_rate")

class RoofCleaning(Base):
    __tablename__ = 'roof_cleaning'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="roof_cleaning")

class RoofingMaterial(Base):
    __tablename__ = 'roofing_material'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="roofing_material")


class HousingStock(Base):
    __tablename__ = 'housing_stock'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="housing_stock")


class MkdStatus(Base):
    __tablename__ = 'mkd_status'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="mkd_status")

class MkdManagementStatus(Base):
    __tablename__ = 'mkd_management_status'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="mkd_management_status")

class MkdCategory(Base):
    __tablename__ = 'mkd_category'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    mkds = relationship("MKD", back_populates="mkd_category")
