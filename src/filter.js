import React, { useState } from "react";

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

        let pdlistSentData = {
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

export default Filter;