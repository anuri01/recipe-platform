import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css'

function SubHeader({title}) {
    const navigate = useNavigate();

    return (
        <header  className="sub-header">
            <button onClick={() => navigate(-1)} className="back-button">
                <img src="/images/back-button.png" alt="뒤로가기" />
            </button>
            <h2>{title}</h2>
        </header>
    )
}

export default SubHeader;