import React, { useState } from "react";
import { API_USER } from "./constants.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Login = ({ popupName, openPopup, isLogin, setLogin}) => {

    const [email, setEmail] = useState("admin@gmail.com");
    const [pw, setPW] = useState("admin1234");
    const [emailError, altEmailError] = useState("");
    const [pwError, altPWError] = useState("");
    const [loginMessage, altLoginMessage] = useState("");

    function closePopup() {
        openPopup("");
        clearIpt();
        clearMessage();
    }

    function changePopup() {
        openPopup("register");
        clearIpt();
        clearMessage();
    }

    function emailChange(e) {
        setEmail(e.target.value);
    }

    function pwChange(e) {
        setPW(e.target.value)
    }

    function clearMessage() {
        altEmailError("");
        altPWError("");
        altLoginMessage("");
    }

    function clearIpt() {
        setEmail("");
        setPW("");
    }

    function signin() {
        clearMessage();
        if (email === "") {
            altEmailError("欄位不可為空");
        } else if(pw === ""){
            altPWError("欄位不可為空")
        }else{

            fetch(API_USER, {
                method: 'PATCH',
                body: JSON.stringify({
                    email: email,
                    password: pw
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                crossDomain: true,
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                // console.log(result);
                if (result.hasOwnProperty('ok')) {
                    setLogin(true);
                    setlocalStorage(result.data);
                    altLoginMessage("登入成功！");

                    setTimeout(() => {
                        openPopup("");
                        clearMessage();
                        clearIpt();
                    }, 1000);
                } else {
                    altLoginMessage(result.message);
                }
            });

        }
    }

    function setlocalStorage(userData) {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        let limitstamp = timestamp + 86400;
        userData.limitstamp = limitstamp;
        // console.log(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    return <div className={popupName === "login" ? "pagecover show" :"pagecover"}>
        <div className="popup">
            <span></span>
            <button className="btn_esc" onClick={closePopup}><FontAwesomeIcon icon={faTimes} color="gary"/></button>
            <p className="title">登入會員帳號</p>
            <div>
                <input type="email" name="useremail" value={email} onChange={emailChange} placeholder="輸入電子信箱"/>
                <span className="error">{emailError === "" ? "" : emailError}</span>
            </div>
            <div>
                <input type="password" name="userpw" value={pw} onChange={pwChange} placeholder="輸入密碼"/>
                <span className="error">{pwError === "" ? "" : pwError}</span>
            </div>
            <button className="btn_login" onClick={signin}>登入帳號</button>
            <p id="popup_loginMessage">{loginMessage === "" ? "" : loginMessage}</p>
            <button className="btn_txt" onClick={changePopup}>還沒有帳戶？點此註冊</button>
        </div>
    </div>;
}

export default Login;