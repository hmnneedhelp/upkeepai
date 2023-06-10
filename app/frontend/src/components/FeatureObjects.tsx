import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import React from 'react';

const FeatureObjects = ({ initialData}) => {
  const [data, setData] = useState(initialData);
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://46.243.227.95:8000/objects/list?model=feature&limit=15&offset=${offset}`);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, [limit, offset]);

  const handleClickPlus = () => {
    setOffset(offset + 15);
  };

  const handleClickMinus = () => {
    setOffset(offset - 15);
  };

  return (
    <div className='bg-white flex flex-col justify-center items-center pt-10 addresses ml-64'>
      {data?.length === 0 ? (
        <div>Загружается</div>
      ) : (
        <table className='table-auto border-black border-2 w-[1150px] ml-36'>
          <thead className='border-2 border-black'>
            <tr className='border-2 border-black'>
              <th className='border-2 border-black'>Адрес</th>
              <th className='border-2 border-black'>Год постройки</th>
              <th className='border-2 border-black'>Кол-во квартир</th>
              <th className='border-2 border-black'>Кол-во этажей</th>
              <th className='border-2 border-black'>Кол-во входов</th>
              <th className='border-2 border-black'>Кол-во пассаж. лифтов</th>
              <th className='border-2 border-black'>Серия проекта</th>
              <th className='border-2 border-black'>Мат. стен</th>
              <th className='border-2 border-black'>Мат. крыши</th>
              <th className='border-2 border-black'>Тип жилого фонда</th>
              <th className='border-2 border-black'>Статус МКД</th>
              <th className='border-2 border-black'>Кол-во предсказ. работ</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((address, index) => (
              <tr key={index} className='border-2 border-black'>
                <td className='border-2 border-black'>{address.name}</td>
                <td className='border-2 border-black text-center'>{address.year_built}</td>
                <td className='border-2 border-black text-center'>{address.num_apartments}</td>
                <td className='border-2 border-black text-center'>{address.num_floors}</td>
                <td className='border-2 border-black text-center'>{address.num_entrances}</td>
                <td className='border-2 border-black text-center'>{address.num_passenger_elevators}</td>
                <td className='border-2 border-black text-center'>{address.series_of_project}</td>
                <td className='border-2 border-black text-center'>{address.wall_material}</td>
                <td className='border-2 border-black text-center'>{address.roofing_material}</td>
                <td className='border-2 border-black text-center'>{address.housing_stock}</td>
                <td className='border-2 border-black text-center'>{address.mkd_status}</td>
                <td className='border-2 border-black text-center'>{address.overhauls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className='flex justify-between mt-5'>
        {offset === 0 ? (
          <div></div>
        ) : (
          <button onClick={handleClickMinus} className="border-[1px] border-black w-32 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer mr-5">Предыдущие</button>
        )}
        {offset === 195 ? (
          <div></div>
        ) : (
          <button onClick={handleClickPlus} className="border-[1px] border-black w-32 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer">Следующие</button>
        )}
      </div>
    </div>
  );
};

FeatureObjects.getInitialProps = async () => {
  const response = await fetch("http://46.243.227.95:8000/objects/list?model=feature&limit=10&offset=0");
  const initialData = await response.json();
  return { initialData };
};

export default FeatureObjects;