import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarkerAlt, faUserTie } from '@fortawesome/free-solid-svg-icons'

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
            <p><FontAwesomeIcon icon={faUserTie} />{pdinfo.im_name}</p>
        </div>
        <div className="pdbox_price">
            <p>{pdinfo.house_price + pdinfo.house_price_unit}</p>
            <p>{pdinfo.area_price}</p>
        </div>
    </div>;

}

export default List;