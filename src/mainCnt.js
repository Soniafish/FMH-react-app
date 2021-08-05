import React from "react";
import { ShareSocial } from 'react-share-social'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faPhoneVolume, faHeart } from '@fortawesome/free-solid-svg-icons'

import { API_WISHLIST } from "./constants.js";

const style = {
    background: 'transparent',
    padding: '0',
};

const MainCnt = ({ houseInfo, isLogin }) => {

    function addWish() {

        let userData = localStorage.getItem('user');
        
        if (isLogin){

            console.log("可執行");
            fetch(API_WISHLIST, {
                method: 'POST',
                body: JSON.stringify({
                    "userid": JSON.parse(userData).id,
                    "houseid": houseInfo.houseid
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                crossDomain: true,
            }).then(res => {
                return res.json();
            }).then(result => {
                console.log(result);

                if (result.hasOwnProperty("ok")) {
                    console.log(result.data);

                    alert("成功加入最愛清單")

                } else {
                    alert(result.message);
                }

            });
        }else{
            alert("請先登入會員");
        }
        
    }

    return <div className="pdcnt_info">
        <h3>{houseInfo.title}</h3>
        <div className="pdcnt_price">
            <p>
                <span className="pdcnt_price_total">{houseInfo.house_price}</span>
                <span className="pdcnt_price_unit">萬元</span>
            </p>
            <p>{houseInfo.area_price}</p>
            <button><FontAwesomeIcon icon={faHeart} onClick={addWish} color="red"/></button>
        </div>
        <div className="pdcnt_layout">
            <p>
                <span>{houseInfo.layout_misc}</span>
                <span>格局</span>
            </p>
            <p>
                <span>{houseInfo.age}</span>
                <span>屋齡</span>
            </p>
            <p>
                <span>{houseInfo.house_size}坪</span>
                <span>權狀坪數</span>
            </p>
        </div>
        <div className="pdcnt_addr">
            <p><span>樓層</span>{houseInfo.floor}</p>
            <p><span>朝向</span>{houseInfo.direction !== "" ? houseInfo.direction : "-"}</p>
            <p><span>社區</span>{houseInfo.community !== "" ? houseInfo.community : "-"}</p>
            <p><span>地址</span>{houseInfo.all_addr}</p>
        </div>
        <div className="pdcnt_keeper">
            <p className="name"><FontAwesomeIcon icon={faUserTie} /> {houseInfo.im_name} <span>{houseInfo.company_name}</span></p>
            <a className="tel" href="tel:0911123123"><FontAwesomeIcon icon={faPhoneVolume} /> (暫不提供)</a>
        </div>
        <ShareSocial
            style={style}
            url={window.location.href}
            socialTypes={['facebook', 'line']}
        />
    </div>;
}

export default MainCnt;