import Addresses from "./addresses/index";
import Link from "next/link";
import React from 'react';
export default function MainPage() {
    return(
        <main className="absolute w-screen h-40 flex flex-col justify-around items-center">
           <Link href={'/addresses'} className="border-[1px] border-black p-1 rounded-md hover:bg-blue-500 transition duration-300"> <p>Выбрать первый тип обработки данных</p></Link>
           <Link href={'/addresses'} className="border-[1px] border-black p-1 rounded-md hover:bg-blue-500 transition duration-300"> <p>Выбрать второй тип обработки данных</p></Link>
        </main>
    )
}
