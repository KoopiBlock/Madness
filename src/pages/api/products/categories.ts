import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';
import {client} from '../../../lib/sanity_client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });


    const { keyword } = req.query

    try{
    const query = `*[_type == "product" && 'shirts' in categories[]->slug.current] {
        ...,
        categories[] -> {
                name,
                slug
        },
      }     
    `
    const categoryProducts = client.fetch(query)

    res.status(200).json({ 
        categoryProducts: categoryProducts
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