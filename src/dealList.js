import React, { useState } from "react";

const DealList = ({ dealList }) => {
    let html = [];
    if (dealList.length > 0) {
        html = dealList.map((dealInfo, idx) => <DealListTr key={dealInfo.date + idx} dealInfo={dealInfo} idx={idx} />);
    } else {
        html = <tr><td colSpan="10">查無資料</td></tr>;
    }
    return <table className="tb_deals">
        <thead>
            <tr>
                <th></th>
                <th>交易日期</th>
                <th>建物地址</th>
                <th>樓層</th>
                <th>建物型態</th>
                <th>坪數</th>
                <th>格局</th>
                <th>車位</th>
                <th>成交價<br />(萬元)</th>
                <th>單價<br />(萬元)</th>
            </tr>
        </thead>
        <tbody>
            {html}
        </tbody>
    </table>;
}

const DealListTr = ({ dealInfo, idx }) => {

    if (dealInfo === []) {
        return <tr><td colSpan="10">查無資料</td></tr>;
    }
    return <tr key={dealInfo.houseid}>
        <td data-th="">{idx + 1}</td>
        <td data-th="交易日期">{dealInfo.date}</td>
        <td data-th="建物地址">{dealInfo.address}</td>
        <td data-th="樓層">{dealInfo.floor}/{dealInfo.total_floor}</td>
        <td data-th="建物型態">{dealInfo.building_state.split("(")[0]}</td>
        <td data-th="坪數">{dealInfo.building_size}</td>
        <td data-th="格局">{dealInfo.pattern_room}房{dealInfo.pattern_hall}廳</td>
        <td data-th="車位">{dealInfo.cart_price === 0 ? "無" : "有"}</td>
        <td data-th="成交價(萬元)">{dealInfo.total_price}</td>
        <td data-th="單價(萬元/坪)">約{Math.round(dealInfo.total_price / dealInfo.building_size * 100) / 100}</td>
    </tr>;
}

export default DealList;