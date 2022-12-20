import Image from 'next/image'
import React, { useState } from 'react'
import  Link  from 'next/link'
import { useRouter } from 'next/router';
import Varients from '../Varients/Varients'

import styles from './Product.module.css'
import { urlFor } from '../../lib/sanity_client'
import { map } from 'lodash'


const Product = ( product ) => {
  const router = useRouter();
  const { variants, name } = product
  const [firstVariant] = variants
  const oneStyle = variants.length === 1
  
  const [activeVariantId, setActiveVariantId] = useState(firstVariant.id)

  const activeVariant = variants.find(
    (v) => v.id === activeVariantId
  )

  const activeVariantImages = activeVariant?.images

  return (
    <div  className={styles.productGrid}>
          <Link href={`/product/${product.slug.current}`} className={styles.productLink} >
            <div>
              {activeVariantImages?.slice(0, 1).map((image, i) =>(
              <div key={i}>
                <img 
                  src={urlFor(image)}
                  alt='e'
                  className={styles.productImage}
                />
              </div>
                ))}
              <div>
                <h1 className={styles.productName}>{product.name}</h1>
                <h1 className={styles.productPrice}>${activeVariant?.price}</h1>
              </div>
            </div>
          </Link>
     </div>
  )
}

export default Product