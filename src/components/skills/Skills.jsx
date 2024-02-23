import React from 'react'
import "./skills.css"
import MachineLearning from './MachineLearning'
import WebDevelopment from './WebDevelopment'
import Devops from './DevOps'
import Basic from './Basic'
const Skills = () => {
  return (
    <section className="skills section" id="skills">
         <h2 className="section__title">Skills </h2>
      <span className="section__subtitle">My Technical level</span>

      <div className="skills__container container grid">
        <Basic />
        <WebDevelopment />
        <MachineLearning />
        <Devops />
      </div>
    </section>
  )
}

export default Skills