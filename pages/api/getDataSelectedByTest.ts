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

  if (req.method != "POST") {
    res.status(405).end();
    return;
  }
  const numberVideoByPage = 48
  const nbrPage = JSON.parse(req.body).nbrPage - 1 <= 0 ? 0 : JSON.parse(req.body).nbrPage - 1;

  const startSearchVideo = nbrPage * numberVideoByPage

  const page = JSON.parse(req.body).page;
  let queryRequest
  let queryNumberPage

  switch (page) {
    case "channel":
      queryRequest = "SELECT * FROM videos WHERE chanelle LIKE '%" + JSON.parse(req.body).id + "%' ORDER BY id DESC LIMIT " + startSearchVideo + ", " + numberVideoByPage
      queryNumberPage = "SELECT COUNT(DISTINCT title) as number FROM videos WHERE chanelle LIKE '%" + JSON.parse(req.body).id + "%'"
      break;
    case "pornstar":
      queryRequest = "SELECT * FROM videos WHERE acteurs LIKE '%" + JSON.parse(req.body).id + "%' ORDER BY id DESC LIMIT " + startSearchVideo + ", " + numberVideoByPage
      queryNumberPage = "SELECT COUNT(DISTINCT title) as number FROM videos WHERE acteurs LIKE '%" + JSON.parse(req.body).id + "%'"
      break;
    case "categorie":
      queryRequest = "SELECT * FROM videos WHERE tags LIKE '%" + JSON.parse(req.body).id + "%' ORDER BY id DESC LIMIT " + startSearchVideo + ", " + numberVideoByPage
      queryNumberPage = "SELECT COUNT(DISTINCT title) as number FROM videos WHERE tags LIKE '%" + JSON.parse(req.body).id + "%'"
      break;
    default:
      queryRequest = "SELECT * FROM videos WHERE chanelle LIKE '%" + JSON.parse(req.body).id + "%' ORDER BY id DESC LIMIT " + startSearchVideo + ", " + numberVideoByPage
      queryNumberPage = "SELECT COUNT(DISTINCT title) as number FROM videos WHERE chanelle LIKE '%" + JSON.parse(req.body).id + "%'"
      break;
  }

  try {
    var datas = []
    const data: any = await query({ query: queryNumberPage, values: [] })
    datas[0] = await query({ query: queryRequest, values: [] })
    datas[1] = Math.ceil(data[0].number / 48)

    res.status(200).json({ videos: datas })
  } catch (error: any) {
    console.log(error)
    throw Error(error.message);
  }
}
