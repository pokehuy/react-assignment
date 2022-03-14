import React, {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        createdAt: ""
    });

    const tokenValue = {
        userId: JSON.parse(localStorage.getItem('user')).userId,
        token: JSON.parse(localStorage.getItem('user')).token
    }
    const token = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        let didCancel = false;
        let header = [];
        if(token){
            header["Authorization"] = token;
        }
        axios({
            method: "GET",
            url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${tokenValue.userId}`,
            headers: header
        }).then(response => {
            if (!didCancel) {
                setUserInfo(response.data);
            }
        }).catch(error => {
            if (!didCancel) {
                console.log(error.message);
            }
        })
    }, [tokenValue.userId, token])


    return (
        <>
            {tokenValue.userId &&
            <div>
                <h5>User's Profile</h5>
                <div>
                    <div className='user'>
                        Name: {userInfo.name}
                    </div>
                    <div className='user'>
                        UserID - {userInfo.id}
                    </div>
                </div>
            </div>}
            {!tokenValue.userId && <Navigate replace to="/login" /> }
        </>
    )
}

export default ProfilePage;