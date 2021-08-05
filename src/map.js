import React from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Map = ({ mapCenterInfo, mapZoomInfo, houseList }) => {

    // const MyPosition = ({ text }) => <div className="mark"><FontAwesomeIcon icon={faMapMarkerAlt} /><div>{text}</div></div>;
    const HousesPosition = ({ href, address, price }) => <Link to={"/pdcnt/" + href}><div className="mark_h"><FontAwesomeIcon icon={faHome} color="green" /><div>{address}<br />{"總價: " + price}</div></div></Link>;

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
            {/* <MyPosition
                lat={mapCenterInfo.lat}
                lng={mapCenterInfo.lng}
                text="My Marker"
                className="mark"
            /> */}

            {houseList.map(house => <HousesPosition key={house.houseid} lat={house.lat} lng={house.lng} href={house.houseid} address={house.address} price={house.house_price + house.house_price_unit} className="mark" />)}

        </GoogleMapReact>
    </div>;

}

export default Map;