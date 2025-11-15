import React from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
const ContactPage = () => {
    const backArrow = "<~~~"
    return (
        <div className="contact-page-root">
            <motion.section id="contact" className="section container-custom" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: false }}>
                <div className="contact-header">
                    <h2 className="section-heading">
                        <span className="accent-ext">&lt;</span>
                        <span className="section-title">Ping&nbsp;</span>
                        <span className="accent-ext">/&gt;</span>
                    </h2>

                    <Link to="/" className="back-home">
                        {backArrow} I'm lost, take me home
                    </Link>
                </div>
                <div className="gap-4 flex-wrap align-items-start">
                    <div className='d-flex align-items-center contact-container contact-text'>
                        <p>Something cool to share? Drop a message! I may not reply faster than your favorite delivery app, but hey — I try.</p>
                        <div className="contact-card mt-2">
                            <p className='section-title'>Message me here !</p>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faDiscord} className="contact-icon" />
                                <a
                                    href="https://discord.com/users/880422564332208168"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    !KomalReddyK
                                </a>
                            </div>

                            <div className="contact-item" style={{ marginTop: 6 }}>
                                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                                <a href="mailto:workwithkomalreddy@gmail.com">
                                    workwithkomalreddy@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
             <Footer />
        </div>
    );
}

export default ContactPage;