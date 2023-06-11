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
      "mkd.year_built": "Год постройки",
      "mkd.series_of_project": "Серия проекта", //
      "mkd.num_floors": "Количество этажей", //
      "mkd.num_entrances": 'Количество входов', //
      "mkd.num_apartments": "Количество квартир", //
      "mkd.num_passenger_elevators":"Количество лифтов",
      "mkd.total_area":"Общая площадь", // пассажирские добавить
      "mkd.wall_material":"Материал стен", //
      "mkd.roofing_material":"Материал крыши", //
      "mkd.housing_stock":"Тип здания", //
      "mkd.mkd_status":"Статус МКД", //
    };

    const getValueByPath = (object, path) => {
      return path.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, object);
    };

    const getMarkup = (fieldValue, fieldName) => {
      if (fieldValue == null) {
        return <p>{fieldName}: Данных не найдено</p>;
      } else {
        return( 
        <>
        <div>
          <div className="w-80 h-[1px] bg-slate-300"></div>
          <p>{fieldName}:  {fieldValue}</p>
        </div>
       </>
      )}
    };

    return (
      <main className="ml-5 text-center" >
        <h3>{contact?.mkd?.name}</h3>
        <h4>Идентификатор - {contact?.mkd?.id}</h4>
        <div className="text-left mx-auto">
        <hr className='h-[1px] w-80 bg-slate-200'/>
          {Object.keys(fieldNames).map(key => getMarkup(getValueByPath(contact, key.split('.')), fieldNames[key]))}
        </div>
        <div className="mt-5 pb-10">
          <p>Общее количество жалоб: {contact?.incidents?.length}</p>
        </div>
        <div className="text-left mx-auto">
          <p>Общее количество предсказанных работ: {contact?.predict?.num_works}</p>
          <p className="w-80 my-5">Список предсказанных работ: </p>{contact?.predict?.works_list?.map(works_list =>(
            <ul key={works_list} className="list-disc">
              <li>{works_list + ' 1 усл. ед'}</li>
            </ul>
          ))}
        </div>
      </main>
    );
  }
export default ContactInfo;
