import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'jqovmax6',
    dataset: 'production',
    token: 'sk75zLzrOzr7aB8WAJzMxmNVHqNu8Hya5tEDYrBEJIGSoWAk7tDzrFzFhZPKrvWaKexVqS5FB7qP5LXpv8zgnDzQF83sc7v7maZBwv7n2mDYXzqbEXkc9nnEtgLEiGziSRezxDgitLGrPcEqtBrFaWPJijv1BXeMc1nxRF4y0CuWx05mmHQD',
    useCdn: false,
    apiVersion: "2022-02-03"
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source); 