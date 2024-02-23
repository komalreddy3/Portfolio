import React,{useState} from 'react'
import "./qualification.css"
const Qualification = () => {
    const [toggleState,setToggleState]=useState(1);
    const toggleTab=(index)=>{
        setToggleState(index);
    };
  return (
    <section className="qualification section" id="qualification">
        <h2 className="section__title"> Qualification
        </h2>
        <span className="section__subtitle">My Personal Journey</span>

        <div className="qualification__container container">
            <div className="qualification__tabs">
                <div className={toggleState===1 ? "qualification__button qualification__active button--flex":"qualification__button  button--flex"}
                onClick={()=>toggleTab(1)}>
                    <i className="uil uil-graduation-cap qualification__icon"></i> Education
                </div>

                <div className={toggleState===2 ? "qualification__button qualification__active button--flex":"qualification__button  button--flex"}
                onClick={()=>toggleTab(2)}>
                    <i className="uil uil-briefcase-alt qualification__icon"></i> Experience
                </div>
            </div>

            <div className="qualification__sections">
                <div className={toggleState===1?"qualification__content qualification__content-active":"qualification__content "}>
                    <div className="qualification__data">
                        <div>
                            <h3 className="qualification__title">BTech - CSE</h3>
                            <span className="qualification__subtitle">National Institute of Technology Manipur</span>
                            <div className="qualification__calender">
                                <i className="uil uil-calendar-alt"> </i>
                                2020-Present
                            </div>
                        </div>

                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                    <div></div>
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>
                        <div>
                            <h3 className="qualification__title"> Intermediate</h3>
                            <span className="qualification__subtitle">Sri Chaitanya Junior College</span>
                            <div className="qualification__calender">
                            <i className="uil uil-calendar-alt"> </i>
                                2018-2020
                            </div>
                        </div>

                        
                    </div>

                    <div className="qualification__data">
                        <div>
                            <h3 className="qualification__title">Higher Secondary Education</h3>
                            <span className="qualification__subtitle">Sri Chaitanya Techno School</span>
                            <div className="qualification__calender">
                                <i className="uil uil-calendar-alt"> </i>
                                2013-2018
                            </div>
                        </div>

                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                    <div></div>
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>
                        <div>
                            <h3 className="qualification__title">Primary Education</h3>
                            <span className="qualification__subtitle">Lotus Lap Public School</span>
                            <div className="qualification__calender">
                            <i className="uil uil-calendar-alt"> </i>
                                2008-2013
                            </div>
                        </div>

                        
                    </div>
                </div>

                <div className={toggleState===2?"qualification__content qualification__content-active":"qualification__content "}>
                <div className="qualification__data">
                    <div></div>
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>
                        <div>
                            <h3 className="qualification__title">SDE Backend Intern</h3>
                            <span className="qualification__subtitle">Devtron Labs - Onsite (Gurgaon)</span>
                            <div className="qualification__calender">
                            <i className="uil uil-calendar-alt"> </i>
                                Jan 2024 - Present
                            </div>
                        </div>

                        
                    </div>
                
                    <div className="qualification__data">
                        <div>
                            <h3 className="qualification__title">Data Science Intern</h3>
                            <span className="qualification__subtitle">Innomatics Research Labs - Remote</span>
                            <div className="qualification__calender">
                                <i className="uil uil-calendar-alt"> </i>
                                Feb 2023 - May 2023
                            </div>
                        </div>

                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                    <div></div>
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>
                        <div>
                            <h3 className="qualification__title">Project Intern</h3>
                            <span className="qualification__subtitle">iNeuron.ai - Remote (Bangalore)</span>
                            <div className="qualification__calender">
                            <i className="uil uil-calendar-alt"> </i>
                                Jan 2023 - Mar 2023
                            </div>
                        </div>

                        
                    </div>

                    <div className="qualification__data">
                        <div>
                            <h3 className="qualification__title">Data Science Intern</h3>
                            <span className="qualification__subtitle">LetsGrowMore - Remote</span>
                            <div className="qualification__calender">
                                <i className="uil uil-calendar-alt"> </i>
                                Jan 2023 - Feb 2023
                            </div>
                        </div>

                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                    <div></div>
                    <div>
                        <span className="qualification__rounder"></span>
                        <span className="qualification__line"></span>
                    </div>
                        <div>
                            <h3 className="qualification__title"> Teaching Assistant</h3>
                            <span className="qualification__subtitle">Coding Ninjas - Remote</span>
                            <div className="qualification__calender">
                            <i className="uil uil-calendar-alt"> </i>
                                Apr 2022 - Aug 2022
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    </section>

  )
}

export default Qualification