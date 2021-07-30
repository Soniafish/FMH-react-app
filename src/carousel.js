import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Carousel = ({ photos }) => {
    const [active, setActive] = useState(0);

    function handelPrev() {
        if (active > 0) {
            setActive(active - 1);
        }
    }

    function handelNext() {
        let total = photos.length;
        if (active < total - 1) {
            setActive(active + 1);
        }
    }
    return <div className="pdcnt_imgs">
        <div className="pdcnt_imgs_inner">
            {photos.map((photo, idx) => (
                <img key={idx} src={photo} alt="" width="100%" className={active === idx ? "active" : ""} />
            ))}
        </div>
        <button className="carousel_prev" onClick={handelPrev}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button className="carousel_next" onClick={handelNext}><FontAwesomeIcon icon={faChevronRight} /></button>
    </div>;

}

export default Carousel;