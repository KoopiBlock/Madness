import { RiContactsBook2Line } from "react-icons/ri";


export default {
    name: 'aboutUSPage',
        type: 'document',
        title: 'About Us Page',
        icon: RiContactsBook2Line,
        fields: [
            {
                name: 'title',
                type: 'string',
                title: 'Title',
            },
            {
                name: 'description',
                title: 'Description',
                type: 'blockContent',
            },
        ]
}