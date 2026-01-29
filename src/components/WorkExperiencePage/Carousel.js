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
        transition: { type: "spring", stiffness: 240, damping: 26 },
    },
    exit: (direction) => ({
        x: direction < 0 ? 120 : -120,
        opacity: 0,
        scale: 0.94,
    }),
};

// Detect mobile
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
      typeof window !== "undefined" ? window.innerWidth < breakpoint : false
    );
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
      window.addEventListener("resize", handleResize);
  
      // cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);
  
    return isMobile;
  }

export default function WorkExperienceCarousel({ workHistory }) {
    const [[index, direction], setIndex] = useState([0, 0]);
    const [isPaused, setIsPaused] = useState(false);
    const [showAllCommits, setShowAllCommits] = useState(false);
    const [electricOn, setElectricOn] = useState(false);

    const isMobile = useIsMobile();
    const job = workHistory[index];

    const paginate = (newDirection) => {
        setIndex(([prev]) => {
            const next = (prev + newDirection + workHistory.length) % workHistory.length;
            return [next, newDirection];
        });
        setShowAllCommits(false); // Reset commits on slide change
    };

    // Autoplay only for non-mobile
    useEffect(() => {
        if (isPaused || isMobile) return;
        const id = setInterval(() => paginate(1), AUTO_PLAY_DELAY);
        return () => clearInterval(id);
    }, [isPaused, isMobile]);

    return (
        <div className="carousel-root">
            {/* Mobile Electric toggle */}
            {isMobile && (
                <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                    <button
                        style={{
                            padding: "6px 12px",
                            borderRadius: "999px",
                            border: "none",
                            cursor: "pointer",
                            background: electricOn ? "#c678dd" : "rgba(255,255,255,0.1)",
                            color: electricOn ? "#fff" : "#c678dd",
                            transition: "all 0.2s ease",
                        }}
                        onClick={() => setElectricOn((prev) => !prev)}
                    >
                        {electricOn ? "Tap to Chill !" : "Tap to Spark ⚡ "}
                    </button>
                </div>
            )}

            <AnimatePresence custom={direction} mode="wait">
                <ElectricBorder
                    color="#c678dd"
                    speed={electricOn || (!isMobile && isPaused) ? 1.4 : 0}
                    chaos={electricOn || (!isMobile && isPaused) ? 0.2 : 0}
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
                        onHoverStart={() => !isMobile && setIsPaused(true)}
                        onHoverEnd={() => !isMobile && setIsPaused(false)}
                        onMouseEnter={() => !isMobile && setIsPaused(true)}
                        onMouseLeave={() => !isMobile && setIsPaused(false)}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -40) paginate(1);
                            else if (info.offset.x > 40) paginate(-1);
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
                            {(isMobile && !showAllCommits ? job.commitLog.slice(0, 3) : job.commitLog).map(
                                (c, i) => <li key={i}>{c}</li>
                            )}
                            {isMobile && job.commitLog.length > 3 && (
                                <li
                                    style={{
                                        opacity: 0.6,
                                        fontStyle: "italic",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowAllCommits((prev) => !prev)}
                                >
                                    {showAllCommits
                                        ? "Show Less… (tap to collapse)"
                                        : `+${job.commitLog.length - 3} more… (tap to expand)`}
                                </li>
                            )}
                        </ul>

                        <div className="tech-stack">
                            {job.techStack.map((tech, i) => (
                                <span key={i} className="tech-pill">{tech}</span>
                            ))}
                        </div>
                    </motion.div>
                </ElectricBorder>
            </AnimatePresence>

            {/* Mobile swipe hints */}
            {isMobile && (
                <div className="mobile-swipe-hints">
                    <motion.div
                        className="swipe-arrow prev"
                        animate={{ x: [0, -24, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        onClick={() => paginate(-1)}
                    >
                        <span>←</span>
                    </motion.div>
                    <motion.div
                        className="swipe-arrow next"
                        animate={{ x: [0, 24, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        onClick={() => paginate(1)}
                    >
                        <span>→</span>
                    </motion.div>
                </div>
            )}

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
