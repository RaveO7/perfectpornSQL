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
      queryRequest = "SELECT idVIdeo, chaine AS res FROM table_chaine GROUP BY chaine ORDER BY chaine ASC LIMIT " + startSearchVideo + ", " + numberVideoByPage + ""
      queryNumberPage = "SELECT COUNT(DISTINCT chaine) as number FROM `table_chaine`"
      break;
    case "pornstar":
      queryRequest = "SELECT idVIdeo, acteur AS res FROM table_acteur GROUP BY acteur ORDER BY acteur ASC LIMIT " + startSearchVideo + ", " + numberVideoByPage + ""
      queryNumberPage = "SELECT COUNT(DISTINCT acteur) as number FROM `table_acteur`"
      break;
    case "categorie":
      queryRequest = "SELECT idVIdeo, tag AS res FROM table_tag GROUP BY tag ORDER BY tag ASC LIMIT " + startSearchVideo + ", " + numberVideoByPage + ""
      queryNumberPage = "SELECT COUNT(DISTINCT tag) as number FROM `table_tag`"
      break;
    default:
      queryRequest = "SELECT idVIdeo, chaine AS res FROM table_chaine GROUP BY chaine ORDER BY chaine ASC LIMIT " + startSearchVideo + ", " + numberVideoByPage + ""
      queryNumberPage = "SELECT COUNT(DISTINCT chaine) as number FROM `table_chaine`"
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
