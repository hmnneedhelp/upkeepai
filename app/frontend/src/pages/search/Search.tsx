import Link from "next/link";
import React, { useState, useEffect } from "react"
import Incidents from "@/pages/incident";
export default function Search() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [id, setId] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://46.243.227.95:8000/objects/name/${search}`);
            const newData = await response.json();
            setData(newData);
        };
        
        if (search !== '') {
            fetchData();
        }
        if (search !=='') async () =>{
            
        const resp = await fetch('http://46.243.227.95:8000/objects/model=union?'+ data.id)
        const newId = await resp.json();
        setId(newId)
        }
    }, [search]);
    console.log(data)
    
    return(
        <>
            <input 
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Введите адрес"
                className="border border-black mt-5"
            />
            <table className="w-[80%] border mt-2">
                <tbody >
                    {Array.isArray(data) && data.map((item, index) => (
                        <tr key={index} className="border">
                        <Link href={'/search/'+ item.id}>
                            <td >{item.name}</td>
                        </Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}