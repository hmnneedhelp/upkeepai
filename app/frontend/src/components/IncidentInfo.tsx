'use strict'

import { useEffect, useState } from "react";

interface Incident {
  id: number;
  name: string;
  source: string;
  opened: string;
  closed: string;
}

const IncidentInfo = ({ contact }) => {
    const {mkd, overhauls} = contact || {};
    if (!contact) {
      return (
        <p>Дома не существует</p>
      );
    }
    const fieldNames = {
      "overhauls.name": "Работы",
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
    return (
      <main className="ml-5 text-center" >
        <h3>{contact?.mkd?.name}</h3>
        <h4>Идентификатор - {contact?.mkd?.id}</h4>
        <div className="text-left mx-auto">
          <p>Общее количество предсказанных работ: {contact?.predict?.num_works}</p>
          <p className="max-w-[700px] my-5">Список предсказанных работ: {contact?.predict?.works_list + '; '}</p>
        </div>
      </main>
    );
  }
export default IncidentInfo;
