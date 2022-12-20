import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

import { useSpring, animated } from 'react-spring'
import styles from './Navbar.module.css'

import logo from '../../../public/images/logoB.png' 
import { client } from '../../lib/sanity_client'



function LoopFunction() {
  const n = useRef(0)
  const styles = useSpring({
    loop: () => 3 > n.current++,
    from: { x: 0 },
    to: { x: 100 },
  })

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        backgroundColor: '#46e891',
        borderRadius: 16,
        ...styles,
      }}
    />
  )
}


const Navbar = () => { 
  const [flip, set] = useState(false)

  const animStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    reverse: flip,
    delay: 200,
    
    onStart: () => set(!flip),
  })

  const [menu, setMenu] = useState(false)
  const [seeCategories, setSeeCategories] = useState(false)
  const [seeCollections, setSeeCollections] = useState(false)

  const [contactData, setContactData] = useState([])
  const [collectionData, setCollectionData] = useState([])


  useEffect(() => {
    const query = '*[_type == "contactInfo"][0]'
    const ConatctInfo = client.fetch(query)
    
    .then(data => {
      setContactData(data)
    })
    
  }, [])

  useEffect(() => {
    const queryCollection = '*[_type == "collection"]'   
    const collectponData = client.fetch(queryCollection)

    .then(data => {
      setCollectionData(data)
    })
    
  }, [])


  return (
    <>
    <div className={styles.navbar}>
        <div className={styles.container}>
          <div onClick={() => setMenu(!menu)} className={styles.hamburgerMenu}>
              {menu ? <AiOutlineClose /> : <AiOutlineMenu />} 
          </div>
            <Link href='/'>
              <div className={styles.logoContainer}>
                <Image src={logo} alt='e' width='110' height='110' />
                <h1 className={styles.logoTitle}></h1>
              </div>
            </Link >
            <button className={`snipcart-checkout ${styles.cartButton}`}>
              <FiShoppingCart />
            </button>
        </div>
    </div>
    {menu ?   
   
        <div className={styles.sideBarActive}>
          <ul className={styles.sideLinksList}>
            <li className={styles.CategoryLink} onClick={() => setSeeCollections(! seeCollections)}>Collections{seeCollections ? < FiChevronUp className={styles.arrow} /> : < FiChevronDown className={styles.arrow} />}
              {seeCollections ? <ul className={styles.collectionList}>
                {collectionData.map((collection) => (
                  <Link href={`/collection/${collection.slug.current}`} key={collection.slug.current}>
                    <li className={styles.CategoryLink}>{collection.name}</li>
                  </Link>
                ))}
              </ul> : <></>}
            </li>
            <li className={styles.CategoryLink} onClick={() => setSeeCategories(! seeCategories)}>
              <Link href='/#select'>
                Browse By Category
              </Link>
            </li>
            <Link href='/aboutUs'><li  className={styles.CategoryLink}>About Us</li></Link>
            <Link href='/faq'><li  className={styles.CategoryLink}>FAQ</li></Link>
            <li  className={styles.CategoryLink}>Contact Us:
              <ul className={styles.collectionList}>
                {contactData?.contacts?.map(contact => (
                  <li className={styles.conatctInfo} key={contact.name}>{contact.name} {contact.contact}</li>
                ))}
              </ul>
          </li>
          <Link href='/refundPolicy'><li  className={styles.CategoryLink}>Refund Policy</li></Link>
          <li  className={styles.CategoryLink}>Blog</li>
        </ul>
      </div> 

     : /** two differt states of the  menu! (there is a cleaner way to achive the same result im just lazy here lol) */
     
     <div className={styles.sideBarActiveNot}>
     <ul className={styles.sideLinksList}>
       <li className={styles.CategoryLink} onClick={() => setSeeCollections(! seeCollections)}>Collections{seeCollections ? < FiChevronUp className={styles.arrow} /> : < FiChevronDown className={styles.arrow} />}
         {seeCollections ? <ul className={styles.collectionList}>
           {collectionData.map((collection) => (
             <Link href={`/collection/${collection.slug.current}`} key={collection.slug.current}>
               <li className={styles.collectionLink}>{collection.name}</li>
             </Link>
           ))}
         </ul> : <></>}
       </li>
       <li className={styles.CategoryLink} onClick={() => setSeeCategories(! seeCategories)}>
         <Link href='/#select'>
           Browse By Category
         </Link>
       </li>
       <Link href='/aboutUs'><li  className={styles.CategoryLink}>About Us</li></Link>
       <Link href='/faq'><li  className={styles.CategoryLink}>FAQ</li></Link>
       <li  className={styles.CategoryLink}>Contact Us:
         <ul className={styles.collectionList}>
           
           
         </ul>
     </li>
     <Link href='/refundPolicy'><li  className={styles.CategoryLink}>Refund Policy</li></Link>
     <li  className={styles.CategoryLink}>Blog</li>
   </ul>
 </div>
 
 }

    </>
  )
}

export default Navbar

