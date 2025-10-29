import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import { useEffect } from 'react';
const tagline = "I engineer full-stack solutions where ${(() => `${'Backend efficiency'} fuels ${'frontend creativity'}`)()}. Debug my journey, inspect my projects, and test my skills. Go ahead, everything's in beta, including me.";

const Hero = () => {

    return (
        <section id="home" className="hero container-custom">
            <motion.div className="hero-left" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: false }} layout>
                <div className="title">useState(<span className="accent">"Komal Reddy - Software Engineer"</span>);</div>
                <p className="subtitle">{tagline}</p>
                <a className="btn-ghost" href="#contact">Contact me !!</a>

            </motion.div>
            <motion.aside
                className="hero-right"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout 
                transition={{
                    duration: 0.8,
                    delay: 0.05,
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                }}
                viewport={{ once: false }}
            >
                <motion.div
                    className="profile-wrap"
                    initial={{ rotate: -4, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.08, type: "spring" }}
                    viewport={{ once: false }}
                >
                    <motion.img
                        className="profile-pic"
                        src="/profile.png"
                        alt="Komal Reddy"
                        loading="lazy"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                        viewport={{ once: false }}
                    />

                    <motion.div
                        className="badge-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
                        viewport={{ once: false }}
                    >
                        <div className="badge-dot" />
                        <div className="badge-text">Currently working at <span className='badge-text-ext'>&lt;Appzoy /&gt;</span></div>
                    </motion.div>
                </motion.div>
            </motion.aside>

        </section>
    );
};


export default Hero;