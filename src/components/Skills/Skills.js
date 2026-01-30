import Stack from "./Stack";
import SkillCard from "./SkillCard";
import { useState } from "react";
import "./Skills.css"
const skills = [
    {
        title: "Languages",
        items: ["C", "C++", "Python", "Go", "JavaScript"],
    },
    {
        title: "Web Tech",
        items: ["HTML", "CSS", "React", "Node.js"],
    },
    {
        title: "Databases",
        items: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
        title: "DevOps & Cloud",
        items: ["Docker", "Kubernetes", "Helm"],
    },
    {
        title: "Medical Imaging",
        items: ["DICOM", "Orthanc", "OHIF"],
    },
];

export default function Skills() {
   const [showHint, setShowHint] = useState(true);
    return (
        <section id="skills" className="section container-custom">
            <h2>
                <span className="section-title">skills</span>
                <span className="section-title-ext">.js</span>
            </h2>


            <div style={{ width: "15rem", height: "15rem", margin: "0 auto", marginTop: "2rem" }}>
                <Stack
                    randomRotation={false}
                    sensitivity={200}
                    sendToBackOnClick={true}
                    cards={skills.map((skill) => (
                        <SkillCard
                            key={skill.title}
                            title={skill.title}
                            items={skill.items}
                        />
                    ))}
                    autoplay={true}
                    autoplayDelay={2000}
                    pauseOnHover={true}
                    // onFirstInteraction={() => setShowHint(false)}
                />
            </div>
            {showHint && (
                <p className="drag-text-hint">
                    Impatient? Drag. Lazy? Auto-rotate's got you
                </p>
            )}
        </section>
    );
}
