import React from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate, Navigate} from "react-router-dom";

const validateEmail = (email) => {
    if (!email) return 'Required';
    const isValidEmail = String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    if (!isValidEmail) return 'Invalid email';
    return '';
}

const validatePassword = (password) => {
        if(!password) return 'Required';
        if(password.length < 8) return 'Password must be longer than 7 characters';
        return '';
}

const LoginPage = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [logIn, setLogIn] = useState(false);
    const nav = useNavigate();

    const error = {
        email: validateEmail(email),
        password: validatePassword(password)
    }
    
    const handleEmailChange = (evt) => {
        SetEmail(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        SetPassword(evt.target.value)
    }

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        axios({
            method: "GET",
            url: `https://60dff0ba6b689e001788c858.mockapi.io/tokens`
        }).then(response => {
            //localStorage.setItem("token", response.data.token);
            //localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userToken", JSON.stringify(response.data));
            setLogIn(true);
            nav('/profile');
            window.location.reload();
        })
    }


    return (
    <>
        {logIn && <Navigate replace to="/profile"/>}
        {!logIn &&
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Your Email" value={email} onChange={handleEmailChange} name="email"/> <br/>
                <p style={{color: 'red'}}>{error.email}</p>
                <input type="password" placeholder="Your Password" value={password} onChange={handlePasswordChange} name="password"/> <br/>
                <p style={{color: 'red'}}>{error.password}</p>
                <button type="submit">Submit</button>
            </form>
        </div>}
    </>
    );
}

export default LoginPage;