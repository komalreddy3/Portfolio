import React from 'react'
import "./App.css"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Skills from "./components/skills/Skills"
import Qualification from './components/qualification/Qualification'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import ScrollUp from './components/scrollup/ScrollUp'
import Work from './components/work/Work'
import Certification from "./components/certifications/certification";
import Stats from "./components/stats/Stats";


const App = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Home />
        <About />
        <Skills />
        <Qualification />
         <Certification />
        <Work />
          <Stats />
        <Contact />
        

      </main>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default App