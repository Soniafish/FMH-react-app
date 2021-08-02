import React, { useState } from "react";
import { API_GET_USER } from "./constants.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Regiest = ({ popupName, openPopup}) => {

    const [username, setName] = useState("");
    const [userpw, setPW] = useState("");
    const [useremail, setEmail] = useState("");
    const [nameError, altNameError] = useState("");
    const [emailError, altEmailError] = useState("");
    const [pwError, altPWError] = useState("");
    const [regiestMessage, altRegiestMessage] = useState("");

    function closePopup() {
        openPopup("");
        clearMessage();
        clearIpt();
    }

    function changePopup() {
        openPopup("login");
        clearMessage();
        clearIpt();
    }

    function nameChange(e) {
        setName(e.target.value);
    }

    function emailChange(e) {
        setEmail(e.target.value);
    }

    function pwChange(e) {
        setPW(e.target.value);
    }

    function clearMessage() {
        altNameError("");
        altEmailError("");
        altPWError("");
        altRegiestMessage("");
    }

    function clearIpt() {
        setName("");
        setEmail("");
        setPW("");
    }

    function regist() {
        clearMessage();
        if (username === "" || useremail === "" || userpw === "") {
            if (username === "") {
                altNameError("欄位不可為空");
            }
            if (useremail === "") {
                altEmailError("欄位不可為空");
            }
            if (userpw === "") {
                altPWError("欄位不可為空");
            }
        }else {
            fetch(API_GET_USER, {
                method: 'POST',
                body: JSON.stringify({
                    name: username,
                    email: useremail,
                    password: userpw
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
                    altRegiestMessage("註冊成功, 請重新登入");
                    setTimeout(() => {
                        openPopup("login");
                        clearMessage();
                        clearIpt();
                    }, 1000);
                } else {
                    altRegiestMessage(result.message);
                }
            });

        }
    }
    return <div className={popupName === "regiest" ? "pagecover show" : "pagecover"}>
        <div className="popup" id="popup_regist">
            <span></span>
            <button className="btn_esc" onClick={closePopup}><FontAwesomeIcon icon={faTimes} /></button>
            <p className="title">註冊會員帳號</p>
            <div>
                <input type="text" name="username" value={username} onChange={nameChange} placeholder="輸入姓名"/>
                <span className="error">{nameError === "" ? "" : nameError}</span>
            </div>
            <div>
                <input type="email" name="useremail" value={useremail} onChange={emailChange} placeholder="輸入密碼"/>
                <span className="error">{emailError === "" ? "" : emailError}</span>
            </div>
            <div>
                <input type="text" name="userpw" value={userpw} onChange={pwChange} placeholder="輸入電子信箱"/>
                <span className="error">{pwError === "" ? "" : pwError}</span>
            </div>
            <button className="btn_regiest" onClick={regist}>註冊新帳號</button>
            <p>{regiestMessage === "" ? "" : regiestMessage}</p>
            <button class="btn_txt" onClick={changePopup}>已經有帳戶了？點此登入</button>
        </div>
    </div>;
}

export default Regiest;