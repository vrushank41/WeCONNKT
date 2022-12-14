import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { SET_AVATAR_ROUTE } from "../utils/APIRoutes";
import "../stylesheets/setAvatar.scss"

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const getData = async () => {
            if (!localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY))
                navigate("/login");
        }
        getData()
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
            );

            const { data } = await axios.post(`${SET_AVATAR_ROUTE}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    import.meta.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }

        getData()

    }, []);
    return (
        <>
            {isLoading ? (
                <div className="container-setavatar">
                    <img src={loader} alt="loader" className="loader-setavatar" />
                </div>
            ) : (
                <div className="container-setavatar">
                    <div className="title-container-setavatar">
                        <h1 className="h1-setavatar">Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars-setavatar">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    className={`avatar-setavatar ${selectedAvatar === index ? "selected-setavatar" : ""
                                        }`}
                                    key={avatar}
                                >
                                    <img
                                        className="img-setavatar"
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"

                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn-setavatar">
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}
