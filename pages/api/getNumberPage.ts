// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from "@/lib/bdd"

type Data = {
    products: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const queryRequest = "SELECT COUNT(id) number FROM videos"
        const valuesParams: Array<any> = []
        const data: any = await query({ query: queryRequest, values: valuesParams })
        res.status(200).json({ products: Math.ceil(data[0].number/48) })
    } catch (error: any) {
        console.log(error)
        throw Error(error.message);
    }
}