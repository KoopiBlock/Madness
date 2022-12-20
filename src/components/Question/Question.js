import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import styles from './FAQ.module.css'

const Question = (question, index) => {

    const [select, setSelect] = useState(false)

    function toggle() {
        setSelect(select => !select)
    }

    const data = question.question

  return (
    <div className={styles.container} key={index}>
        <div className={styles.questionContainer}>
            <h1>{data.quistion}</h1>
            { select ? <span className={styles.logo} onClick={toggle}><FaChevronUp/></span> : <span className={styles.logo} onClick={toggle}><FaChevronDown/></span>}
        </div>
        <div className={styles.answerContainer}>
            { select ? <h1>{data.answer}</h1> : <></>}
        </div>
    </div>
  )
}

export default Question