import React from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import ImagePortrait from "./ImagePortrait";
import photographers from "../data/photographers.json"
import ModalContact from "./ModalContact"
import media from "../data/photographers.json"
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
export default function InfoPhotographe(){
    const {id}=useParams()
    const [composant,setComposant]=useState(false)
    const [sommeLike,setSommeLike]=useState(0)
    const [selectedIdMedia, setSelectedIdMedia] = useState(""); // État pour stocker le titre sélectionné
    const [mediaLikes, setMediaLikes] = useState({like:<FcLikePlaceholder />,sommeLike:"0",numberLike:"0",clickCount:"0"}); // État pour stocker les likes de chaque média

    const photographer = photographers.photographers.find(
        (photographer) => photographer.id === Number(id));
    const filterPhotographerAllMedia = media.media.filter((mediaEl) => mediaEl.photographerId === Number(id))
    const totalLike = filterPhotographerAllMedia.reduce((total, mediaEl) => total + mediaEl.likes,sommeLike,);    
    const modalForm=()=>{setComposant(true)}
    const likeClick = (idMedia) => {
        // Vérifie si le média a déjà un like
        const hasLike = mediaLikes[idMedia];
          // Met à jour le nombre total de likes
    const newNumberLike = parseInt(mediaLikes.numberLike) + (hasLike ? -1 : 1);
    const newSomme=parseInt(mediaLikes.sommeLike) + (hasLike ? -1 : 1)
    // Met à jour le nombre total de clics
    const newClickCount = parseInt(mediaLikes.clickCount) + 1;
    const likeColor = hasLike ? <FcLikePlaceholder /> : <FcLike />;
    
        // Inverse l'état du like pour ce média
        setMediaLikes(prevLikes => ({
            ...prevLikes,
            [idMedia]: !hasLike, // Inverse l'état actuel du like
            sommeLike: newSomme.toString(), // Met à jour le nombre total de likes
            numberLike: newNumberLike.toString(), // Met à jour le nombre de likes pour ce média
            clickCount: newClickCount.toString(), // Met à jour le nombre total de clics
            like:likeColor
        }));
      


    };
    const handleClickImage = (idMedia) => {
        setSelectedIdMedia(idMedia); // Met à jour l'état avec le titre cliqué
        console.log(idMedia)
      };
return (
    <>
    <section className="photographe-card" >
        {photographer && (
            <>
                <div className="photographe-info">
                    <h1>{photographer.name}</h1>
                    <h2>{photographer.city},{photographer.country}</h2>
                    <h3>{photographer.tagline}</h3>
                </div>
                <button type="button" onClick={modalForm}>contactez-moi</button>
                {composant && <ModalContact showModal={true} closeModal={() => setComposant(false)} namePhotographe={photographer.name} />}
                <ImagePortrait fileName={photographer.portrait} chemin="photographersid" />
               
            </>
        )}
    </section>
    <section className="photographe-galerie">
    {filterPhotographerAllMedia.map((filterPhotographerMediaEl) =>
        <div className="card"onClick={()=>handleClickImage(filterPhotographerMediaEl.id)}
            key={filterPhotographerMediaEl.id}>
            <ImagePortrait fileName={filterPhotographerMediaEl.image?filterPhotographerMediaEl.image:filterPhotographerMediaEl.video} chemin={photographer.name} />
            <div className="card-title">
                <p>{filterPhotographerMediaEl.title}</p>
                <div className="like">
                    <p className="like-number"> {filterPhotographerMediaEl.likes + (mediaLikes[filterPhotographerMediaEl.id] ? 1 : 0)}
</p>
                    <div onClick={()=>likeClick(filterPhotographerMediaEl.id)}>   {mediaLikes.like}
                    </div>
                </div>
            </div>
        </div>
    )}

</section>
<section className="photographe-allLike">
    <p>  {mediaLikes ?+ mediaLikes.sommeLike + totalLike : totalLike} <FcLikePlaceholder style={{fill:"#fffff"}} /></p>
    <p>{`${photographer.price}€/jour`
}</p>
</section>
</>
);
}
