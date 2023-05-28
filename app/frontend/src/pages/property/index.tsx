import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
const Addresses = ({ initialData}) => {
    const [data, setData] = useState(initialData);
    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://46.243.227.95:8000/objects/?limit=15&offset=${offset}&model=feature`);
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
        <div className='bg-white flex flex-col justify-center items-center pt-10'>
            <Link href={'../'} className='' ><p>Предыдущая страница</p></Link>
            {data?.length === 0 ? (
                <div>Загружается</div>
            ) : (data?.map(address => (
                    <div  key={address.id}>
                        <Link href={'/property/'+ address.id}>
                            <p className='text-left'>{address.name}</p>
                        </Link>
                    </div>
                ))
            )}
            <div className='flex justify-between mt-5'>
                {offset === 0 ?(
                    <div></div>
                ) :(
                    <button onClick={handleClickMinus} className="mr-10 text-blue-500">Предыдущие</button>
                )}
                 {offset === 195 ?(
                    <div></div>
                ) :(
                <button onClick={handleClickPlus} className="text-blue-500">Следующие</button>
                )}
            </div>
        </div>
    )
};

Addresses.getInitialProps = async () => {
    const response = await fetch("http://46.243.227.95:8000/objects/?limit=15&offset=0&model=feature");
    const initialData = await response.json();
    return { initialData };
};

export default Addresses;