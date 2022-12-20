import React from 'react'
import  Link from 'next/link'
import { urlFor } from '../../lib/sanity_client'


import styles from './Collection.module.css'


const Collections = ( categories ) => {

    const collectionsArray = categories.collections
    
    return (
        <div className={styles.collectionsContainer}>
            {collectionsArray.map((collection)=>(
                <div className={styles.singleCollectionContainer} key={collection.slug.current}>
                    <Link href={`/category/${collection.slug.current}`} >
                        <div style={{
                            backgroundImage: `url(${urlFor(categories.images)})`,
                            width: "230px",
                            height: "230px",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            }}>
                            <h1 className={styles.collectionName}>{categories.name}</h1>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Collections