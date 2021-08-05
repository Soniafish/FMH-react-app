import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarkerAlt, faUserTie, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { API_WISHLIST } from "./constants.js";

const Wishlist = ({ isLogin }) => {
    
    const [delHouseid, setDelWish] = useState("");
    const [wishList, setWishList] = useState([]);

    useEffect(() => {

        if (isLogin ){
            let userData = localStorage.getItem('user');

            fetch(API_WISHLIST, {
                method: 'PATCH',
                body: JSON.stringify({
                    "userid": JSON.parse(userData).id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                crossDomain: true,
            }).then(res => {
                return res.json();
            }).then(result => {
                console.log(result);

                if (result.hasOwnProperty("data")) {
                    console.log(result.data);

                    setWishList(result.data);
                    
                } else {
                    console.log(result.message);
                }

            });

        }else{
            alert("尚未登入");
            // window.location.href = `http://localhost:3000/`;
            window.location.href = `https://fmh-react-app.web.app`;
        }
        
    }, [delHouseid])

    console.log(wishList.length);
    if (wishList.length>0){
        return <div className="mainCnt">
            <div className="container">
                <div className="wishlist">{wishList.map(house => <Pdbox key={house.houseid} pdinfo={house} setDelWish={setDelWish} />)}</div>
            </div>
        </div>;
    }else{
        return <div className="mainCnt" style={{ "height": "100vh", "lineHeight": "200px", "textAlign": "center", "fontSize": "18px"}}>查無資料</div>
    }
    
};

const Pdbox = ({ pdinfo, setDelWish}) => {
    
    function delWish(houseid) {

        let userData = localStorage.getItem('user');

        fetch(API_WISHLIST, {
            method: 'DELETE',
            body: JSON.stringify({
                // "userid": user.id,
                "userid": JSON.parse(userData).id,
                "houseid": houseid
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
                alert("刪除成功");

                setDelWish(houseid);

            } else {
                alert(result.message);
            }

        });

    }

    return <div className="pdbox">
        <div className="pdbox_img">
            <img src={pdinfo.photo_src} alt="" />
            <div className="pdbox_price">
                <p>{pdinfo.house_price + pdinfo.house_price_unit}</p>
                <p>{pdinfo.area_price}</p>
            </div>
            <button className="btn_delwish" onClick={() => delWish(pdinfo.houseid)}><FontAwesomeIcon icon={faTrashAlt} color="gray"/></button>
        </div>
        <div className="pdbox_info">
            <Link to={"/pdcnt/" + pdinfo.houseid} className="title">{pdinfo.title}</Link>
            <p><FontAwesomeIcon icon={faHome} />{pdinfo.area_misc}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} />{pdinfo.address}</p>
            <p><FontAwesomeIcon icon={faUserTie} />{pdinfo.im_name}</p>
        </div>
    </div>;

}

export default Wishlist;