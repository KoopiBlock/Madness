import React from 'react'
import Collections from '../../components/Collections/Collections'
import MailList from '../../components/MailList/MailList'
import Product from '../../components/Products/Product'
import { client } from '../../lib/sanity_client'

import styles from './CollectionPage.module.css'



const CollectionId = ({ collections, collection, collectionProducts }) => {




  return (
    <div className={styles.collectionPageContainer}>
        <h1 className={styles.collectionTitle}>{collection.name}</h1>
        <div className={styles.productGrid}>
            {collectionProducts.map((product) => (
               <Product key={product.id} {...product}/>
            ))}
        </div>
        <div>
          <h1>More Comming Soon!</h1>
          <MailList />
        </div>
        <div>
            <h1>Browse from other collections</h1>
            <div>
                <Collections collections={collections} />
            </div>
        </div>
    </div>

  )
}

export default CollectionId


export const getStaticPaths = async () => {
    const query = `*[_type == "collection"]{
        slug{
        current
      }   
    }`
  
    const collections = await client.fetch(query)
  
    const paths = collections.map((collection) => ({
        params: {
            slug: collection.slug.current
        }
    }))
  
    return {
      paths,
      fallback: false
    }
  
  }
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "collection" && slug.current == '${slug}'][0]`
    const collectionQuery = '*[_type == "collection"]'
    const collectionProductsQuery = `*[_type == "product" && '${slug}' in collections[]->slug.current] {
        ...,
        collections[] -> {
                name,
                slug
        },
      }    
      `    
  
    const collection = await client.fetch(query)
    const collections = await client.fetch(collectionQuery)
    const collectionProducts = await client.fetch(collectionProductsQuery)
  
   
    return {
      props: { 
        collections, collection, collectionProducts,
       }
    }
  }