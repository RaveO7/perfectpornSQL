// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from "@/lib/bdd"

type Data = {
    videos: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const numberVideoByPage = 48
    const page = JSON.parse(req.body).page - 1 <= 0 ? 0 : JSON.parse(req.body).page - 1;
    const startSearchVideo = page * numberVideoByPage

    var pageSearch = JSON.parse(req.body).pageSearch
    const research = JSON.parse(req.body).searchValue.replace(' ', '-')

    var order: string

    switch (JSON.parse(req.body).order) {
        case "Latest":
            order = "ORDER BY id DESC"
            break;
        case "More View":
            order = "ORDER BY nbrView DESC"
            break;
        case "Most Popular":
            order = "ORDER BY likeVideo DESC"
            break;
        case "A->Z":
            order = "ORDER BY title ASC"
            break;
        case "Z->A":
            order = "ORDER BY title DESC"
            break;
        default:
            order = "ORDER BY id DESC"
            break;
    }

    switch (pageSearch) {
        case "video":
            pageSearch = "title"
            break;
        case "channel":
            pageSearch = "chanelle"
            break;
        case "pornstar":
            pageSearch = "acteurs"
            break;
        case "categorie":
            pageSearch = "tags"
            break;
        default:
            pageSearch = "title"
            break;
    }

    try {
        const queryRequest = "SELECT * FROM videos WHERE " + pageSearch + " LIKE '%" + research + "%' " + order + " LIMIT " + startSearchVideo + ", " + numberVideoByPage + ""
        const valuesParams: Array<any> = []
        const datas = await query({ query: queryRequest, values: valuesParams })

        res.status(200).json({ videos: datas })
    } catch (error: any) {
        console.log(error)
        throw Error(error.message);
    }
}