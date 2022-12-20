import { FaQuestionCircle } from "react-icons/fa";


export default {
    name: 'faqPage',
        type: 'document',
        title: 'FAQ Page',
        icon: FaQuestionCircle,
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
            {
                name: 'quistions',
                title: 'Quistions',
                type: 'array',
                of: [
                    {
                        name: 'variant',
                        title: 'Variant',
                        type: 'object',
                        fields: [
                            {
                                name: 'quistion',
                                title: 'Quistion',
                                type: 'string',
                            },
                            {
                                name: 'answer',
                                title: 'Answer',
                                type: 'string',
                            },
                        ]
                    }
                ]
            },
        ]
}