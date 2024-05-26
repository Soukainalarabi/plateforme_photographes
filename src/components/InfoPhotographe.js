import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImagePortrait from "./ImagePortrait";
import photographers from "../data/photographers.json";
import ModalContact from "./ModalContact";
import media from "../data/photographers.json";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

export default function InfoPhotographe() {
  const { id } = useParams();
  const [composant, setComposant] = useState(false);
  const [sommeLike, setSommeLike] = useState(0);
  const [selectedIdMedia, setSelectedIdMedia] = useState("");
  const [filterPhotographerAllMedia, setFilterPhotographerAllMedia] = useState([]);

  // Trouver le photographe en fonction de l'ID
  const photographer = photographers.photographers.find(
    (photographer) => photographer.id === Number(id)
  );

  // Filtrer les médias du photographe
  useEffect(() => {
    const filteredMedia = media.media.filter(
      (mediaEl) => mediaEl.photographerId === Number(id)
    );
    setFilterPhotographerAllMedia(filteredMedia);
    setSommeLike(filteredMedia.reduce((total, mediaEl) => total + mediaEl.likes, 0));
  }, [id]);

  const modalForm = () => {
    setComposant(true);
  };

  const likeClick = (idMedia) => {
    const nouvelleMedia = filterPhotographerAllMedia.map((mediaEl) =>
      mediaEl.id === idMedia
        ? { ...mediaEl, liked: !mediaEl.liked, likes: mediaEl.liked ? mediaEl.likes +1  : mediaEl.likes - 1 }
        : mediaEl
    );
    setFilterPhotographerAllMedia(nouvelleMedia);
    setSommeLike(nouvelleMedia.reduce((total, mediaEl) => total + mediaEl.likes, 0));
  };

  const handleClickImage = (idMedia) => {
    setSelectedIdMedia(idMedia); // Met à jour l'état avec le titre cliqué
  };

  return (
    <>
      <section className="photographe-card">
        {photographer && (
          <>
            <div className="photographe-info">
              <h1>{photographer.name}</h1>
              <h2>{photographer.city}, {photographer.country}</h2>
              <h3>{photographer.tagline}</h3>
            </div>
            <button type="button" onClick={modalForm}>Contactez-moi</button>
            {composant && <ModalContact showModal={true} closeModal={() => setComposant(false)} namePhotographe={photographer.name} />}
            <ImagePortrait fileName={photographer.portrait} chemin="photographersid" />
          </>
        )}
      </section>
      <section className="photographe-galerie">
        {filterPhotographerAllMedia.map((filterPhotographerMediaEl) =>
          <div className="card" onClick={() => handleClickImage(filterPhotographerMediaEl.id)}
            key={filterPhotographerMediaEl.id}>
            <ImagePortrait fileName={filterPhotographerMediaEl.image ? filterPhotographerMediaEl.image : filterPhotographerMediaEl.video} chemin={photographer.name} />
            <div className="card-title">
              <p>{filterPhotographerMediaEl.title}</p>
              <div className="like">
                <p className="like-number">{filterPhotographerMediaEl.likes}</p>
                <div onClick={() => likeClick(filterPhotographerMediaEl.id)}>
                  {filterPhotographerMediaEl.liked ? <FcLikePlaceholder /> : <FcLike />}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="photographe-allLike">
        <p>{sommeLike} <FcLike /></p>
        <p>{`${photographer?.price}€/jour`}</p>
      </section>
    </>
  );
}