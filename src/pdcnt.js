import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { API_GET_HOUSE } from "./constants.js";
// import { Compilation } from "webpack";

import Carousel from "./carousel.js";
import MainCnt from "./mainCnt.js";
import Tab from "./tab.js";
import DealList from "./dealList.js";

const Pdcnt = () => {
    let { id } = useParams();
    console.log("houseid:" + id);

    const [houseStatus, setHouseStatus] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [houseLife, setHouseLife] = useState({
        "store": false,
        "market": false,
        "park": false,
        "school": false,
        "hospital": false
    });
    const [houseInfo, setHouseInfo] = useState({});
    const [dealList, setDealList] = useState([]);
    const [dealListPage, setDealListPage] = useState({
        "currentPage": 0,
        "totalPage": 0
    });


    useEffect(() => {
        // console.log("call useEffect");

        fetch(API_GET_HOUSE, {
            method: 'POST',
            body: JSON.stringify({
                "houseid": id
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            crossDomain: true,
        }).then(res => {
            return res.json();
        }).then(result => {
            // console.log(result);

            if (result.hasOwnProperty("data")) {
                console.log(result.data);
                
                setHouseStatus(true);

                setHouseInfo(result.data.houseInfo);

                let photos = result.data.houseInfo.photos.split(",");
                setPhotos(photos);

                // console.log(result.data.houseInfo.house_life);
                if (result.data.houseInfo.house_life !== "") {
                    let nearby = {
                        "store": false,
                        "market": true,
                        "park": true,
                        "school": true,
                        "hospital": false
                    }
                    if (result.data.houseInfo.house_life.indexOf("近便利商店") > 0) {
                        nearby.store = true
                    }
                    if (result.data.houseInfo.house_life.indexOf("近傳統市場") > 0) {
                        nearby.market = true
                    }
                    if (result.data.houseInfo.house_life.indexOf("近公園綠地") > 0) {
                        nearby.park = true
                    }
                    if (result.data.houseInfo.house_life.indexOf("近學校") > 0) {
                        nearby.school = true
                    }
                    if (result.data.houseInfo.house_life.indexOf("近醫療機構") > 0) {
                        nearby.hospital = true
                    }
                    setHouseLife(nearby);
                }

                if (result.data.dealList.length>0){

                    setDealList(result.data.dealList);
                    setDealListPage({
                        "currentPage": 1,
                        "totalPage": Math.ceil(result.data.dealList.length / 20)
                    });

                }

            } else {
                alert(result.message);
            }

        });

    }, []);

    if (!houseStatus) {
        return <div className="mainCnt"><p style={{ "height": "100vh", "textAlign": "center", "fontSize": "20px", "paddingTop": "50px" }}></p></div>;
    }
    return <div className="mainCnt">
        <div className="pdcnt_top container">
            <Carousel photos={photos} />
            <MainCnt houseInfo={houseInfo} />
        </div>

        <div className="pdcnt_middle container">
            <h3>房屋介紹</h3>
            <Tab houseInfo={houseInfo} houseLife={houseLife} />
        </div>

        <div className="pdcnt_bottom container">
            <h3>實價登錄</h3>
            <DealList dealList={dealList} dealListPage={dealListPage} setDealListPage={setDealListPage}/>
        </div>

    </div>;
}

export default Pdcnt;