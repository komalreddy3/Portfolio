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

            {/* <li>
                <a href="#qualifications" className="footer__link">Qualifications</a>
            </li> */}
        </ul>

        <div className="footer__social">
        <a href="https://github.com/komalreddy3" className="footer__social-link" target="_blank">
        <i class="bx bxl-github"></i>
        </a>

        <a href="https://www.linkedin.com/in/komalreddyk/" className="footer__social-link" target="_blank">
        <i class="bx bxl-linkedin"></i>
        </a>

        <a href="https://www.instagram.com/komalreddyk/" className="footer__social-link" target="_blank">
        <i class="bx bxl-instagram"></i>
        </a>

        <a href="https://twitter.com/KomalKReddy" className="footer__social-link" target="_blank">
        <i class="bx bxl-twitter"></i>
        </a>

        <a href="https://www.facebook.com/koukuntlakomalreddy/" className="footer__social-link" target="_blank">
        <i class="bx bxl-messenger"></i>
        </a>
        </div>

        <span className='footer__copy'>&#169; Komal Reddy K . All rights reserved.</span>
    </div>
  </footer>
}

export default Footer