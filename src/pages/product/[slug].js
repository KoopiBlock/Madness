import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Product from '../../components/Products/Product'
import { client } from '../../lib/sanity_client'
import { urlFor } from '../../lib/sanity_client'
import BlockContent from '@sanity/block-content-to-react'
import shuffle from 'lodash.shuffle'
import styles from './ProductId.module.css'
import Varients from '../../components/Varients/Varients'
import MailList from '../../components/MailList/MailList';



const ProductId = (  { product, products }  ) => {

  
  const router = useRouter()
  const dynamicRoute = useRouter().asPath

  const { variants, name } = product
  const [firstVariant] = variants
  const oneStyle = variants.length === 1
  const [index, setIndex] = useState(0)
  
  const [activevariant, setactiveVariant] = useState(product.variants[0])

  const [inches, setInches] = useState(false)
  const [showCharts, setShowCharts] = useState(false)

  function handleClick() {
    setInches(prevState => !prevState)
  }

  function handleChartsButton() {
    setShowCharts(prevState => !prevState)
  }

  useEffect(() => setactiveVariant(product.variants[0]), [dynamicRoute])
  useEffect(() => setIndex(0), [dynamicRoute])


  const activeVariantImages = activevariant?.images

  const handleChane = (value) => {
    const varObject = variants.find((v) => v.id === value)
    setactiveVariant(varObject)
  }


  const rowsCm = product.sizechart.sizeChartCm.rows
  const cells = rowsCm.map(row => row.cells)

  const rowsIn = product.sizechart.sizeChartInches.rows
  const cellsIn = rowsIn.map(row => row.cells)


  
 

  return (
    <div key={product.id}>
       <div className={styles.productGrid}>
        <div className={styles.ImagesGrid}> 
            <div className={styles.bigImageGrid}>
              <img src={urlFor(activeVariantImages && activeVariantImages[index])} className={styles.bigImage} alt={'image'}/>
            </div>
            <div className={styles.galleryGrid}>
            {activeVariantImages?.map((image, i) =>(
                <div className={styles.smallImageGrid} key={i}>
                  <img 
                    src={urlFor(image)}
                    alt='e'
                    className={ styles.productImage}
                    onMouseEnter={() => setIndex(i)}
                  />
                </div>
              ))}
            </div>
            
          </div>
            <div className={styles.productDescGrid}>
              <div>
                <h1 className={styles.productName} >{product.name}</h1>
                <h1 className={styles.productPrice} >${activevariant?.price}</h1>
              </div>
              <div className={styles.sizeGrid}>
              <h1 className={styles.productSize}>Choose your size:</h1>
                <Varients 
                  value={activevariant.id}
                  onChange={({ target: { value }}) => {
                    handleChane(value)
                  }}
                  variants={variants}
                  disabled ={oneStyle} 
                  />
              </div>
                <button
                  className={`snipcart-add-item ${styles.buyBtn}`}
                  data-item-id={activevariant.id}
                  data-item-price={activevariant?.price}
                  data-item-url={`/api/products/${activevariant.id}`}
                  data-item-description={activevariant?.name}
                  data-item-image={urlFor(firstVariant.images[0])}
                  data-item-name={name}
                >ADD TO CART</button>
              <div>
                <BlockContent
                  className={styles.descBlock}
                  blocks={product.description}
                  projectId={'jqovmax6'}
                  dataset={'production'}
                />
              </div>
              <div>
                <button onClick={handleChartsButton} className={styles.chartBtn}>{showCharts ? 'Close Size Charts' : 'Show Size Charts' }</button>
              </div>
          </div>
          {showCharts ?   <div className={styles.ProductChartsGrid}>
            <div className={styles.prdouctDescGrid}>
              <img 
                className={styles.sizechartImage}
                src={urlFor(product.sizechart.productimages)}
              />
              <BlockContent
                  className={styles.productSizeDesc}
                  blocks={product.sizechart.description}
                  projectId={'jqovmax6'}
                  dataset={'production'}
                />
   
            </div>
            <div className={styles.chartsSelcContainer}>
            </div>
                  <div className={styles.chartsContainer}>
                    <div className={styles.charts}>
                      <h1 className={styles.chartsTitle}>Centimeters:</h1>
                      {rowsCm.map((row, i) => (
                        <table className={styles.table} key={i}>
                          <tbody>
                            <tr className={styles.tableRow}>
                              {row.cells.map((cell, i) => (
                                <td className={styles.tableCell} key={i}>{cell}</td>
                              ))}
                            </tr>
                        </tbody>
                      </table>
                      ))
                      }
                    </div> 
                    <div className={styles.charts}>
                      <h1 className={styles.chartsTitle}>Inches:</h1>
                      {rowsIn.map((row, i) => (
                        <table className={styles.table} key={i}>
                          <tbody>
                            <tr className={styles.tableRow}>
                              {row.cells.map((cell, i) => (
                                <td className={styles.tableCell} key={i}>{cell}</td>
                              ))}
                            </tr>
                        </tbody>
                      </table>
                      ))
                      }
                    </div>
                  </div> 
          </div> : <div className={styles.ProductChartsGridNot}></div>
          }
        </div>
        <h1 className={styles.productsTitle}>YOU MAY ALSO LIKE:</h1>
          <div className={styles.productsListGrid}>
          {products.slice(1, 5).map((product) => (
         
            <Product key={router.asPath} {...product}/>
         
      ))}
        </div>
        <div className={styles.mailList}>
          <MailList />
        </div>
    </div>
  )
}

export default ProductId


export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
      slug{
      current
    }   
  }`

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
      params: {
          slug: product.slug.current
      }
  }))

  return {
    paths,
    fallback: false
  }

}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productQuery = '*[_type == "product"]'
  

  const product = await client.fetch(query)
  const products = await client.fetch(productQuery)

 
  return {
    props: { 
      products:shuffle(products),
      product,
     }
  }
}