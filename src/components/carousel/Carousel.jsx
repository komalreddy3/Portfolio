import React,{useState,useEffect} from "react"
import "./Carousel.css"
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from "react-icons/bs"
export const Carousel=({data,start})=>{
   const [slide,setSlide]= useState(0);
   useEffect(() => {
      setSlide(0); // Reset slide to start whenever start prop changes
   }, [start]);
   const nextSlide=()=>{
      setSlide(slide>=data.length -1? 0: slide+1);
   }
   const prevSlide=()=>{
      setSlide(slide<=0? data.length-1:slide-1);
   }
   return <div className="carousel">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide}/>
      {data.map((item, idx) => {
         return <img src={item.imgLink} alt={item.description} key={item.id}
                     className={slide === idx ? "slide" : "slide slide-hidden"
                     }
         />

      })}
      <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide}/>

      <span className="indicators">
          <span>{
             data.map((item, idx) => {
                return <p className={slide === idx ? "desc-show" : "desc-show desc-hidden"}>{item.titleDesc}</p>
             })
          }</span>
         {data.map((_, idx) => {
            return <button key={idx} onClick={() => setSlide(idx)}
                           className={slide === idx ? "indicator" : "indicator indicator-inactive"}></button>
         })}
         {data.map((item, idx) => {
            return <a href={item.plink} target='_blank'
                      className={slide === idx ? "carousel-view" : "carousel-view-hidden"}>
               View <i
                className={slide === idx ? "bx bx-right-arrow-alt carousel-i-view" : "bx bx-right-arrow-alt carousel-i-view-hidden"}></i>
            </a>
         })}
   </span>
   </div>
};