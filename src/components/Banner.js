import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
export default function Banner() {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = () => {
        navigate("/")
    }

    return (
        <header>
        <section className="photographe-banner">
            
            <>
                {location.pathname === "/" ? (
                    <>
                        <img src={logo} alt="logo du site" onClick={handleClick} />
                        <h1>Nos photographes</h1>
                    </>
                ) : (
                    <img src={logo} alt="logo du site" onClick={handleClick} />
                )}
            </>
            
        </section>
        </header>

    )
}