import React from "react";
import photographers from "../data/photographers.json"
import { useNavigate ,useParams } from "react-router-dom";
export default function Home() {
const navigate=useNavigate()
const params=useParams()
console.log(params)
const photographerPage=(id)=>{
    navigate("/photographer/"+id)
}
    return (
        <section className="main">
            <div className="allPhotographers">
                {photographers.photographers.map((photographer) =>
                (
                    <div className={`details ${photographer.name}`
                    } key={photographer.id} onClick={()=>photographerPage(photographer.id)}>
                        <img src={`../assets/photographersid/${photographer.portrait}`} alt={photographer.name} />

                        <h2>{photographer.name}</h2>
                        <h3>{photographer.city},{photographer.country}</h3>
                        <h4>{photographer.tagline}</h4>
                        <p>`{photographer.price}$/jour`</p>
                    </div>
                ))}
            </div>


        </section>
    )
}