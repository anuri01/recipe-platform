import React from 'react'
import {useNavigate} from 'react-router-dom'
import useLayerStore from '../store/layerStore'
import Menu from './Menu'
import './Header.css'

function SubHeader({title, showMenu}) {
  const navigate = useNavigate()
  const {openLayer, closeLayer} = useLayerStore()

  return (
    <header className="sub-header">
      <div className="sub-header-left">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src="/images/back-button.png" alt="뒤로가기" />
        </button>
        <h2>{title}</h2>
      </div>
      {showMenu && (
        <img
          onClick={openLayer}
          className="menu"
          src="images/menu_icon.png"
          alt="메뉴아이콘"></img>
      )}
      <Menu />
    </header>
  )
}

export default SubHeader
