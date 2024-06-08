import React ,{useState,useEffect} from 'react'
import "./header.css"
const Header = () => {
    // TOGGLE MENU
    const [Toggle,showMenu]=useState(false);
    useEffect(() => {
        const menu = document.querySelector(".nav__menu");
        if (Toggle) {
            menu.classList.add("show-menu");
        } else {
            menu.classList.remove("show-menu");
        }
    }, [Toggle]);
    // TOGGLE FOR LIGHT AND DARK MODE
    function handleToggle(){
        const togglebox= document.getElementById("toggle_box")
        const checkbox= document.getElementById("checkbox")
        const circle =document.querySelector(".circle")
        const header= document.getElementById("header");
        const nav__logo= document.getElementById("nav__logo");
        const nav__toggle= document.getElementById("nav__toggle");
        const nav__menu= document.querySelector(".nav__menu")
        
        if(checkbox.checked){

            togglebox.classList.remove("toggle_box");
            togglebox.classList.add("toggle_box--checked");

            circle.classList.remove("circle--unchecked");
            circle.classList.add("circle--checked");
            
            header.classList.remove("header");
            header.classList.add("header--checked");

            nav__logo.classList.remove("nav__logo");
            nav__logo.classList.add("nav__logo--checked");

            nav__toggle.classList.remove("nav__toggle");
            nav__toggle.classList.add("nav__toggle--checked");

            const nav__links= document.querySelectorAll(".nav__link")
            for(const nav__link of nav__links ){
                nav__link.classList.remove("nav__link")
            nav__link.classList.add("nav__link--checked")
            }

            nav__menu.classList.add("nav__menu--checked");
            
        }else{
            togglebox.classList.remove("toggle_box--checked");
            togglebox.classList.add("toggle_box");

            circle.classList.remove("circle--checked");
            circle.classList.add("circle--unchecked");
            // Toggle back to default CSS
            header.classList.remove("header--checked");
            header.classList.add("header");

            nav__logo.classList.remove("nav__logo--checked");
            nav__logo.classList.add("nav__logo");

            nav__toggle.classList.remove("nav__toggle--checked");
            nav__toggle.classList.add("nav__toggle");

            const nav__links= document.querySelectorAll(".nav__link--checked")
            
            for(const nav__link of nav__links ){
                nav__link.classList.remove("nav__link--checked")
            nav__link.classList.add("nav__link")
            }

            nav__menu.classList.remove("nav__menu--checked")
        }
   }
  return (
    <header id="header" className="header">
        <nav className="nav container">
            <a href="index.html" className="nav__logo" id="nav__logo">Komal Reddy K</a>
            <div className="nav__menu">
                <ul className="nav__list grid">
                    <li className="nav__item">
                        <a href="#home" className="nav__link ">
                            <i className="iuil uil-estate nav__icon"></i> Home
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#about" className="nav__link">
                            <i className="iuil uil-user nav__icon"></i> About
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#skills" className="nav__link">
                            <i className="iuil uil-file-alt nav__icon"></i> Skills
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#qualification" className="nav__link">
                            <i className="iuil uil-award nav__icon"></i> Qualifications
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#certification" className="nav__link">
                            <i className="iuil uil-trophy nav__icon"></i> Certifications
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#portfolio" className="nav__link">
                            <i className="iuil uil-scenery nav__icon"></i> Works
                        </a>
                    </li>

                    <li className="nav__item">
                        <a href="#stats" className="nav__link">
                            <i className="iuil uil-chart-growth nav__icon"></i> Github Stats
                        </a>
                    </li>
                    <li className="nav__item">
                        <a href="#contact" className="nav__link">
                            <i className="iuil uil-message nav__icon"></i>Contact
                        </a>
                    </li>
                    <li className="nav__item nav__close" >
                   <a href="" className="nav__link">
                   <i className="uil uil-times  nav__icon " onClick={() => showMenu(!Toggle)}></i> Close
                   </a>
                    </li>
                </ul>

                
            </div>

            <div className="nav__toggle" onClick={() => showMenu(!Toggle)} id="nav__toggle">
                <i className="uil uil-apps"></i>
            </div>

            <label  id="toggle_box" className="toggle_box" onClick={handleToggle}>
            <input type="checkbox" id="checkbox" />
            <div className="circle"> </div>
            </label>
           
        </nav>
       
    </header>
  )
}

export default Header