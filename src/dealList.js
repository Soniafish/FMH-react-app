import React from "react";
import uuid from 'react-uuid'

const DealList = ({ dealList, dealListPage, setDealListPage }) => {
    let page = dealListPage.currentPage;
    let totalPage = dealListPage.totalPage;

    // console.log(dealListPage);
    // console.log("page: " + page);

    function prvePage() {
        if (page !== 1) {
            setDealListPage({
                "currentPage": page - 1,
                "totalPage": totalPage
            });
        }
    }

    function nextPage() {
        if (page !== dealListPage.totalPage ){
            setDealListPage({
                "currentPage": page + 1,
                "totalPage": totalPage
            });
        }
    }
    
    let html = [];
    if (page === 0) {
        let template = <tr key={uuid()}><td colSpan="10">查無資料</td></tr>;
        html.push(template);
    } else {
        //資料
        // console.log("page:" + page);
        let start = (page - 1) * 20;
        let end = page * 20;
        
        if (page === dealListPage.totalPage) {
            end = dealList.length;
        }

        for (let i = start; i < end; i++) {
            let dealItem = dealList[i];
            let template = <DealListTr key={uuid()} dealInfo={dealItem} idx={i + 1} />;
            html.push(template);
        }

    }

    return <div>
        <table className="tb_deals">
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
        </table>
        <div className="pagination">
            <button onClick={prvePage} >上一頁</button><span>{page}/{dealListPage.totalPage}</span><button onClick={nextPage}>下一頁</button>
        </div>
    </div>;
}

const DealListTr = ({ dealInfo, idx }) => {

    return <tr key={dealInfo.houseid}>
        <td data-th="">{idx}</td>
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