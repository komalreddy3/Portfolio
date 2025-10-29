
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
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

    // ✅ Reset scroll state when route changes
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

                {/* Hamburger icon for mobile */}
                <div
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Navigation Links */}
                <nav className={`header-nav ${menuOpen ? 'show' : ''}`}>
                    <NavLink to="/" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">home</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/projects" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">projects</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/aboutme" end className="nav-link-custom" onClick={closeMenu}>
                        <span className="link-name">aboutMe</span>
                        <span className="link-ext">.js</span>
                    </NavLink>

                    <NavLink to="/contact" end className="nav-link-custom" onClick={() => { closeMenu(); }}>
                        <span className="link-name">contact</span>
                        <span className="link-ext">.js</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
