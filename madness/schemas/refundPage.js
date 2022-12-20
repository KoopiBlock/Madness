import { RiRefundLine } from "react-icons/ri";


export default {
    name: 'refundPage',
        type: 'document',
        title: 'Refund Page',
        icon: RiRefundLine,
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