import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Menu from "./Menu";
import useLayerStore from "../store/layerStore";
import './Header.css'

function MainHeader() {
    const [ keyword, setKeyword ] = useState('');
    const { openLayer, closeLayer} = useLayerStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast('검색기능은 준비중입니다.')

    }

    const openToMenu = (e) => {
        e.preventDefault();
        toast('전체메뉴는 준비중입니다.')
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
            <img onClick={openLayer} className="menu" src="images/menu_icon.png" alt="메뉴아이콘"></img>
            <Menu />

        </div>
    )
}

export default MainHeader;