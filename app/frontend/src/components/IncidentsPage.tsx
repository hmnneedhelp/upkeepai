import React, { useEffect, useState } from 'react';

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://46.243.227.95:8000/objects/')
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Ошибка:', error));
      
  }, []);
  useEffect(() => {
    fetch('http://46.243.227.95:8000/objects/')
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Ошибка:', error));
  }, []);

  return (
    <table className="mx-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Дата</th>
          {/* и другие заголовки столбцов, соответствующие вашим данным... */}
        </tr>
      </thead>
      <tbody>
        {incidents.map(incident => (
          <tr key={incident.id}>
            <td>{incident.id}</td>
            <td>{incident.name}</td>
            <td>{incident.date}</td>
            {/* и другие ячейки, соответствующие вашим данным... */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IncidentsPage;