import Property from "./property";
import Link from "next/link";
import React, {useState} from 'react';
import Incidents from "./incident";
import Image from "next/image";
import ObjectsList from "./ObjectsList";
import { Main } from "next/document";
import Search from './search/Search'
import FeatureObjects from "@/components/FeatureObjects";
import Union from "./union";
import Objects from "@/components/Objects";
const MainPage =() => {
    const [showIncidents, setShowIncidents] = useState(false)
    const [showProperty, setShowProperty] = useState(false)
    const [showObjects, setShowObjects] = useState(false)
    const [showUnion, setShowUnion] = useState(false)
    const handleClickObjects =async () => {
        if (showObjects == true){
            setShowObjects(false)
        }else{
            setShowObjects(true)
            setShowIncidents(false)
            setShowProperty(false)
        }
    }
    const handleClickIncidents = async () =>{
        if (showIncidents == true){
            setShowIncidents(false)
        }else{
            setShowIncidents(true)
            setShowObjects(false)
            setShowProperty(false)
            setShowUnion(false)
        }
        // const res = await fetch('http://46.243.227.95:8000/model/incident');
        // const cModel = 'incident';
    };
    const handleClickProperty = async () =>{
        if (showProperty == true){
            setShowProperty(false)
        }else{
            setShowProperty(true)
            setShowObjects(false)
            setShowIncidents(false)
            setShowUnion(false)
        }
        // const res = await fetch('http://46.243.227.95:8000/model/incident');
        // const cModel = 'incident';
    };
    const handleClickUnion = async () =>{
        if (showUnion == true){
            setShowUnion(false)
        }else{
            setShowUnion(true)
            setShowIncidents(false)
            setShowObjects(false)
            setShowProperty(false)
        }
        // const res = await fetch('http://46.243.227.95:8000/model/property');
        // const cModel = 'property';
    };
    
    return(
        <main>
        <div className="w-[25%] h-screen flex flex-col justify-start items-center shadow-inner fixed top-0 left-0">
           
           <div onClick={handleClickIncidents} className="w-full text-center p-1 hover:bg-green-300  transition duration-300 text-black cursor-pointer flex items-center"> 
            <Image
            className="ms-5"
            src={'/users.png'}
            width={24}
            height={24}
            alt="Житель"
            />
           <p className="ms-5">Предсказание на основе инцидентов</p>
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
           <div onClick={handleClickUnion} className="w-full p-1 text-center hover:bg-green-300 transition duration-300 text-black cursor-pointer flex items-center"> 
           <Image
            className="ms-5"
            src={'/grid.png'}
            width={24}
            height={24}
            alt="Характеристики"
            />
           <p className="ms-5">Объединённый список</p>
           </div>
           <Search/>
           </div>
            {
                showObjects && (<ObjectsList />)
            }
            {
                showProperty && (<FeatureObjects initialData={''}/>)
            }
            {
                showIncidents && (<Objects initialData={''}/>)
            }
            {
                showUnion && (<Union initialData={''}/>)
            }
        </main>
    )
};
export default MainPage;