import React from 'react'
import "./footer.css"
const Footer = () => {
  return <footer className="footer">
    <div className="footer__container container">
        <h1 className="footer__title">
        Komal Reddy K
        </h1>
        <ul className="footer__list">
            <li>
                <a href="#about" className="footer__link">About</a>
            </li>

            <li>
                <a href="#portfolio" className="footer__link">Projects</a>
            </li>

            <li>
                <a href="#skills" className="footer__link">Skills</a>
            </li>
        </ul>

        <div className="footer__social">
        <a href="https://github.com/komalreddy3" className="footer__social-link" target="_blank">
        <i className="bx bxl-github"></i>
        </a>

        <a href="https://www.linkedin.com/in/komalreddyk/" className="footer__social-link" target="_blank">
        <i className="bx bxl-linkedin"></i>
        </a>

        <a href="https://www.instagram.com/komalreddyk/" className="footer__social-link" target="_blank">
        <i className="bx bxl-instagram"></i>
        </a>

        <a href="https://twitter.com/KomalKReddy" className="footer__social-link" target="_blank">
        <i className="bx bxl-twitter"></i>
        </a>

        <a href="https://www.facebook.com/koukuntlakomalreddy/" className="footer__social-link" target="_blank">
        <i className="bx bxl-messenger"></i>
        </a>
        </div>

        <span className='footer__copy'>&#169; Komal Reddy K . All rights reserved.</span>
    </div>
  </footer>
}

export default Footer