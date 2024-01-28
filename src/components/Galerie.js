import React from "react";
import media from "../assets/Mimi/Animals_Rainbow.jpg"
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { useState } from "react";

export default function Galerie() {
    const [like, setLike] = useState(<FcLikePlaceholder />)
    const [numberLike,setNumberLike]=useState(77)//a remplacé avec la valeur du data
    const [clickCount, setClickCount] = useState(0);

    const likeClick = () => {
        if (clickCount === 0) {
            setLike(<FcLike />);
            setNumberLike(numberLike + 1);
            setClickCount(1); // Mettez à jour le nombre de clics à 1
            console.log("like initial");
        } else if (clickCount === 1) {
            setLike(<FcLikePlaceholder />);
            setNumberLike(numberLike - 1);
            setClickCount(0); // Réinitialisez le nombre de clics à 0
            console.log("like modifiable");
        }
       
    }
    return (
        <section className="photographe-galerie">
            <div className="card">
                <img src={media} alt="" />
                <div className="card-title">
                    <p>title</p>
                    <div className="like">
                        <p className="like-number"> {numberLike}</p>
                        <div onClick={likeClick}>    {like}
                        </div>
                    </div>
                </div>
            </div>
            
            
        </section>
    )
}