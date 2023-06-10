import React from "react"
import { useState } from "react"
export default function Search(){
    const [search, setSearch] = useState('');
    
    return(
        <>
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Введите адрес" />
        </>
    )
}