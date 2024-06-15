import React,{useState} from 'react'
import {useEffect} from 'react'
import {certificatesData, certificatesNav} from './Data'
import CertificateItems from "./CertificateItems";
import {Carousel} from "../carousel/Carousel";
const Certifications = () => {
  const [item,setItem]=useState({name:'All'});
  const [certifications,setCertifications] =useState([]);
  const [active,setActive]=useState(0);
  const [numStart,setNumStart]=useState(true);
  useEffect(()=>{
    if(item.name === "All"){
      setCertifications(certificatesData);
    }
    else {
      const newCertificates =certificatesData.filter((certificate) =>{
        return certificate.category === item.name;
      })
      setCertifications(newCertificates);
    }
    setNumStart(!numStart);
  },[item])
  const handleClick =(e,index)=>{
    setItem({name:e.target.textContent});
    setActive(index);
  }
  return (
      <div>
        <div className="certification__filters">
          {certificatesNav.map((item, index) => {
            return (
                <span onClick={(e) => {
                  handleClick(e, index);
                }} className={`${active === index ? 'active-certification' : ""} certification__item`}
                      key={index}>{item.name}</span>
            )
          })}
        </div>

        {/*<div className="certification__container container grid">*/}
        {/*  {certifications.map((item)=>{*/}
        {/*    return <CertificateItems item={item} key={item.id} />*/}
        {/*  })}*/}
        {/*</div>*/}
         <div className="carousel-outer">
           <Carousel data={certifications} start={numStart}/>
         </div>
      </div>
  )
}

export default Certifications