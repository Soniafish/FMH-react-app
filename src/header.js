import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

import Login from "./login.js";
import Register from "./register.js";

const Header = ({ isLogin, setLogin})=> {
    
    const [popupName, openPopup]= useState("");

    function clickUserIcon() {
        openPopup("login");
    }

    function clickOutIcon() {
        localStorage.removeItem('user');
        setLogin(false);
    }

    return <div>
        <header>
            <div className="header_function">
                <button className={!isLogin ? "header_icon show" : "header_icon"} onClick={clickUserIcon}><FontAwesomeIcon icon={faUser} color="white"/></button>
                <button className={isLogin ? "header_icon show" : "header_icon"} onClick={clickOutIcon}><FontAwesomeIcon icon={faSignOutAlt} color="white"/></button>
                <Link to={"/wishlist"} className={isLogin ? "header_icon show" : "header_icon"}>
                    <FontAwesomeIcon icon={faHeart} color="white"/>
                </Link>
            </div>
            <Link to={"/"} className="logo">F.M.H</Link>
        </header>
        <Login popupName={popupName} openPopup={openPopup} isLogin={isLogin} setLogin={setLogin} />
        <Register popupName={popupName} openPopup={openPopup}/>
    </div>;
    
}

export default Header;