import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { client } from '../lib/sanity_client'

import styles from  '../components/Styles/AboutUs.module.css'

const Contact = ({ refundPage }) => {

  console.log(refundPage)

  const data = refundPage[0]

  return (
    <div>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>{data.title}</h1>
        <div>
          <BlockContent
            className={styles.descPage}
            blocks={data.description}
            projectId={'jqovmax6'}
            dataset={'production'}
          />
        </div>
      </div>
    </div>
  )
}

export default Contact

export async function getStaticProps() {

  const query = '*[_type == "refundPage"]'
    
  const refundPage = await client.fetch(query)

  return {
    props: {
      refundPage
    }
  }
}