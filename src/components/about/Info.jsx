import React from 'react'

const Info = () => {
  return (
    <div className="about__info grid">
        <div className="about__box">
        <i class='bx bxs-award about__icon'></i>
            <h3 className="about__title">Experience </h3>
            <span className="about__subtitle">7 months Working</span>
        </div>

        <div className="about__box">
        <i class='bx bx-briefcase-alt about__icon' ></i>
            <h3 className="about__title">Completed</h3>
            <span className="about__subtitle">10 + Projects</span>
        </div>

        <div className="about__box">
        <i class='bx bx-code-curly about__icon' ></i>
            <h3 className="about__title">Lines of coding</h3>
            <span className="about__subtitle">14.4K+</span>
        </div>
    </div>
  )
}

export default Info
