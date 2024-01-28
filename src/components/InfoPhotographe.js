import React from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
// import photographerPortrait from "../../public/assets/photographersid/";
import mimi from "../assets/photographersid/MimiKeel.jpg"
import photographers from "../data/photographers.json"
import ModalContact from "./ModalContact"
export default function InfoPhotographe(){
    const [composant,setComposant]=useState(false)
    const {id}=useParams()
    const photographer = photographers.photographers.find(
        (photographer) => photographer.id === Number(id)
      );
    const modalForm=()=>{
setComposant(true)    }
    return(
        <section className="photographe-card" >
            {photographer&&(
                <>
            <div className="photographe-info">
                <h1>{photographer.name}</h1>
                <h2>{photographer.city},{photographer.country}</h2>
                <h3>{photographer.tagline}</h3>
            </div>
            <button type="button" onClick={modalForm} >contactez-moi</button>
            {composant && <ModalContact showModal={true} closeModal={() => setComposant(false)} />}

            <img src={mimi} alt={`portrait de ${photographer.name}`} />

            </>
            )
            
            }
        </section>
    )
}
