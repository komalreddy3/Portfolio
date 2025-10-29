import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';


const Skills = () => {
    const groups = [
        {
            title: 'Languages',
            items: ['C', 'C++', 'Python', 'Go', 'JavaScript'],
        },
        {
            title: 'Web Technologies',
            items: ['HTML', 'CSS', 'Bootstrap', 'jQuery', 'React.js', 'Node.js'],
        },
        {
            title: 'Databases',
            items: ['MySQL','PostgreSQL', 'MongoDB' ],
        },
        {
            title: 'DevOps & Cloud',
            items: ['Docker', 'Kubernetes', 'Helm'],
        },
        {
            title: 'Tools',
            items: ['Git', 'Figma'],
        },
        {
            title: 'Medical Imaging',
            items: ['DICOM', 'Orthanc', 'OHIF'],
        },
    ];



    return (
        <section id="skills" className="section container-custom">
            {/* <h2 className="section-title">skills.js</h2> */}
            <div className="skills-header">
                <div className="skills-title-wrap">
                    <h2>
                        <span className="section-title">skills</span>
                        <span className="section-title-ext">.js</span>
                    </h2>
                </div>
            </div>
            <div className="skills-grid mt-3">
                {groups.map((g, i) => (
                    <motion.div key={g.title} className="skill-box" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.06 }} viewport={{ once: false }}>
                        <strong>{g.title}</strong>
                        <ul>
                            {g.items.map((it) => (
                                <li key={it}>{it}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};


export default Skills;