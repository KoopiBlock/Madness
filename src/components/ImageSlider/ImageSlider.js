import React, { useState } from 'react'
import {AiOutlineLeft} from 'react-icons/ai'
import {AiOutlineRight} from 'react-icons/ai'

import styles from './ImageSlider.module.css'

const ImageSlider = ({slides}) => {

const [currentIndex, setCurrentIndex] = useState(0)



const slidesStyles ={
    width: "100%",
    height: "100%",
    backgroundSize: "cover", 
    backgroundPosition: "center",
    transition: '200ms opacity ease-in-out',
    transitionDelay: '200ms',
    backgroundImage: `url(${slides[currentIndex]})`
}


  return (
    <div className={styles.sliderStyles}>
        <div style={slidesStyles}>
            <h1 className={styles.mainTitle}>MADNESS</h1>
        </div>
    </div>
  )
}

export default ImageSlider