import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ changeSentApiData }) => {
    const [hot_word, setHotWord] = useState("");

    function txtChange(e) {
        // console.log(e.target.value);
        setHotWord(e.target.value);
    }

    function sendHotWord() {
        // console.log(hot_word);

        if (hot_word !== "") {
            let pdlistSentData = {
                "currentPage": 1,
                "keyword": hot_word,
                "filter": {
                    "country": "all",
                    "layout": "all",
                    "price": {
                        "min": -1,
                        "max": -1,
                    },
                    "size": {
                        "min": -1,
                        "max": -1
                    }
                },
                "sortby": {
                    "kind": "",
                    "order": ""
                }

            };

            changeSentApiData(pdlistSentData);

        }

    }

    return <div className="search_wrap">
        <p className="logo_txt">Find My House</p>
        <p className="header_txt">為你找到好物件</p>
        <div className="search_inner">
            <input type="text" value={hot_word} onChange={txtChange} placeholder="輸入路名或社區" /> <button onClick={sendHotWord}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
    </div>;

}

export default Search;