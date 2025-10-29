import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    <footer className="site-footer">
        <div className="container-custom d-flex justify-content-between align-items-center">
            <div>
                <strong>Komal Reddy Koukuntla</strong>
                <div style={{ marginTop: 6, color: 'var(--muted)' }}>Software Engineer</div>
            </div>
            <div style={{ color: 'var(--muted)' }}>
                <a href="https://github.com/komalreddy3" style={{ marginLeft: 10, color: 'var(--muted)' }} target="_blank"
                    rel="noopener noreferrer">  <FontAwesomeIcon icon={faGithub} className="footer-icon" /></a>
                <a href="https://www.linkedin.com/in/komalreddyk/" style={{ marginLeft: 10, color: 'var(--muted)' }} target="_blank"
                    rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="footer-icon" /></a>
            </div>
        </div>
    </footer>
);
export default Footer;