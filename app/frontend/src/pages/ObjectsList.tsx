import Property from "./property";
import Link from "next/link";
import React, {useState} from 'react';
import Incidents from "./incident";
import Image from "next/image";
import Objects from "../components/Objects";
import FeatureObjects from "../components/FeatureObjects";
import { Main } from "next/document";
const MainPage =() => {
    const [showIncidents, setShowIncidents] = useState(false)
    const [showObjects, setShowObjects] = useState(false)
    const handleClickObjects =async () => {
        if (showObjects == true){
            setShowObjects(false)
        }else{
            setShowObjects(true)
            setShowIncidents(false)
        }
    }
    const handleClickIncidents = async () =>{
        if (showIncidents == true){
            setShowIncidents(false)
        }else{
            setShowIncidents(true)
            setShowObjects(false)
        }
    };
    
    return(
        <main>
            <div className="flex align-center justify-center mt-5">
                <span onClick={handleClickIncidents} className="ml-64 border-[1px] border-black w-36 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer">
                    <p>Список по характеристикам дома</p>
                </span>
                <span onClick={handleClickObjects} className="ml-5 border-[1px] border-black w-36 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer">
                    <p>Список по жалобам жителей</p>
                </span>
            </div>
            {
                showObjects && (<Objects initialData={''}/>)
            }
            {
                showIncidents && (<FeatureObjects initialData={''}/>)
            }
        </main>
    )
};
export default MainPage;