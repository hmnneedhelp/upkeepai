import getUserData from './[id]';
import Head from 'next/head' 
import { useEffect } from 'react';
import Link from 'next/link';
export async function getServerSideProps() {
    const response = await fetch("http://46.243.227.95:8000/objects/");
    const data = await response.json();
    console.log(data)

    return{
        props:{
            addresses:data
        }
    }
}

export default function Addresses( {addresses}){
    return(
        <div className='bg-white'>
            {addresses?.leng == 0 ? (
                <div>Loading</div>
            ):(
                addresses?.map(addresses =>(
                    <div key={addresses.id}>
                      <Link href={'/addresses/'+ addresses.id}>  <p>{addresses.id} : {addresses.name}</p></Link>
                    </div>
                ))
            )}
        </div>
    )
}