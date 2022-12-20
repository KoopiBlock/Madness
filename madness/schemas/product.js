import { FaTshirt } from "react-icons/fa";
import flatten from 'lodash'
import { client } from "../../src/lib/sanity_client";


function transform(productData) {
    
    const product = {
        _id: productData.external_id,
        _type: 'product',
        name: productData.name,
        id: productData.external_id,
        sync_id: productData.id,
        variants: productData.variants.map(variant => {
            return {
                _type: 'variant',
                _key: variant.external_id,
                _id: variant.external_id,
                name: variant.name,
                id: variant.external_id,
                sync_id: variant.id,
                price: variant.retail_price,
            }   
        }),
    }

    return [product]

}

 fetch('http://localhost:3000/api/printyshit', { method: 'GET'})
    .then(response => response.json())
    .then(response => {
        const products = response.products
        const mappedProducts = products.map(transform)
        return mappedProducts
       })

    .then(products => {
        let trans = client.transaction()
        products.forEach(product => {
            console.log(product[0])
           trans.createIfNotExists(product[0])

           return trans.commit()
        })
   
    })

    
    .catch(err => console.error(err))


    export default {
        name: 'product',
        type: 'document',
        title: 'Product',
        icon: FaTshirt,
        fields: [
            {
                name: 'name',
                type: 'string',
                title: 'Name',
            },
            {
                name: 'id',
                title: 'Id',
                type: 'string',
            },
            {
                name: 'iddd',
                title: 'Iddd',
                type: 'string',
            },
            {
                name: 'sync_id',
                title: 'Sync Id',
                type: 'number',
            },
            {
                name: 'slug',
                type: 'slug',
                title: 'Slug',
                options: {
                    source: 'sync_id',
                    maxLength: 90,
                }
            },
            {
                name: 'description',
                title: 'Description',
                type: 'blockContent',
            },
            {
                name: 'categories',
                title: 'Categories',
                type: 'array',
                of: [{type: 'reference', to: {type: 'category'}}],
            },
            {
                name: 'collections',
                title: 'Collections',
                type: 'array',
                of: [{type: 'reference', to: {type: 'collection'}}],
            },
            {
                name: 'sizechart',
                title: 'Size Chart',
                type: 'object',
                fields: [
                    {
                        name: 'description',
                        title: 'Description',
                        type: 'blockContent',
                    },
                    {
                        name: 'productimages',
                        title: 'Product Images',
                        type: 'image',
                        options: {
                            hotspot: true,
                        }
                    },
                    {
                        name: 'sizeChartInches',
                        title: 'Size Chart Inches',
                        type: 'table', // Specify 'table' type
                    },
                    {
                        name: 'sizeChartCm',
                        title: 'Size Chart Cm',
                        type: 'table', // Specify 'table' type
                    },
                    
                    
                ]
            },
            {
                name: 'variants',
                title: 'Variants',
                type: 'array',
                of: [
                    {
                        name: 'variant',
                        title: 'Variant',
                        type: 'object',
                        fields: [
                            {
                                name: 'name',
                                title: 'Name',
                                type: 'string',
                            },
                            {
                                name: 'id',
                                title: 'Id',
                                type: 'string',
                            },
                            {
                                name: 'sync_id',
                                title: 'Sync Id',
                                type: 'number',
                            },
                            {
                                name: 'slug',
                                title: 'Slug',
                                type: 'string',
                                options: {
                                    source: 'sync_id',
                                    maxLength: 90,
                                }
                            },
                            {
                                name: 'price',
                                title: 'Price',
                                type: 'string',
                            },
                            {
                                name: 'images',
                                title: 'Images',
                                type: 'array',
                                of: [{type: 'image'}],
                                options: {
                                    hotspot: true,
                                }
                            },
                        ]
                    },
                    
                ]
            }
        ]
    
    }