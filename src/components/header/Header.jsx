import React ,{useState} from 'react'
import "./header.css"
const Header = () => {
    // TOGGLE MENU
    const [Toggle,showMenu]=useState(false);

  return (
    <header className="header">
        <nav className="nav container">
            <a href="index.html" className="nav__logo">Komal Reddy K</a>
            <div className={Toggle? "nav__menu show-menu":"nav__menu"}>
                <ul className="nav__list grid">
                    <li className="nav__item">
                        <a href="#home" className="nav__link active-link">
                            <i className="iuil uil-estate nav__icon"></i> Home
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#about" className="nav__link">
                            <i className="iuil uil-user nav__icon"></i> About
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#skills" className="nav__link">
                            <i className="iuil uil-file-alt nav__icon"></i> Skills
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#qualification" className="nav__link">
                            <i className="iuil uil-award nav__icon"></i> Qualifications
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#certification" className="nav__link">
                            <i className="iuil uil-trophy nav__icon"></i> Certifications
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#portfolio" className="nav__link">
                            <i className="iuil uil-scenery nav__icon"></i> Works
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#stats" className="nav__link">
                            <i className="iuil uil-chart-growth nav__icon"></i> Github Stats
                        </a>
                    </li>
                    <li className="nav__item">
                        <a href="#contact" className="nav__link">
                            <i className="iuil uil-message nav__icon"></i>Contact
                        </a>
                    </li>
                </ul>

                <i class="uil uil-times nav__close" onClick={() => showMenu(!Toggle)}></i>
            </div>

            <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
                <i class="uil uil-apps"></i>
            </div>
        </nav>
    </header>

  )
}

export default Header