import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

// import { API_GET_USER } from "./constants.js";
import Login from "./login.js";
import Regiest from "./regiest.js";

const Header = ()=> {
    
    const [popupName, openPopup]= useState("");
    const [user, setUser]=useState({
        "id": 0,
        "name": "",
        "email": "",
    });

    function clickUserIcon() {
        openPopup("login");
    }

    function clickOutIcon() {
        setUser({
            "id": 0,
            "name": "",
            "email": "",
        });

        // fetch(API_GET_USER, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     crossDomain: true,
        // }).then(function (response) {
        //     return response.json();//取回的字串已轉成json
        // }).then(function (result) {
        //     console.log(result);
        //     //如果是最愛清單頁, 直接導到首頁
        //     // document.location.href = config.url;
        // });
    }

    function clickFavorIcon() {
        
    }
    return <div>
        <header>
            <div className="header_function">
                <button className={user.id === 0 ? "header_icon show" : "header_icon"} onClick={clickUserIcon}><FontAwesomeIcon icon={faUser} style={{color: 'pink' }}/></button>
                <button className={user.id !== 0 ? "header_icon show" :"header_icon"} onClick={clickOutIcon}><FontAwesomeIcon icon={faSignOutAlt} /></button>
                <button className={user.id !== 0 ? "header_icon show" : "header_icon"} onClick={clickFavorIcon}><FontAwesomeIcon icon={faHeart} /></button>
            </div>
            <Link to={"/"} className="logo">F.M.H</Link>
        </header>
        <Login popupName={popupName} openPopup={openPopup} user={user} setUser={setUser}/>
        <Regiest popupName={popupName} openPopup={openPopup}/>
    </div>;
    
}

export default Header;