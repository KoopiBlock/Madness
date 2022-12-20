import { RiPagesLine } from "react-icons/ri";


export default {
    name: 'mainPage',
        type: 'document',
        title: 'Main Page',
        icon: RiPagesLine,
        fields: [
            {
                name: 'name',
                type: 'string',
                title: 'Name',
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
            {
                name: 'mainTitle',
                type: 'string',
                title: 'Main Title', 
            },
            {
                name: 'categoriesSelector',
                type: 'string',
                title: 'Categories Selector', 
            },
        ]
}