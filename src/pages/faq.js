import React, { useState } from 'react'
import {client} from '../lib/sanity_client'

import Question from '../components/Question/Question';
import styles from '../components/Styles/faqPage.module.css'

const FAQ = ( faq ) => {

  const faqData = faq.faq[0]

  return (
    <div>
      <h1 className={styles.faqTitle} >{faqData.title}</h1>
      <div>
        {faqData.quistions.map((question, index) => (
          <Question question={question} key={index} />
        ))}
      </div>
    </div>
  )
}

export default FAQ

export async function getStaticProps() {

  const query = '*[_type == "faqPage"]'
    
  const faq = await client.fetch(query)

  return {
    props: {
      faq
    }
  }
}