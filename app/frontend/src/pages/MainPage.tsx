import Property from "./property";
import Link from "next/link";
import React, {useState} from 'react';
import Incidents from "./incident";
import Image from "next/image";
const MainPage =() => {
    const [showIncidents, setShowIncidents] = useState(false)
    const [showProperty, setShowProperty] = useState(false)
    const handleClickIncidents = async () =>{
        if (showIncidents == true){
            setShowIncidents(false)
        }else{
            setShowIncidents(true)
        }
        const res = await fetch('http://46.243.227.95:8000/model/incident');
        const cModel = 'incident';
    };
    
    const handleClickProperty = async () =>{
        if (showProperty == true){
            setShowProperty(false)
        }else{
            setShowProperty(true)
        }
        const res = await fetch('http://46.243.227.95:8000/model/property');
        const cModel = 'property';
    };
    
    return(
        <>
        <div className="w-[25%] h-screen flex flex-col justify-start items-center shadow-inner fixed top-0 left-0">
           <div onClick={handleClickIncidents} className="w-full text-center mt-10 my-10 p-1 hover:bg-green-300  transition duration-300 text-black cursor-pointer flex items-center"> 
            <Image
            className="ms-5"
            src={'/users.png'}
            width={24}
            height={24}
            alt="Житель"
            />
           <p className="ms-5">Предсказание на основе жалоб жителей</p>
           </div>
           <div onClick={handleClickProperty} className="w-full p-1 text-center hover:bg-green-300 transition duration-300 text-black cursor-pointer flex items-center"> 
           <Image
            className="ms-5"
            src={'/grid.png'}
            width={24}
            height={24}
            alt="Характеристики"
            />
           <p className="ms-5">Предсказание на основе характеристик дома</p>
           </div>
        </div>
            {
                showProperty && (<Property initialData={''}/>)
            }
            {
                showIncidents && (<Incidents initialData={''}/>)
            }
        </>
    )
};
export default MainPage;