import Addresses from "./property/index";
import Link from "next/link";
import React from 'react';
import Incidents from "./incident";
const MainPage =() => {
    const handleClickIncidents = async () =>{
        const res = await fetch('http://46.243.227.95:8000/model/incident');
        const cModel = 'incident';
    };
    
    const handleClickProperty = async () =>{
        const res = await fetch('http://46.243.227.95:8000/model/property');
        const cModel = 'property';
    };
    
    return(
        <>
        <div className="w-[25%] h-screen flex flex-col justify-start items-center shadow-inner fixed top-0 left-0">
           <Link href={'/incident'} onClick={handleClickIncidents} className="border-[1px] w-80 text-center mt-10 my-10 border-black p-1 rounded-md hover:bg-blue-500 transition duration-300"> 
           <p>Предсказание на основе инцидентов</p>
           </Link>
           <Link href={'/property'} onClick={handleClickProperty} className="border-[1px] border-black w-80 p-1 text-center rounded-md hover:bg-blue-500 transition duration-300"> 
           <p>Предсказание на основе характеристик дома</p>
           </Link>
        </div>
        {/* <Addresses initialData={''}/> */}
        <Incidents initialData={''}/>
        </>
    )
};
export default MainPage;