import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method != "POST") {
        res.status(405).end();
        return;
    }
    const data = JSON.parse(req.body)
    // const id = await createItem(data)
    res.status(200).json({ data })
}