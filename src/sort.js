import React, { useState } from "react";

const Sort = ({ sentApiData, changeSentApiData }) => {
    const [sort, setSortby] = useState("choice");

    function handleSortBy(e) {
        setSortby(e.target.value);
        console.log('Your sort is: ' + sort);

        if (e.target.value !== "choice") {
            let split_sortby = e.target.value.split("-");
            // console.log(split_sortby);

            let newPdlistSentData = {
                "currentPage": 1,
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
                    "kind": split_sortby[0],
                    "order": split_sortby[1]
                }
            };
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

export default Sort;