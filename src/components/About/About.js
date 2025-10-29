import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import { useNavigate } from 'react-router-dom';
const readMoreArrow = "~~>"
const About = () => {
    const navigate = useNavigate();
    return (
        <>
            <motion.section id="about" className="section container-custom" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: false }}>
                <div className="about-header">
                    <div className="about-title-wrap">
                        <h2>
                            <span className="section-title">aboutMe</span>
                            <span className="section-title-ext">.js</span>
                        </h2>
                    </div>
                </div>
                <p className="about-text">Hey! I'm Komal Reddy Koukuntla</p>
                <p className="about-text">
                    I'm from Hyderabad, India, a Computer Science grad from NIT Manipur (yep, the northeast one!). I wrapped up my B.Tech with a shiny CGPA above 9, and now I'm deep into the full-stack dev world , mostly living in JavaScript land and loving it.
                    When I'm not battling bugs, you'll probably find me nose-deep in a book, binge-watching K-dramas like it's my job, or… cleaning. Yeah, I clean for fun. Weirdly therapeutic, right? It's like debugging real life , instant results, no deployment needed!
                </p>
                <div style={{ marginTop: 16 }}>
                    <button className="btn btn-sm btn-outline-light" onClick={() => navigate("/aboutme")}>Read more {readMoreArrow}</button>
                </div>
            </motion.section></>
    );
}

export default About;