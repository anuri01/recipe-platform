import React, { useState } from "react";
import toast from "react-hot-toast";
import './Header.css'

function MainHeader() {
    const [ keyword, setKeyword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        toast('검색기능은 준비중입니다.')

    }

    return (
        <div className="main-header">
            <a href="/">
            <img src="images/logo.png" className="logo" alt="아빠요리 로고"></img>
            </a>
            <div className="search-form">
                {/* <div className="search-input"> */}
                    <form className="search-input" onSubmit={handleSubmit}>
                    <label htmlFor="search">
                    <img onClick={handleSubmit} src="images/search_icon.png" alt="검색 아이콘"></img>
                    </label>
                    <button id="search" type="submit">검색</button>
                    <input
                        type="text"
                        placeholder="레시피를 빠르게 검색해 보세요."
                        value={keyword}
                        onChange={ (e) => setKeyword(e.target.value) }
                    />
                    </form>
                {/* </div> */}
            </div>

        </div>
    )
}

export default MainHeader;