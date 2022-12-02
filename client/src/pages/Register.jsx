import React, { useState, useEffect } from "react"
import axios from "axios"
import "../stylesheets/Register.css"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Logo from "../assets/logo.jpeg"
import { REGISTER_ROUTE } from "../utils/APIRoutes"


const Register = () => {

    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    useEffect(() => {
        if (localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, [])

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            )
            return false
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            )
            return false
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            )
            return false
        } else if (email === "") {
            toast.error("Email is required.", toastOptions)
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const { email, username, password } = values
            const { data } = await axios.post(REGISTER_ROUTE, {
                username,
                email,
                password,
            })

            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem(
                    import.meta.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                )
                navigate("/")
            }
        }
    }
    return (
        <div className='form-container-register'>
            <form className="form-register" action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="brand-register">
                    <img className="img-register" src={Logo} alt="logo" />
                    <h1>WeConnkt</h1>
                </div>
                <input
                    className="input-register"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => handleChange(e)}
                />
                <input
                className="input-register"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                />
                <input
                className="input-register"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <input
                className="input-register"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                />
                <button className="button-register" type="submit">Create User</button>
                <span className="span-register">
                    Already have an account ? <Link className="a-register" to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register