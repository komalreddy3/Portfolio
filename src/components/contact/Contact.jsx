import React from 'react'
import "./contact.css"
const Contact = () => {
  return (
    <section className="contact section" id="contact">
        <h2 className="section__title">Let's get in touch!</h2>
        <span className="section__subtitle">Contact Me</span>

        <div className="contact__container container grid">
            <div className="contact__content">
                <h3 className="contact__title">Talk to me</h3>
                <div className="contact__info">
                    <div className="contact__card">
                        <i className="bx bx-mail-send contact__card-icon"></i>
                        <h3 className="contact__card-title">Email</h3>
                        <span className="contact__card-data">workwithkomalreddy@gmail.com</span>
                        <a href="mailto:workwithkomalreddy@gmail.com" className="contact__button">Write me <i className="bx bx-right-arrow-alt contact__button-icon"></i></a>
                    </div>

                    <div className="contact__card">
                        <i className="bx bxl-whatsapp-square contact__card-icon"></i>
                        <h3 className="contact__card-title">Whatsapp</h3>
                        <span className="contact__card-data">8897714514</span>
                        <a href="https://wa.me/8897714514" className="contact__button">Write me <i className="bx bx-right-arrow-alt contact__button-icon"></i></a>
                    </div>

                    <div className="contact__card">
                        <i className="bx bxl-linkedin-square contact__card-icon"></i>
                        <h3 className="contact__card-title">Linkedin</h3>
                        <span className="contact__card-data">komalreddyk</span>
                        <a href="https://www.linkedin.com/in/komalreddyk/" className="contact__button">Let's connect <i className="bx bx-right-arrow-alt contact__button-icon"></i></a>
                    </div>
                </div>
            </div>

            <div className="contact__content">
                <h3 className="contact__title">Write me your project</h3>

                <form action='mailto:workwithkomalreddy@gmail.com'  className="contact__form" method='post'>
                    <div className="contact__form-div">
                        <label className="contact__form-tag">Name</label>
                         <input type="text" name="name" className="contact__form-input" placeholder="Type your name"/>
                    </div>

                    <div className="contact__form-div">
                        <label className="contact__form-tag">Mail</label>
                         <input type="email" name="email" className="contact__form-input" placeholder="Type your email"/>
                    </div>

                    <div className="contact__form-div contact__form-area">
                        <label className="contact__form-tag">Project</label>
                         <textarea name="project" className="contact__form-input" cols="30" rows="10" placeholder="Write your project"></textarea>
                    </div>

                    <button type="submit" href="mailto:workwithkomalreddy@gmail.com" className="button button--flex">
        Send Message
        
      </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Contact