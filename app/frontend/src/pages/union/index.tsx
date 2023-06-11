import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import React from 'react';

const Union = ({ initialData}) => {
  const [data, setData] = useState(initialData);
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://46.243.227.95:8000/objects/list?model=union&limit=10&offset=${offset}`);
      const newData = await response.json();
      setData(newData);
      console.log(newData)
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
        <table className='table-auto border-black border-2 ml-36 w-auto'>
          <thead className='border-2 border-black'>
            <tr className='border-2 border-black'>
              <th className='border-2 border-black'>Адрес</th>
              <th className='border-2 border-black'>Кол-во предсказ. работ</th>
              <th className='border-2 border-black'>Наименование предсказ. работ (1 усл. ед)</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((address, index) => (
              <tr key={index} className='border-2 border-black'>
                <td className='border-2 border-black'>{address.name}</td>
                <td className='border-2 border-black text-center'>{address.num_works}</td>
                <td className='border-2 border-black text-center'>{address.works_list === null ?(
                    <div>Данных не найдено</div>
                ):(address?.works_list?.map(works_list =>(
                    <ul key={works_list} className="list-none m-none list-inside text-left my-[-10px]">
                      <li>{works_list + ';'}</li>
                    </ul>
                )))}</td>
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

Union.getInitialProps = async () => {
  const response = await fetch("http://46.243.227.95:8000/objects/list?model=union&limit=10&offset=0");
  const initialData = await response.json();
  return { initialData };
};

export default Union;