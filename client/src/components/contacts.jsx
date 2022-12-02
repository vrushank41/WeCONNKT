import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpeg"
import "../stylesheets/contacts.scss"
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [searchText, setearchText] = useState('')

    // useEffect(()=>{

    // }, [searchText])

    useEffect(() => {
        const getData = async () => {
            const data = await JSON.parse(
                localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
            );
            if (data) {
                setCurrentUserName(data.username);
                setCurrentUserImage(data.avatarImage);
            }
        }
        getData()
    }, []);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    const handleSearchText = (e) => {
        setearchText(e.target.value)
    }
    return (
        <>

            {currentUserImage && currentUserImage && (
                <div className="container-contact">

                    <div className="brand-contact">
                        <img className="img-contact" src={Logo} alt="logo" />
                        <h3 className="h3-contact">WeConnkt</h3>
                        {console.log(contacts)}
                    </div>
                    <div className="contacts-contact">

                        <input
                            type="text"
                            name="contact-search"
                            className="contact-search"
                            placeholder="Search your chats..."
                            value={searchText}
                            onChange={handleSearchText}
                        />
                        {contacts.filter(contact => contact.username.toLowerCase().includes(searchText.toLowerCase())).map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact-contact ${index === currentSelected ? "selected-contact" : ""
                                        }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar-contact">
                                        <img
                                            className="img-contact"
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username-contact">
                                        <h3 className="h3-contact">{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user-contact">
                        <div className="avatar-contact">
                            <img
                                className="img-contact"
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username-contact">
                            <h2 className="h2-contact">{currentUserName}</h2>
                        </div>
                        <div className="message-logout">
                            {/* <input type="text" className="message-search" placeholder="Search Messages..." value={searchMessages} onChange={handleSearchMessages} /> */}
                            <Logout />
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}
