import React from 'react'

const ScrollDown = () => {
  return (
    <div className="home__scroll">
        <a href="#about" className="home__scroll-button button--flex">
        <i class="uil uil-angle-double-down wheel" style={{fontSize: "2rem",color:"black"}}></i>
        <span className="home__scroll-name">Scroll Down</span>
        </a>
    </div>
  )
}

export default ScrollDown