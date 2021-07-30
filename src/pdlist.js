import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { Link } from "react-router-dom";

import { API_HOST, API_GET_HOUSES } from "./constants.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

var pdlistSentData = {
    "currentPage": 1,
    "keyword": "",
    "filter": {
        "country": "all",
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
};

// var pageInfo = {
//     "nextPage": 0,
//     "sumItem": 0,
//     "totalPage": 0
// };

const Pdlist = () => {

    const [sentApiData, updateSentApiData] = useState(pdlistSentData);
    const [houseList, setHouseList] = useState([]);
    const [pagination, setPageBtn] = useState({});

    const [mapCenter, setMap] = React.useState({
        lat: 25.0377383,
        lng: 121.5646717
    });

    const [mapZoom, setZoom] = React.useState(12);

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         setMap(pos);
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     console.log("未允許或遭遇錯誤！");
    //     //給予預設經緯度
    //     // setMap({
    //     //     lat: 25.0377383,
    //     //     lng: 121.5646717
    //     // });
    //     // setZoom(15)
    // }

    useEffect(() => {

        let mounted = true;

        console.log("useEffect!");
        console.log(sentApiData);

        fetch(API_GET_HOUSES, {
            method: 'POST',
            body: JSON.stringify(sentApiData),
            headers: {
                'Content-Type': 'application/json'
            },
            crossDomain: true,
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result);

            if (result.hasOwnProperty("data")) {
                // console.log(result.data);

                if (mounted) {
                    setHouseList(result.data);

                    setPageBtn({
                        "nextPage": result.nextPage,
                        "sumItem": result.sumItem,
                        "totalPage": result.totalPage
                    });
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
            <Sort changeSentApiData={updateSentApiData} />

            <div className="pdlist_wrap">
                <Map mapCenterInfo={mapCenter} mapZoomInfo={mapZoom} houseList={houseList} />
                <List houseList={houseList}></List>
            </div>

            <Pagination pagination={pagination} changeSentApiData={updateSentApiData} />
        </div>
    </div>;

}

const Search = ({ changeSentApiData }) => {
    const [hot_word, setHotWord] = useState("");

    function txtChange(e) {
        // console.log(e.target.value);
        setHotWord(e.target.value);
    }

    function sendHotWord() {
        // console.log(hot_word);

        if (hot_word !== "") {
            pdlistSentData = {
                "currentPage": 1,
                "keyword": hot_word,
                "filter": {
                    "country": "all",
                    "layout": "all",
                    "price": {
                        "min": -1,
                        "max": -1,
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

            };

            changeSentApiData(pdlistSentData);

        }

    }

    return <div className="search_wrap">
        <p className="logo_txt">Find My House</p>
        <p className="header_txt">為你找到好物件</p>
        <div className="search_inner">
            <input type="text" value={hot_word} onChange={txtChange} placeholder="輸入路名或社區" /> <button onClick={sendHotWord}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    </div>;

}

const Filter = ({ changeSentApiData }) => {
    const [country, setCountry] = useState("all");
    const [layout, setLayout] = useState("all");
    const [price, setPrice] = useState("-1");
    const [size, setSize] = useState("-1");

    function countryChange(e) {
        setCountry(e.target.value);
        // console.log('currentTarget country is: ' + e.currentTarget.value);
        console.log('Your country is: ' + country);
    }
    function layoutChange(e) {
        setLayout(e.target.value);
        // console.log('currentTarget layout is: ' + e.target.value);
        console.log('Your layout is: ' + layout);
    }
    function priceChange(e) {
        setPrice(e.target.value);
        // console.log('currentTarget price is: ' + e.target.value);
        console.log('Your price is: ' + price);
    }

    function sizeChange(e) {
        setSize(e.target.value);
        // console.log('currentTarget size is: ' + e.target.value);
        console.log('Your price is: ' + size);
    }

    function sentFilter(e) {

        let range_price = [];
        if (price === "-1") {
            range_price = [-1, -1];
        } else {
            let split_price = price.split("-");
            // console.log(split_price);
            range_price[0] = parseInt(split_price[0]);
            range_price[1] = parseInt(split_price[1]);
        }
        // console.log(range_price);

        let range_size = [];
        if (size === "-1") {
            range_size = [-1, -1];
        } else {
            let split_size = size.split("-");
            // console.log(split_size);
            range_size[0] = parseInt(split_size[0]);
            range_size[1] = parseInt(split_size[1]);
        }
        // console.log(range_size);

        pdlistSentData = {
            "currentPage": 1,
            "keyword": "",
            "filter": {
                "country": country,
                "layout": layout,
                "price": {
                    "min": range_price[0],
                    "max": range_price[1],
                },
                "size": {
                    "min": range_size[0],
                    "max": range_size[1]
                }
            },
            "sortby": {
                "kind": "",
                "order": ""
            }
        };

        // console.log(pdlistSentData);
        changeSentApiData(pdlistSentData);

    }
    return <div className="filter_wrap">
        <div className="container filter">
            <ul>
                <li>
                    <p>區域</p>
                    <div className="submenu">
                        <label className="filter_item"><input type="radio" name="country" value="all" checked={country === "all" ? true : false} onChange={countryChange} /><span>不限</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="中正區" checked={country === "中正區" ? true : false} onChange={countryChange} /><span>中正區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="大同區" checked={country === "大同區" ? true : false} onChange={countryChange} /><span>大同區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="中山區" checked={country === "中山區" ? true : false} onChange={countryChange} /><span>中山區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="松山區" checked={country === "松山區" ? true : false} onChange={countryChange} /><span>松山區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="大安區" checked={country === "大安區" ? true : false} onChange={countryChange} /><span>大安區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="萬華區" checked={country === "萬華區" ? true : false} onChange={countryChange} /><span>萬華區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="信義區" checked={country === "信義區" ? true : false} onChange={countryChange} /><span>信義區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="士林區" checked={country === "士林區" ? true : false} onChange={countryChange} /><span>士林區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="北投區" checked={country === "北投區" ? true : false} onChange={countryChange} /><span>北投區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="內湖區" checked={country === "內湖區" ? true : false} onChange={countryChange} /><span>內湖區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="南港區" checked={country === "南港區" ? true : false} onChange={countryChange} /><span>南港區</span></label>
                        <label className="filter_item"><input type="radio" name="country" value="文山區" checked={country === "文山區" ? true : false} onChange={countryChange} /><span>文山區</span></label>
                    </div>
                </li>
                <li>
                    <p>格局</p>
                    <div className="submenu">
                        <label className="filter_item"><input type="radio" name="layout" value="all" checked={layout === "all" ? true : false} onChange={layoutChange} /><span>不限</span></label>
                        <label className="filter_item"><input type="radio" name="layout" value="1房" checked={layout === "1房" ? true : false} onChange={layoutChange} /><span>一房</span></label>
                        <label className="filter_item"><input type="radio" name="layout" value="2房" checked={layout === "2房" ? true : false} onChange={layoutChange} /><span>兩房</span></label>
                        <label className="filter_item"><input type="radio" name="layout" value="3房" checked={layout === "3房" ? true : false} onChange={layoutChange} /><span>三房</span></label>
                        <label className="filter_item"><input type="radio" name="layout" value="4房" checked={layout === "4房" ? true : false} onChange={layoutChange} /><span>四房以上</span></label>
                    </div>
                </li>
                <li>
                    <p>金額</p>
                    <div className="submenu">
                        <label className="filter_item"><input type="radio" name="price" value="-1" checked={price === "-1" ? true : false} onChange={priceChange} /><span>不限</span></label>
                        <label className="filter_item"><input type="radio" name="price" value="0-500" checked={price === "0-500" ? true : false} onChange={priceChange} /><span>500萬以下</span></label>
                        <label className="filter_item"><input type="radio" name="price" value="500-1000" checked={price === "500-1000" ? true : false} onChange={priceChange} /><span>500萬～1000萬</span></label>
                        <label className="filter_item"><input type="radio" name="price" value="1000-1500" checked={price === "1000-1500" ? true : false} onChange={priceChange} /><span>1000萬～1500萬</span></label>
                        <label className="filter_item"><input type="radio" name="price" value="1500-99999" checked={price === "1500-99999" ? true : false} onChange={priceChange} /><span>1500萬以上</span></label>
                    </div>
                </li>
                <li>
                    <p>坪數</p>
                    <div className="submenu">
                        <label className="filter_item"><input type="radio" name="size" value="-1" checked={size === "-1" ? true : false} onChange={sizeChange} /><span>不限</span></label>
                        <label className="filter_item"><input type="radio" name="size" value="0-10" checked={size === "0-10" ? true : false} onChange={sizeChange} /><span>10坪以下</span></label>
                        <label className="filter_item"><input type="radio" name="size" value="10-20" checked={size === "10-20" ? true : false} onChange={sizeChange} /><span>10坪～20坪</span></label>
                        <label className="filter_item"><input type="radio" name="size" value="20-30" checked={size === "20-30" ? true : false} onChange={sizeChange} /><span>20坪～30坪</span></label>
                        <label className="filter_item"><input type="radio" name="size" value="30-40" checked={size === "30-40" ? true : false} onChange={sizeChange} /><span>30坪～40坪</span></label>
                        <label className="filter_item"><input type="radio" name="size" value="40-1000" checked={size === "40-1000" ? true : false} onChange={sizeChange} /><span>40坪以上</span></label>
                    </div>
                </li>
            </ul>
            <button className="btn_filter" onClick={sentFilter}>搜尋</button>
        </div>
    </div>;

}

const Sort = ({ changeSentApiData }) => {
    const [sort, setSortby] = useState("choice");

    function handleSortBy(e) {
        setSortby(e.target.value);
        console.log('Your sort is: ' + sort);

        if (e.target.value !== "choice") {
            let split_sortby = e.target.value.split("-");
            // console.log(split_sortby);

            let newPdlistSentData = {
                "currentPage": pdlistSentData.currentPage,
                "keyword": pdlistSentData.keyword,
                "filter": {
                    "country": pdlistSentData.filter.country,
                    "layout": pdlistSentData.filter.layout,
                    "price": {
                        "min": pdlistSentData.filter.price.min,
                        "max": pdlistSentData.filter.price.max
                    },
                    "size": {
                        "min": pdlistSentData.filter.size.min,
                        "max": pdlistSentData.filter.size.max
                    }
                },
                "sortby": {
                    "kind": split_sortby[0],
                    "order": split_sortby[1]
                }
            };
            pdlistSentData = newPdlistSentData;
            changeSentApiData(newPdlistSentData);

        }

    }

    return <div className="sort_wrap">
        <select className="sort" value={sort} onChange={handleSortBy}>
            <option value="choice">請選擇</option>
            <option value="house_price-asc">金額由低到高</option>
            <option value="house_price-desc">金額由高到低</option>
            <option value="house_size-asc">坪數由小到大</option>
            <option value="house_size-desc">坪數由大到小</option>
        </select>
    </div>;

}

const Map = ({ mapCenterInfo, mapZoomInfo, houseList }) => {

    const MyPosition = ({ text }) => <div className="mark"><i className="fas fa-map-marker-alt"></i><div>{text}</div></div>;
    const HousesPosition = ({ text }) => <div className="mark_h"><i className="fas fa-map-marker-alt"></i><div>{text}</div></div>;

    console.log(mapCenterInfo.lat + ", " + mapCenterInfo.lng);

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects

    };

    // house_mark = houseList.map
    return <div className="map_wrap">
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDoRK3B7f6M30jo_sZa1yOb4UcDBlAQhKQ" }}
            defaultCenter={mapCenterInfo}
            defaultZoom={mapZoomInfo}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            <MyPosition
                lat={mapCenterInfo.lat}
                lng={mapCenterInfo.lng}
                text="My Marker"
                className="mark"
            />

            {/* {houseList.map(house => <HousesPosition key={house.houseid} lat={house.lat} lng={house.lng} text={house.address + " / " + house.house_price + house.house_price_unit} className="mark"/>)} */}

        </GoogleMapReact>
    </div>;

}

const List = ({ houseList }) => {
    if (houseList.length === 0) {
        return <div className="pdlist"><div>查無資料</div></div>;
    }

    return <div className="pdlist">{houseList.map(house => <Pdbox key={house.houseid} pdinfo={house} />)}</div>;

}

const Pdbox = ({ pdinfo }) => {
    // console.log(pdinfo);
    return <div className="pdbox">
        <img src={pdinfo.photo_src} alt="" />
        <div className="pdbox_info">
            <Link to={"/pdcnt/" + pdinfo.houseid} className="title">{pdinfo.title}</Link>
            <p><FontAwesomeIcon icon={faHome} />{pdinfo.area_misc}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} />{pdinfo.address}</p>
            {/* <p><i className="fas fa-user-edit"></i>仲介 林小姐</p> */}
        </div>
        <div className="pdbox_price">
            <p>{pdinfo.house_price + pdinfo.house_price_unit}</p>
            <p>{pdinfo.area_price + "/坪"}</p>
        </div>
    </div>;

}

const Pagination = ({ pagination, changeSentApiData }) => {

    // console.log("pagination:");
    // console.log(pagination)
    let pageBtns = [];

    if (pagination.totalPage > 0) {

        let prevBtn, nextBtn, pageHtml;

        if (pagination.totalPage === 1) {//  總共只有一頁
            pageHtml = <span key={"page"}> 1 / 1</span>;
            prevBtn = "";
            nextBtn = "";
        } else if (pagination.nextPage === -1) {//  沒有下一頁
            pageHtml = <span key={"page_txt"}> {pagination.totalPage}/ {pagination.totalPage}</span>;
            nextBtn = "";
            if (pagination.totalPage === 2) {//沒有上一頁
                prevBtn = "";
            } else {
                prevBtn = <button key={"btn_prev"} onClick={pageChange}><span style={{ "display": "none" }}>{pagination.totalPage - 1}</span>上一頁</button>;
            }
        } else {
            pageHtml = <span key={"page_txt"}> {pagination.nextPage - 1}/ {pagination.totalPage}</span>;
            nextBtn = <button key={"btn_next"} onClick={pageChange}><span style={{ "display": "none" }}>{pagination.nextPage}</span>下一頁</button>;
            if ((pagination.nextPage - 1) === 1) {//沒有上一頁
                prevBtn = "";
            } else {
                prevBtn = <button key={"btn_prev"} onClick={pageChange}><span style={{ "display": "none" }}>{pagination.nextPage - 2}</span>上一頁</button>;
            }
        }

        pageBtns.push([prevBtn, pageHtml, nextBtn])
    }
    // console.log(pageBtns);


    function pageChange(e) {

        // console.log(e.target.innerHTML);
        // let newPage = parseInt(e.target.innerHTML);

        // console.log(e.target.childNodes[0].innerHTML);
        let newPage = parseInt(e.target.childNodes[0].innerHTML);
        // console.log(typeof (newPage));
        // console.log(newPage+", "+pdlistSentData.currentPage);

        if (newPage !== pdlistSentData.currentPage) {
            // pdlistSentData.currentPage = newPage;
            // console.log(pdlistSentData);
            // changeSentApiData(pdlistSentData);

            let newPdlistSentData = {
                "currentPage": newPage,
                "keyword": pdlistSentData.keyword,
                "filter": {
                    "country": pdlistSentData.filter.country,
                    "layout": pdlistSentData.filter.layout,
                    "price": {
                        "min": pdlistSentData.filter.price.min,
                        "max": pdlistSentData.filter.price.max
                    },
                    "size": {
                        "min": pdlistSentData.filter.size.min,
                        "max": pdlistSentData.filter.size.max
                    }
                },
                "sortby": {
                    "kind": pdlistSentData.sortby.kind,
                    "order": pdlistSentData.sortby.order
                }
            };

            pdlistSentData = newPdlistSentData;
            changeSentApiData(newPdlistSentData);

        }
    }

    return <div className="pagination">{pageBtns}</div>
}

export default Pdlist;