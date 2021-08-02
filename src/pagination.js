import React from "react";

const Pagination = ({ pagination, sentApiData, changeSentApiData }) => {

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

        let newPage = parseInt(e.target.childNodes[0].innerHTML);

        if (newPage !== sentApiData.currentPage) {

            let newPdlistSentData = {
                "currentPage": newPage,
                "keyword": sentApiData.keyword,
                "filter": {
                    "country": sentApiData.filter.country,
                    "layout": sentApiData.filter.layout,
                    "price": {
                        "min": sentApiData.filter.price.min,
                        "max": sentApiData.filter.price.max
                    },
                    "size": {
                        "min": sentApiData.filter.size.min,
                        "max": sentApiData.filter.size.max
                    }
                },
                "sortby": {
                    "kind": sentApiData.sortby.kind,
                    "order": sentApiData.sortby.order
                }
            };

            changeSentApiData(newPdlistSentData);

        }
    }

    return <div className="pagination">{pageBtns}</div>
}

export default Pagination;