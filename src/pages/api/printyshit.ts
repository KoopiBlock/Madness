import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';
import { printful } from "../../lib/printful"
import { formatVariantName } from '../../lib/formatVariantName'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    try {
      const {result: productsIds } = await printful.get("store/products")

      const allProducts = await Promise.all(
      productsIds.map(async ({ id }) => await printful.get(`store/products/${id}`))
      )

      const products = allProducts.map(
      ({ result: { sync_product, sync_variants } }) => ({
          ...sync_product,
          variants: sync_variants.map(({ name, ...variant }) => ({
          name: formatVariantName(name),
          ...variant,
          })),
      })
      );
      
      res.status(200).json({ 
          products
      });
      
    } catch ({ error }) {
      console.log(error);
      res.status(404).json({
        errors: [
          {
            key: error?.message,
            message: error?.message,
          },
        ],
      });
    }
}