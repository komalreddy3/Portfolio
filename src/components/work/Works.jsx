import React,{useState} from 'react'
import {useEffect} from 'react'
import { projectsData } from './Data'
import { projectsNav } from './Data'
import WorksItems from './WorksItems'
import {Carousel} from "../carousel/Carousel";
const Works = () => {
  const [item,setItem]=useState({name:'All'});
  const [projects,setProjects] =useState([]);
  const [active,setActive]=useState(0);
  const [numStart,setNumStart]=useState(true);
  useEffect(()=>{
    if(item.name === "All"){
      setProjects(projectsData);
    }
    else {
      const newProjects =projectsData.filter((project) =>{
        return project.category === item.name;
      })
      setProjects(newProjects);
    }
    setNumStart(!numStart);
  },[item])
  const handleClick =(e,index)=>{
    setItem({name:e.target.textContent});
    setActive(index);
  }
  return (
      <div>
        <div className="work__filters">
          {projectsNav.map((item, index) => {
            return (
                <span onClick={(e) => {
                  handleClick(e, index);
                }} className={`${active === index ? 'active-work' : ""} work__item`} key={index}>{item.name}</span>
            )
          })}
        </div>

        {/*<div className="work__container container grid">*/}
        {/*  {projects.map((item)=>{*/}
        {/*    return <WorksItems item={item} key={item.id} />*/}
        {/*  })}*/}
        {/*</div>*/}
        <div className="carousel-outer">
          <Carousel data={projects} start={numStart}/>
        </div>
      </div>
  )
}

export default Works