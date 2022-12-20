import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import shuffle from 'lodash.shuffle'
import { formatVariantName } from '../lib/formatVariantName'
import { printful } from '../lib/printful'
import Product from '../components/Products/Product'
import MailList from '../components/MailList/MailList'
import styles from '../components/Styles/Main.module.css'
import { client, urlFor } from '../lib/sanity_client'
import ImageSlider from '../components/ImageSlider/ImageSlider'
import Collections from '../components/Collections/Collections'



export default function Home({ collections, categories, pageDetails }) {
  

  const [categoryProducts, setCategoryProduct] = useState()
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const query = `*[_type == "product" && "${category}" in categories[]->slug.current] {
      ...,
      categories[] -> {
              name,
              slug
      },
    }    
    `

    const categoryProducts = client.fetch(query)
    .then(data => setCategoryProduct(data))

  }, [category])

  function handleClick(e) {
    console.log(e.target.value)
    setCategory(e.target.value)
  }

  const bannerSlides = pageDetails[0].images.map(image => urlFor(image))


  return (
    <div className={styles.main}>
      <div>
        <div className={styles.sliderContainer}>
         <ImageSlider slides={bannerSlides} />
        </div>
      </div>
      <h1 className={styles.mainTitle}  id='select'>Our Products:</h1>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryGrid}>
          <h1 className={styles.categorySelects} >Browse By Category:</h1>
        <select onChange={handleClick} className={styles.selector}  value={category}>
          {categories.map((category) => (
              <option value={category.name.toLowerCase()} className={styles.option} key={category.name}>{category.name}</option>
          ))}
          </select>
        </div>
      </div>
      <div className={styles.productsGrid}>
        <div className={styles.productsWrapper}>
          {categoryProducts?.map((product) => (
            <Product key={product.id} {...product}/>
          ))}
        </div>
      </div>
      <div>
        <h1 className={styles.collectionsTitle}>Our Collections:</h1>
        <div>
          <Collections collections={collections} />
        </div>
      </div>
      <div className={styles.mailList}>
          <MailList />
        </div>
    </div>
  )
}


export async function getStaticProps() {
  const query = '*[_type == "product"]'
  const queryCategory = '*[_type == "category"]'
  const queryCollection = '*[_type == "collection"]'

  const categoryQuery = `*[_type == "product" && 'shirts' in categories[]->slug.current] {
    ...,
    categories[] -> {
            name,
            slug
    },
  }    
  `

  
  const pageQuery = '*[_type == "mainPage" ]'

  const categoryProducts = client.fetch(categoryQuery)
  const products = await client.fetch(query)
  const categories = await client.fetch(queryCategory)
  const pageDetails = await client.fetch(pageQuery)
  const collections = await client.fetch(queryCollection)

 
  
  return {
    props: {
      products: shuffle(products),
      categories: categories,
      collections: collections,
      pageDetails: pageDetails,
    }
  }
}