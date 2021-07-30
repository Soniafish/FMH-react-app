import React, { useState } from "react";
// import ReactHtmlParser, {
//     convertNodeToElement,
//     processNodes
// } from "react-html-parser";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faShoppingBag, faTree, faSchool, faHospital } from '@fortawesome/free-solid-svg-icons'

const tabNav = ['房屋資料', '生活機能', '屋況特色'];
const Tab = ({ houseInfo, houseLife }) => {

    const [active, setActive] = useState(tabNav[0]);

    return <div className="tab">
        <ul className="tab_nav">
            {tabNav.map((nav, idx) => (
                <li
                    className={active === nav ? "tab_nav_li active" : "tab_nav_li"}
                    key={idx}
                    onClick={() => setActive(nav)}
                >{nav}</li>
            ))}
        </ul>
        <div className={active === tabNav[0] ? "tab_cnt active" : "tab_cnt"}>
            <p><span>現況:</span>{houseInfo.statusquo !== "" ? houseInfo.statusquo : "-"}</p>
            <p><span>型態:</span>{houseInfo.shape !== "" ? houseInfo.shape : "-"}</p>
            <p><span>裝潢:</span>{houseInfo.fitment !== "" ? houseInfo.fitment : "-"}</p>
            <p><span>管理費:</span>{houseInfo.managefee !== "" ? houseInfo.managefee : "-"}</p>
            <p><span>帶租約:</span>{houseInfo.isrent_ing !== "" ? houseInfo.isrent_ing : "-"}</p>
            <p><span>車位:</span>{houseInfo.parking !== "" ? houseInfo.parking : "-"}</p>
            <p><span>主建物:</span>{houseInfo.area_main}</p>
            <p><span>附屬建物:</span>{houseInfo.area_sub !== "" ? houseInfo.area_sub : "-"}</p>
            <p><span>土地坪數:</span>{houseInfo.area_land !== "" ? houseInfo.area_land : "-"}</p>
        </div>
        <div className={active === tabNav[1] ? "tab_cnt active" : "tab_cnt"}>
            <label className="nearby_item"><input type="checkbox" name="nearby" value="store" checked={houseLife.store ? true : false} readOnly /><span><FontAwesomeIcon icon={faStore} />近便利商店</span></label>
            <label className="nearby_item"><input type="checkbox" name="nearby" value="market" checked={houseLife.market ? true : false} readOnly /><span><FontAwesomeIcon icon={faShoppingBag} />近傳統市場</span></label>
            <label className="nearby_item"><input type="checkbox" name="nearby" value="park" checked={houseLife.park ? true : false} readOnly /><span><FontAwesomeIcon icon={faTree} />近公園綠地</span></label>
            <label className="nearby_item"><input type="checkbox" name="nearby" value="school" checked={houseLife.school ? true : false} readOnly /><span><FontAwesomeIcon icon={faSchool} />近學校</span></label>
            <label className="nearby_item"><input type="checkbox" name="nearby" value="hospital" checked={houseLife.hospital ? true : false} readOnly /><span><FontAwesomeIcon icon={faHospital} />近醫療機構</span></label>
        </div>
        <div className={active === tabNav[2] ? "tab_cnt active" : "tab_cnt"}>
            {/* <div className="max">{ReactHtmlParser(houseInfo.remark)}</div> */}
        </div>
    </div>;
}

export default Tab;