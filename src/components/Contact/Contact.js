import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Contact = () => (
    <motion.section id="contact" className="section container-custom" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: false }}>
        <div className="contact-header">
            <div className="contact-title-wrap">
                <h2>
                    <span className="section-title">ping</span>
                    <span className="section-title-ext">.js</span>
                </h2>
            </div>
        </div>
        <div className="gap-4 flex-wrap align-items-start">
            <div className='d-flex align-items-center contact-container contact-text'>
                <p>Something cool to share? Drop a message! I may not reply faster than your favorite delivery app, but hey  I try.</p>
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
);


export default Contact;