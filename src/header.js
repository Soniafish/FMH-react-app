import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <header>
            <div className="header_function">
                <a href="#"><FontAwesomeIcon icon={faUser}/></a>
                <a href="#"><FontAwesomeIcon icon={faHeart}/></a>
            </div>
            <Link to={"/"} className="logo">F.M.H</Link>
        </header>;
    }
}

export default Header;