import { FaRegEnvelopeOpen } from "react-icons/fa";


export default {
    name: 'contactInfo',
        type: 'document',
        title: 'Contact Info',
        icon: FaRegEnvelopeOpen,
        fields: [
            {
                name: 'contacts',
                title: 'Contacts',
                type: 'array',
                of: [
                    {
                        name: 'info',
                        title: 'Info',
                        type: 'object',
                        fields: [
                            {
                                name: 'name',
                                title: 'Name',
                                type: 'string',
                            },
                            {
                                name: 'contact',
                                title: 'Contact',
                                type: 'string',
                            },
                        ]
                    }
                ]
            },
            {
                name: 'brandLogo',
                title: 'Brand Logo',
                type: 'image',
                options: {
                    hotspot: true,
                }
            },
        ]
}