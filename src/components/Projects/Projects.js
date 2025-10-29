import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const projects = [
    { title: 'Movie Recommendation System', tech: 'machine-learning collaborative-filtering knn-classifier tf-idf popularity-based-recommendation', desc: 'Movie Recommendation System using Popularity, Content and Collaborative Based Recommendation methods', img: '/mrimage.png', rolllink: "https://komalreddy3-mrs1-pd-about-dcybs2.streamlit.app/", codeLink: "https://github.com/komalreddy3/MRS1_PD" },
    { title: 'Simon Game', tech: 'React.js HTML CSS hooks ', desc: "Simon is an electronic game of short-term memory. The Simon game is the exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order. It's fast-paced play, with lights and sounds. Experience the fun as you repeat the patterns and advance to higher levels", img: '/simonimage.png', rolllink: "https://komalreddy3.github.io/SimonGame/", codeLink: "https://github.com/komalreddy3/SimonGame" },
    { title: 'Dice Game', tech: 'Javascript HTML CSS3', desc: 'About Dicee Game , On refreshing the page we will be having two dices showing randomized number(dots) on faces of them', img: '/dcimage.png', rolllink: "https://komalreddy3.github.io/dice/", codeLink: "https://github.com/komalreddy3/dice" },
    { title: 'Drum Kit', tech: 'Javascript HTML CSS3', desc: "When we click a particular button w,a,s,d,j,k,l via cursor or keyboard relevant image's sound is played", img: '/drumimage.png', rolllink: "https://komalreddy3.github.io/DrumKit/", codeLink: "https://github.com/komalreddy3/DrumKit" },
    { title: 'School Attendance Management', tech: 'docker kubernetes golang cors postgres jwt wire mux-router go-pg logger-sugar', desc: "Attendance Management System", img: '', rolllink: "", codeLink: "https://github.com/komalreddy3/Attendance-go" },
    { title: 'Keeper App', tech: 'React.js HTML CSS hooks ', desc: "A simple note keeper", img: '/noteimage.png', rolllink: "https://komalreddy3.github.io/KeeperApp/", codeLink: "https://github.com/komalreddy3/KeeperApp" },
    { title: 'Counter App', tech: 'React.js HTML CSS hooks ', desc: "counter app allows users to increment and decrement a numerical value with a simple and intuitive user interface", img: '/counterimage.png', rolllink: "https://komalreddy3.github.io/CounterApp/", codeLink: "https://github.com/komalreddy3/CounterApp" },

];

const viewAllArrow = "~~>"
const codeIcon = ">="

const Projects = () => {
    const displayedProjects = projects.slice(0, 3);
    const [expandedIndex, setExpandedIndex] = useState(null);

    return (
        <section id="projects" className="section container-custom">
            <div className="projects-header d-flex justify-content-between align-items-center">
                <div className="projects-title-wrap">
                    <h2>
                        <span className="section-title">projects</span>
                        <span className="section-title-ext">.js</span>
                    </h2>
                </div>
                <Link to="/projects" className="view-all-link">View all {viewAllArrow}</Link>
                {/* <a href="#" className="view-all-link">View all {viewAllArrow}</a> */}
            </div>

            <div className="projects-grid mt-3">
                {displayedProjects.map((p, i) => (
                    <motion.article
                        className={`proj-card`}
                        key={p.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.08 }}
                        viewport={{ once: false }}

                    >
                        {p.img ? (
                            <img className="proj-thumb" src={`${process.env.PUBLIC_URL}${p.img}`} alt={p.title} loading="lazy" />
                        ) : (
                            <div className="proj-thumb placeholder"></div>
                        )}
                        <div className="proj-meta">{p.tech}</div>
                        <h5 style={{ marginTop: 8 }}>{p.title}()</h5>

                        <p className="proj-desc" style={
                            {
                                display: expandedIndex === i ? '--webkit-box' : '',
                                overflow: 'hidden',
                            }
                        }>
                            {expandedIndex === i ? p.desc : p.desc.slice(0, 120) + (p.desc.length > 120 ? "..." : "")}
                        </p>
                        {p.desc.length > 120 && (
                            <button
                                className="view-more-btn"
                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                            >
                                {expandedIndex === i ? "View less" : "View more"}
                            </button>
                        )}

                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <button
                                className="btn btn-sm btn-outline-light"
                                onClick={() => window.open(p.rolllink, '_blank', 'noopener,noreferrer')}
                                disabled={!p.rolllink}
                                style={{ opacity: p.rolllink ? 1 : 0.4, pointerEvents: p.rolllink ? 'auto' : 'none' }}
                            >
                                Roll ↬
                            </button>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={p.codeLink || "#"}
                                className={`text-decoration-none ${!p.codeLink ? 'disabled-link' : ''}`}
                            >
                                Code {codeIcon}
                            </a>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default Projects;