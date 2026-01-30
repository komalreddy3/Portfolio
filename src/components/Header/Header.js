
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const location = useLocation();

    const handleScroll = () => setScrolled(window.scrollY > 30);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        handleScroll(); // ensures correct state on first render after route change
        window.scrollTo(0, 0); // optional: scrolls page to top on route change
    }, [location]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`header-root ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-custom d-flex align-items-center justify-content-between">
                <div className="header-brand"> <Link to="/" className="header-brand">
                    Komal Reddy Koukuntla 
                </Link></div>

                <div className="header-icons">
                    <a
                        href="https://github.com/komalreddy3"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <Github size={20} strokeWidth={2.5} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/komalreddyk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} strokeWidth={2.5} />
                    </a>

                    <a
                        href="mailto:workwithkomalreddy@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email"
                    >
                        <Mail size={21} strokeWidth={2.5} />
                    </a>
                </div>


                {/* Hamburger icon for mobile */}
                {/* <div
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}

                {/* Navigation Links */}
                {/* <nav className={`header-nav ${menuOpen ? 'show' : ''}`}>
                    <NavLink to="/" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">home</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/aboutme" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">backStory</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/projects" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">chaosWare</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/experience" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">releaseNotes</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/contact" end className="nav-link-custom" onClick={() => { closeMenu(); }}>
                        <span className="link-name">ping</span>
                        <span className="link-ext">.js</span>
                    </NavLink>
                </nav> */}
            </div>
        </header>
    );
};

export default Header;
