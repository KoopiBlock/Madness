import { BiCategory } from "react-icons/bi";

export default {
    name: 'category',
    type: 'document',
    title: 'Category',
    icon: BiCategory,
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