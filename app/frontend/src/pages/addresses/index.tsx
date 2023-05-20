import getUserData from './[id]';
import Head from 'next/head' 
import { useEffect } from 'react';
import api from './api.json'

export async function getServerSideProps() {
    const response = await fetch('API');
    const data = await response.json();
    console.log(data);

    return{
        props:{
            addresses:data
        }
    }
}

export default function Addresses( {addresses}){
    return(
        <div>
            {addresses?.leng == 0 ? (
                <div>Loading</div>
            ):(
                addresses?.map(addresses =>(
                    <div key={addresses.id}>
                        <p>{addresses.id} : {addresses.name}</p>
                    </div>
                ))
            )}
        </div>
    )
}