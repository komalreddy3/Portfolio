import React from "react";
import { motion } from "framer-motion";
import "./AboutPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";
const AboutMe = () => {
    const backArrow = "<~~~"
    return (
        <div className="about-root">
            <motion.section
                id="aboutme"
                className="about-section container-custom"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <div className="about-header">
                    <h2 className="section-heading">
                        <span className="accent-ext">&lt;</span>
                        <span className="section-title">BackStory&nbsp;</span>
                        <span className="accent-ext"> /&gt;</span>
                    </h2>

                    <Link to="/" className="back-home">
                        {backArrow} I'm lost, take me home
                    </Link>
                </div>

                {/* Main content */}
                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Hey! I'm <span className="accent">Komal Reddy Koukuntla</span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            I'm from Hyderabad, India , a Computer Science grad from NIT Manipur (yep, the northeast one!).
                            I wrapped up my B.Tech with a shiny <b>9+ CGPA</b>, and now I'm deep into the full-stack dev world ,
                            mostly living in <span className="accent">JavaScript land</span> and loving it.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            When I'm not battling bugs, you'll probably find me nose-deep in a book, binge-watching K-dramas like it's my job,
                            or… cleaning. Weirdly therapeutic, right? It's like debugging real life ,
                            <span className="accent"> instant results, no deployment needed!</span>
                        </motion.p>
                    </motion.div>

                   
                   
                </div>

                {/* <h3 className="fun-facts-heading" id="my-fun-facts">
                    #my-fun-facts
                </h3> */}
                <h3 className="fun-facts-heading"><span className="accent-ext">#</span> <span className="section-title">my-fun-facts</span></h3>

                <div className="fun-facts-grid">
                    {[
                        { emoji: "🍫", text: `if (sweet == true && chocolate == false) returns false, But if (cake.includes("chocolate")) → deploy happiness!` },
                        { emoji: "🔥", text: `lastMinuteSurprise()\n=>  Throw new Error("Why wasn't this in the sprint planning?!")` },
                        { emoji: "❄️", text: `prefers (winter > summer)\n// Sweating not part of my UX` },
                        {
                            emoji: "🕵️‍♀️", text: `Sherlock fan alert! Can debug your code and your alibi. Elementary, my dear console.log()`
                        },
                        { emoji: "🧹", text: `clean() => rm -rf /mess;\n// applies to code & desk` },
                        { emoji: "💧", text: `Skincare is my second framework. Currently running on hydrate(), moisturize(), and SPF.js` },
                    ].map((fact, i) => (
                        <motion.div
                            key={i}
                            className="fact-card-glass"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <span className="fact-emoji">{fact.emoji}</span>
                            <pre className="fact-text">{fact.text}</pre>
                        </motion.div>
                    ))}
                </div>


            </motion.section>
            <Footer />
        </div>
    );
};

export default AboutMe;
