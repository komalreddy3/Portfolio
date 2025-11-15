import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './WorkExperiencePage.css';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

// --- You can edit your work history here! ---
const workHistory = [
    {
        role: 'Software Engineer',
        company: 'AppZoy Tech.',
        duration: '// Deployed: Jul 2024 - Present',
        commitLog: [
            'feat: Hooked up event-driven DICOM processing with Orthanc,because radiology images apparently enjoy triggering events too.',
            'feat: Integrated HL7 V2 parser for smooth HMS & LIS gossip sessions.',
            'feat: Plugged in OpenAI APIs to build conversational AI.',
            'fix: Resolved data-persistence mysteries.Turns out data does like to stay… if you treat it nicely.',
            'refactor: Containerized services using Docker Swarm with secure secret management to tighten security and improve deployment robustness atleast tried to.',
            'chore: Refactored logging in Web App.Logs now narrate the story without jump scares.',
            'doc: Documented features/bugs so thoroughly even ChatGPT would say: “Bro, that\'s enough.”',
        ],
        techStack: ['React', 'Node.js', 'Docker', 'Python']
    },
    {
        role: 'Software Development Engineer',
        company: 'Devtron Inc.',
        duration: '// Deployed: Jun 2024 - Jun 2024',
        commitLog: [
            'feat: Added a NATS Pub-Sub model orchestrator and notifier now talk to each other more than the dev team does.',
            'feat: Contributed to development of an auto remediation system in Go, incorporating a watcher mechanism to monitor kubernetes events and reduce manual intervention ',
        ],
        techStack: ['Kubernetes', 'Go', 'Linux', 'Helm']
    },
    {
        role: 'SDE Intern',
        company: 'Devtron Inc.',
        duration: '// Deployed: Jan 2024 - May 2024',
        commitLog: [
            'Initial commit: "hello world" - calm before the storm.',
            'chore: Optimised Go APIs without breaking whole cluster (Phew!)',
            'feat: Upgraded Devtron"s CLI with shiny new commands for update, deletion and notification settings because who doesn\'t love more commands?',
        ],
        techStack: ['Go', 'Linux', 'Cobra CLI', 'Open telemetry tracing' ]
    }
];

const cardVariants = {
    offscreen: {
        y: 100,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 1
        }
    }
};

const gridVariants = {
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const WorkExperiencePage = () => {
    const backArrow = "<~~~";
    return (
        _jsxs("div", { className: "work-root", children: [
            _jsxs(motion.section, {
                id: "work-experience",
                className: "work-section container-custom",
                children: [
                    _jsxs("div", { className: "work-header", children: [
                        _jsxs("h2", { className: "section-heading", children: [
                            _jsx("span", { className: "accent-ext", children: "<" }),
                            _jsx("span", { className: "section-title", children: "Release Notes" }),
                            _jsx("span", { className: "accent-ext", children: "\u00A0/>" })
                        ]}),
                       
                        _jsxs(Link, { to: "/", className: "back-home", children: [backArrow, " I'm lost, take me home"] })
                    ]}),
                    _jsx(motion.div, { className: "window-grid",
                        initial: "offscreen",
                        animate: "onscreen",
                        variants: gridVariants,
                        children:
                        workHistory.map((job, index) => (
                            _jsx(motion.div, {
                                className: "job-window-container",
                                variants: cardVariants,
                                children: _jsxs(motion.div, {
                                    className: "job-card-glass",
                                    children: [
                                        _jsxs("div", { className: "window-header", children: [
                                            _jsxs("div", { className: "window-buttons", children: [
                                                _jsx("span", { className: "window-dot", style: { background: '#f25f5c' } }),
                                                _jsx("span", { className: "window-dot", style: { background: '#ffe066' } }),
                                                _jsx("span", { className: "window-dot", style: { background: '#50c878' } })
                                            ]}),
                                            _jsxs("div", { className: "window-title", children: ["[", job.company, "] — bash"] })
                                        ]}),
                                        _jsxs("div", { className: "job-header", children: [
                                            _jsxs("h3", { className: "job-role", children: [
                                                _jsx("span", { className: "keyword", children: "const " }),
                                                "role = ",
                                                _jsxs("span", { className: "string", children: ["\"", job.role, "\""] })
                                            ]}),
                                            _jsx("p", { className: "job-company", children: `@ ${job.company}` })
                                        ]}),
                                        _jsx("p", { className: "job-duration", children: job.duration }),
                                        _jsx("h4", { className: "commit-log-heading", children: "// Commit Log:" }),
                                        _jsx("ul", { className: "commit-log", children:
                                            job.commitLog.map((commit, i) => _jsx("li", { children: commit }, i))
                                        }),
                                        _jsxs("div", { className: "tech-stack", children: [
                                            _jsx("h4", { className: "tech-stack-heading", children: "Dependencies:" }),
                                            _jsx("div", { className: "stack-tags", children:
                                                job.techStack.map((tech, i) => _jsx("span", { className: "tech-tag", children: tech }, i))
                                            })
                                        ]})
                                    ]
                                })
                            }, index)
                        ))
                    })
                ]
            }),
            _jsx(Footer, {})
        ]})
    );
};

export default WorkExperiencePage;
