import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useRef, useState } from "react";

export default function ModalContact({ showModal, closeModal }) {
    const [formError, setFormError] = useState("false")
    const [show,setShow]=useState("true")
    const [contentForm, setContentForm] = useState({
        prenom: "",
        nom: "",
        mail: "",
        message: ""
    })
    let inputFirstName = useRef()
    let inputLastName = useRef()
    let inputEmail = useRef()
    let inputMsg = useRef()
    const submitForm = (e) => {
        e.preventDefault()
        if (!inputFirstName.current.value || !inputLastName.current.value || !inputEmail.current.value || !inputMsg.current.value) {
            console.log("veuillez remplire le formulaire svp")
            setFormError(true)
            console.log("",formError)
        } else {
            setFormError(false)
            const infoForm = {
                prenom: inputFirstName.current.value,
                nom: inputLastName.current.value,
                mail: inputEmail.current.value,
                message: inputMsg.current.value
            }
            setContentForm(infoForm)
            localStorage.setItem("newContact",JSON.stringify(infoForm))
            console.log(infoForm)
closeModal()        }
    }

    return (
        showModal && <section className="contact">
            <div className="modal-form">
                <div className="header-modal">
                    <h1> Contactez-moi</h1>
                    <div onClick={closeModal}>                    <MdOutlineClose onClick={closeModal} />
                    </div>
                </div>
                <h2>Mimi kill</h2>
                <form onSubmit={submitForm}>
                    <label>Prénom</label>
                    <input type="text" id="prenom" ref={inputFirstName} />
                    <label>Nom</label>
                    <input type="text" id="nom" ref={inputLastName} />
                    <label>E-mail</label>
                    <input type="mail" id="mail" ref={inputEmail} />
                    <label>Votre message</label>
                    <input type="text" id="message" ref={inputMsg} />
                    {formError===true?(<p  className="erreurForm">Veuillez remplire le formulaire</p>):null  }
                    <button type="submit" className="submit-button">envoyer</button>
                </form>

            </div>
        </section>

    )
}