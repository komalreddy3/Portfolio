
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carousel.css";
import ElectricBorder from "./ElectricBorder";


const AUTO_PLAY_DELAY = 2500;

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 120 : -120,
        opacity: 0,
        scale: 0.94,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 240,
            damping: 26,
        },
    },
    exit: (direction) => ({
        x: direction < 0 ? 120 : -120,
        opacity: 0,
        scale: 0.94,
    }),
};

export default function WorkExperienceCarousel({ workHistory }) {
    const [[index, direction], setIndex] = useState([0, 0]);
    const [isPaused, setIsPaused] = useState(false);

    const paginate = (newDirection) => {
        setIndex(([prev]) => {
            const next = (prev + newDirection + workHistory.length) % workHistory.length;
            return [next, newDirection];
        });
    };
    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(() => paginate(1), AUTO_PLAY_DELAY);
        return () => clearInterval(id);
    }, [isPaused]);

    const job = workHistory[index];

    return (
        <div className="carousel-root">
            <AnimatePresence custom={direction} mode="wait">
                <ElectricBorder
                    color="#c678dd"
                    speed={isPaused ? 1.4 : 0}
                    chaos={isPaused ? 0.20 : 0}
                    thickness={2}
                    radius={22}
                    className="electric-wrapper"
                >
                    <motion.div
                        key={index}
                        className="work-card glass"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.25}
                        onHoverStart={() => setIsPaused(true)}
                        onHoverEnd={() => setIsPaused(false)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -80) paginate(1);
                            else if (info.offset.x > 80) paginate(-1);
                        }}
                    >
                        <div className="card-header">
                            <div className="title-group">
                                <h2>{job.role}</h2>
                                <p className="company">@ {job.company}</p>
                            </div>

                            <div className="company-logo-wrapper">
                                <img
                                    src={job.logo}
                                    alt={job.company}
                                    className="company-logo"
                                    draggable={false}
                                />
                            </div>
                        </div>


                        <p className="duration">{job.duration}</p>

                        <ul className="commit-log">
                            {job.commitLog.map((c, i) => (
                                <li key={i}>{c}</li>
                            ))}
                        </ul>

                        <div className="tech-stack">
                            {job.techStack.map((tech, i) => (
                                <span key={i} className="tech-pill">{tech}</span>
                            ))}
                        </div>
                    </motion.div>
                </ElectricBorder>
            </AnimatePresence>
            <div
                className="carousel-dots"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {workHistory.map((_, i) => (
                    <button
                        key={i}
                        className={`dot ${i === index ? "active" : ""}`}
                        onClick={() => setIndex([i, i > index ? 1 : -1])}
                    />
                ))}
            </div>
        </div>
    );
}
