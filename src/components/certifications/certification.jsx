import React from 'react'
import "./certification.css"
import Certifications from "./Certifications";
const Certification = () => {
  return (
    <section className="certification section" id="certification">
        <h2 className="section__title">Certifications</h2>
        <span className="section__subtitle">Trainings and Courses Certificates</span>

        <Certifications />
    </section>
  )
}

export default Certification