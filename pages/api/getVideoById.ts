// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from "@/lib/bdd"

type Data = {
    video: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method != "POST") {
        res.status(405).end();
        return;
    }

    const id = JSON.parse(req.body).id;

    try {
        const queryRequest = "SELECT * FROM videos WHERE id = ?"
        const valuesParams: Array<any> = [id]
        const datas: any = await query({ query: queryRequest, values: valuesParams })

        res.status(200).json({ video: datas })
    } catch (error: any) {
        console.log(error)
        throw Error(error.message);
    }
}
