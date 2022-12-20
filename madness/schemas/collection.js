import { BiCollection } from "react-icons/bi";

export default {
    name: 'collection',
    type: 'document',
    title: 'Collection',
    icon: BiCollection,
    fields:[
        {
            name: 'name',
            type: 'string',
            title: 'Name',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
        },
        
    ]
}