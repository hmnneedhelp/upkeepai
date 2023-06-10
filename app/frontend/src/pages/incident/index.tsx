import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
const Incidents = ({ initialData}) => {
    const [data, setData] = useState(initialData);
    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://46.243.227.95:8000/objects/?limit=${limit}&offset=${offset}&model=incident`);
            const newData = await response.json();
            setData(newData);
        };

        fetchData();
    }, [limit, offset]);

    const handleClickPlus = () => {
        setOffset(offset + 15);
    };
    const handleClickMinus = () =>{
        setOffset(offset - 15)
    }

    return (
        <div className='bg-white flex flex-col justify-center items-center w-[2/3] ml-[30%] py-10'>
            {data?.length === 0 ? (
                <div>Загружается</div>
            ) : (data?.map(address => (
                    <div className='w-[80%] my-2' key={address.id}>
                        <div className="w-[80%] h-[1px] bg-slate-300"></div>
                        <Link href={'/incident/'+ address.id}>
                            <p className='text-left text-black mb-1'>{address.name} </p> 
                            <p className='text-left text-black'>Предсказано работ: {address.num_works}</p>
                        </Link>
                    </div>
                ))
            )}
            <div className=' mx-5 mt-5'>
                {offset === 0 ?(
                    <div></div>
                ) :(
                    <button onClick={handleClickMinus} className="mr-10 border-[1px] border-black w-32 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer">Предыдущие</button>
                )}
                 {offset === 195 ?(
                    <div></div>
                ) :(
                <button onClick={handleClickPlus} className="border-[1px] border-black w-32 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer">Следующие</button>
                )}
            </div>
        </div>
    )
};

Incidents.getInitialProps = async () => {
    const response = await fetch("http://46.243.227.95:8000/objects/?model=incident&limit=15&offset=0");
    const initialData = await response.json();
    return { initialData };
};

export default Incidents;