import React from "react";
import "./about.css"
import AboutImg from "../../assets/profile2.jpg"
import CV from "../../assets/Komal_Reddy_K_CV.pdf"
import Info from "./Info"
const About = () => {
  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me </h2>
      <span className="section__subtitle">My Introduction</span>

      <div className="about__container container grid">
      <img src={AboutImg} alt="" className="about__img" />
      <div className="about__data">
        <Info />

        <p className="about__description">
        I can quickly familiarize myself with new frameworks, programming languages, or tools allowing me to stay up-to-date with industry trends and best practices
        </p>

        <a download ="" href={CV} className="button button--flex">Download CV 
        <i class="uil uil-file-alt"></i></a>
      </div>
      </div>
    </section>
  );
};

export default About;
