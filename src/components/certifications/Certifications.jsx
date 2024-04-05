import React,{useState} from 'react'
import {useEffect} from 'react'
import {certificatesData, certificatesNav} from './Data'
import CertificateItems from "./CertificateItems";
const Certifications = () => {
  const [item,setItem]=useState({name:'All'});
  const [certifications,setCertifications] =useState([]);
  const [active,setActive]=useState(0);

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
  },[item])
  const handleClick =(e,index)=>{
    setItem({name:e.target.textContent});
    setActive(index);
  }
  return (
    <div>
      <div className="certification__filters">
      {certificatesNav.map((item,index)=>{
        return (
          <span onClick={(e)=>{
            handleClick(e,index);
          }} className={`${active===index? 'active-certification':""} certification__item`} key={index}>{item.name}</span>
        )
      })}
    </div>

    <div className="certification__container container grid">
      {certifications.map((item)=>{
        return <CertificateItems item={item} key={item.id} />
      })}
    </div>
    </div>
  )
}

export default Certifications