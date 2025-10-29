import React from 'react';
import Hero from '../Hero/Hero';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import About from '../About/About';
import Quote from '../Quote/Quote';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import './Home.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const Home = () => {

    return (
        <div className="home-root">
            <Hero />
            <Quote />
            <Projects />
            <Skills />
            <About />

            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
