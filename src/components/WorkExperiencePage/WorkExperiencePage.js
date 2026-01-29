import React from "react";
import WorkExperienceCarousel from "./Carousel";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./WorkExperiencePage.css";

const workHistory = [
    {
        role: "Software Engineer",
        company: "AppZoy",
        duration: "// Jul 2024 - Present",
        logo: `${process.env.PUBLIC_URL}/appzoy.png`,
        commitLog: [
            "feat: Hooked up event-driven DICOM processing with Orthanc,because radiology images apparently enjoy triggering events too.",
            "feat: Integrated HL7 V2 parser for smooth HMS & LIS gossip sessions",
            "feat: OpenAI apis integrations",
            "fix: Resolved data-persistence mysteries.Turns out data does like to stay… if you treat it nicely",
            "refactor: Containerized services using Docker Swarm with secure secret management to tighten security and improve deployment robustness atleast tried to",
            "doc: Documented features/bugs so thoroughly even ChatGPT would say: 'Bro, that's enough.'"
        ],
        techStack: ["React", "Node.js", "Docker", "Python"],
    },
    {
        role: "SDE",
        company: "Devtron Inc.",
        duration: "// Jun 2024",
        logo: `${process.env.PUBLIC_URL}/devtron.png`,
        commitLog: ["feat: Added a NATS Pub-Sub model orchestrator and notifier now talk to each other more than the dev team does.",
            "feat: Contributed to development of an auto remediation system in Go, incorporating a watcher mechanism to monitor kubernetes events and reduce manual intervention",
            "docs: Learned that good documentation is also a feature (wrote docs that future-me won't hate).",
            "chore: Fell into the Kubernetes rabbit hole —> pods, services, and why nothing works the first time.",
            "feat: Finally understood Kubernetes networking instead of just copy-pasting YAML (growth moment)."
        ],
        techStack: ["Kubernetes", "Go", "Linux", "Helm"],
    },
    {
        role: "SDE Intern",
        company: "Devtron Inc.",
        duration: "// Jan 2024 - May 2024",
        logo: `${process.env.PUBLIC_URL}/devtron.png`,
        commitLog: [
            "Initial commit: 'hello world' -> calm before the storm.",
            "chore: Optimised Go APIs without breaking whole cluster (Phew!)",
            "feat: Upgraded Devtron's CLI with shiny new commands for update, deletion and notification settings — because who doesn't love more commands?",
            "chore: Learned Linux the hard way — permissions, processes, and why sudo is both friend and enemy.",
            "feat: Finally understood Git beyond `git pull` and `git push` — rebases were scary, but worth it."
        ],
        techStack: ["Go", "Linux", "Cobra CLI"],
    },
];

const WorkExperiencePage = () => {
    const backArrow = "<~~~";

    return (
        <div className="work-root">
            <motion.section
                id="work-experience"
                className="work-section container-custom"
            >
                <div className="work-header">
                    <h2 className="section-heading">
                        <span className="accent-ext">&lt;</span>
                        <span className="section-title">Release Notes</span>
                        <span className="accent-ext">&nbsp;/&gt;</span>
                    </h2>

                    <Link to="/" className="back-home">
                        {backArrow} I'm lost, take me home
                    </Link>
                </div>
                <WorkExperienceCarousel workHistory={workHistory} />
            </motion.section>

            <Footer />
        </div>
    );
};

export default WorkExperiencePage;
