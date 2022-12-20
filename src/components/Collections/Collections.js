import React from 'react'
import  Link from 'next/link'
import { urlFor } from '../../lib/sanity_client'


import styles from './Collection.module.css'


const Collections = ( collections ) => {

    const collectionsArray = collections.collections
    
    return (
        <div className={styles.collectionsContainer}>
            {collectionsArray.map((collection)=>(
                <div className={styles.singleCollectionContainer}  key={collection.slug.current}>
                    <Link href={`/collection/${collection.slug.current}`}>
                        <div style={{
                            backgroundImage: `url(${urlFor(collection.images)})`,
                            width: "230px",
                            height: "230px",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            }}>
                            <h1 className={styles.collectionName}>{collection.name}</h1>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Collections