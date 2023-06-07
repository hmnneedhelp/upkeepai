import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
const Property = ({ initialData}) => {
    const [data, setData] = useState(initialData);
    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://46.243.227.95:8000/objects/?model=feature&limit=15&offset=${offset}`);
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
        <div className='bg-white flex flex-col justify-center items-center pt-10 addresses '>
            {data?.length === 0 ? (
                <div>Загружается</div>
            ) : (data?.map(address => (
                    <div  key={address.id}>
                        
                        <div className="w-80 h-[1px] bg-slate-300"></div>
                        <Link href={'/property/'+ address.id} className='text-black ' >
                            <p className='text-left my-1'>{address.name}</p>
                        </Link>
                    </div>
                ))
            )}
            <div className='flex justify-between mt-5'>
                {offset === 0 ?(
                    <div></div>
                ) :(
                    <button onClick={handleClickMinus} className="border-[1px] border-black w-32 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer mr-5">Предыдущие</button>
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

Property.getInitialProps = async () => {
    const response = await fetch("http://46.243.227.95:8000/objects/?model=feature&limit=10&offset=0");
    const initialData = await response.json();
    return { initialData };
};

export default Property;