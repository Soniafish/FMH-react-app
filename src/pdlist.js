import React, { useState, useEffect } from "react";

import { API_HOUSES } from "./constants.js";

import Search from "./search.js";
import Filter from "./filter.js";
import Sort from "./sort.js";
import Map from "./map.js";
import Pagination from "./pagination.js";
import List from "./list.js";


const Pdlist = () => {

    const [sentApiData, updateSentApiData] = useState({
        "currentPage": 1,
        "keyword": "",
        "filter": {
            "country": "中正區",
            "layout": "all",
            "price": {
                "min": -1,
                "max": -1
            },
            "size": {
                "min": -1,
                "max": -1
            }
        },
        "sortby": {
            "kind": "",
            "order": ""
        }
    });
    const [houseList, setHouseList] = useState([]);
    const [pagination, setPageBtn] = useState({});
    const [mapCenter, setMap] = React.useState({
        lat: 25.0326319,
        lng: 121.5138591
    });
    const [mapZoom, setZoom] = React.useState(13);

    useEffect(() => {

        let mounted = true;

        // console.log("useEffect!");
        // console.log(sentApiData);

        fetch(API_HOUSES, {
            method: 'POST',
            body: JSON.stringify(sentApiData),
            headers: {
                'Content-Type': 'application/json'
            },
            crossDomain: true,
        }).then(res => {
            return res.json();
        }).then(result => {
            // console.log(result);

            if (result.hasOwnProperty("data")) {
                // console.log(result.data);

                if (mounted) {
                    setHouseList(result.data);

                    setPageBtn({
                        "nextPage": result.nextPage,
                        "sumItem": result.sumItem,
                        "totalPage": result.totalPage
                    });
                    
                    if (result.data.length>0){
                        setMap({
                            "lat": result.data[0].lat,
                            "lng": result.data[0].lng
                        });
                    }
                    
                }

            } else {
                alert(result.message);
            }

        });

        return () => mounted = false;

    }, [sentApiData]);


    return <div className="mainCnt">
        <Search changeSentApiData={updateSentApiData} />
        <Filter changeSentApiData={updateSentApiData} />
        <div className="container">
            <Sort sentApiData={sentApiData} changeSentApiData={updateSentApiData} />

            <div className="pdlist_wrap">
                <Map mapCenterInfo={mapCenter} mapZoomInfo={mapZoom} houseList={houseList} />
                <List houseList={houseList}></List>
            </div>

            <Pagination pagination={pagination} sentApiData={sentApiData} changeSentApiData={updateSentApiData} />
        </div>
    </div>;

}

export default Pdlist;