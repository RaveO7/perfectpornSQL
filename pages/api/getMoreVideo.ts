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
    const chanelle = JSON.parse(req.body).chanelle;
    const lim = 9

    try {
        const queryRequest = "SELECT * FROM videos WHERE id !=  " + id + " AND chanelle LIKE '%" + chanelle + "%' LIMIT " + lim
        const valuesParams: Array<any> = []
        const test: Array<any> = []
        test.push(await query({ query: queryRequest, values: valuesParams }))
        
        while (test.length !== 9) {
            const lim = 9 - Object.keys(test[0]).length
            const queryRequest = "SELECT * FROM videos WHERE id != " + id + " LIMIT " + lim + ""
            const valuesParams: Array<any> = []
            test.push(await query({ query: queryRequest, values: valuesParams }))
        }

        const datas = test[0].concat(test[1]);

        res.status(200).json({ video: datas })
    } catch (error: any) {
        console.log(error)
        throw Error(error.message);
    }
}