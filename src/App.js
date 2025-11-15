
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Projects from './components/ProjectsPage/ProjectsPage';
// import Works from './pages/Works';
// import AboutMe from './pages/AboutMe';
// import Contact from './pages/Contact';
import { useLocation } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import AboutMe from './components/AboutPage/AboutPage';
import WorkExperiencePage from './components/WorkExperiencePage/WorkExperiencePage';
function App() {
  const location = useLocation();
  return (
    <>
      <Header />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/experience" element={<WorkExperiencePage />} />
        </Routes>
     
    </>
  );
}

export default App;
