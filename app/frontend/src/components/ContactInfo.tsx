'use strict'

import { useEffect, useState } from "react";

interface Incident {
  id: number;
  name: string;
  source: string;
  opened: string;
  closed: string;
}

const ContactInfo = ({ contact }) => {
    const {mkd, incidents} = contact || {};
    if (!contact) {
      return (
        <p>Дома не существует</p>
      );
    }
    const fieldNames = {
      "mkd.year_reconstructed": "Год реконструкции",
      "mkd.year_built": "Год постройки",
      "mkd.form_of_ownership": "Форма собственности",
      "mkd.series_of_project": "Серия проекта",
      "mkd.num_floors": "Количество этажей",
      "mkd.num_entrances": 'Количество входов',
      "mkd.num_apartments": "Количество квартир",
      "mkd.total_area":"Общая площадь",
      "mkd.living_area":"Жилая площадь",
      "mkd.non_living_area": "Нежилая площадь",
      "mkd.building_volume": "Объем здания",
      "mkd.wear_and_tear":"Износ здания",
      "mkd.energy_efficiency":"Энергоэффективность",
      "mkd.wall_material":"Материал стен",
      "mkd.roof_material":"Материал крыши",
      "mkd.accident_rate":"Аварийность",
      "mkd.num_passenger_elevators": "Количество пассажирских лифтов",
      "mkd.num_freight_passenger_elevators":"Количество грузовых лифтов",
      "mkd.roof_cleaning":"Очередь уборки крыши",
      "mkd.roofing_material":"Материал крыши",
      "mkd.unom":"UNOM",
      "mkd.housing_stock":"Тип здания",
      "mkd.mkd_status":"Статус МКД",
      "mkd.mkd_management_status":"Статус управления МКД",
      "mkd.reason_for_status_change":"Причина смены статуса",
      "mkd.mkd_category":"Категория МКД",
    };

    const getValueByPath = (object, path) => {
      return path.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, object);
    };

    const getMarkup = (fieldValue, fieldName) => {
      if (fieldValue == null) {
        return <p>{fieldName}: Данных не найдено</p>;
      } else {
        return( 
       <p>{fieldName}:  {fieldValue}</p>
      )}
    };

    const fieldNames2 = {
      'contact.incidents.id': 'Номер жалобы',
      'incidents.name': 'Причина жалобы',
      'incidents.opened': 'Дата поступления жалобы',
      'incidents.closed': 'Дата решения',
    };

    const getValueByPath2 = (object, path) => {
      return path.reduce((obj2, key2) => (obj2 && obj2[key2] !== 'undefined') ? obj2[key2] : null, object);
    };

    const getMarkup2 = (fieldValue2, fieldName2) =>{
      if (fieldValue2 == null){
        return <p>{fieldName2}: Данных не найдено </p>
        
      } else{
        return(
          <p>{fieldName2} : {fieldValue2}</p>
        )
      }
    };

    return (
      <main className="ml-5" >
        <h3>{contact?.mkd?.name}</h3>
        <h4>Идентификатор - {contact?.mkd?.id}</h4>
        <div className="text-left mx-auto">
          {Object.keys(fieldNames).map(key => getMarkup(getValueByPath(contact, key.split('.')), fieldNames[key]))}
        </div>
        <div className="mt-5 pb-10">
          <p>Общее количество жалоб: {contact?.incidents?.length}</p>
        </div>
      </main>
    );
  }
export default ContactInfo;
