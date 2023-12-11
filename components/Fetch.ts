import { Dispatch, SetStateAction } from "react"

/* Home Page */

export async function getPageData(page: any, valueMenu: any, setDataVideo: any) {
    const apiUrlEndpoint = "/api/getAllSelected"

    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            page: page,
            order: valueMenu,
        })
    }

    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()

    setDataVideo(res.videos)
}

export async function getNumberPage(setNumberPage: any) {
    const apiUrlEndpoint = "/api/getNumberPage"

    const response = await fetch(apiUrlEndpoint)
    const res = await response.json()

    setNumberPage(res.products)
}

/* Page Video */

export async function getVideoSelected(id: any, setDataVideo: any, setLoading: any) {
    const apiUrlEndpoint = "/api/getVideoById"

    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
        })
    }
    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()

    setDataVideo(res.video[0])
    setLoading(false)
}

export async function getNumberVideoByChannel(id: any, setDataNbrVideo: { (arg0: any): void; setDataNbrVideo?: Dispatch<SetStateAction<never[]>> }) {
    const apiUrlEndpoint = "/api/getNumberVideoChaine"

    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
        })
    }
    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()

    setDataNbrVideo(res.video)
}

export async function getMoreVideo(id: any, chaine: string, setDataMoreVideo: Dispatch<SetStateAction<never[]>>) {
    if (chaine && id) {
        const apiUrlEndpoint = "/api/getMoreVideo"

        const postData: any = {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                chanelle: chaine,
            })
        }
        const response = await fetch(apiUrlEndpoint, postData)
        const res = await response.json()

        setDataMoreVideo(res.video)
    }
}

/* Search Page */

export async function getSearchDataVideos(valueMenu: any, pageSearch: any, search: any, nbrPage: any, setDataVideo: any) {
    const apiUrlEndpoint = "/api/getSearchVideos"
    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order: valueMenu,
            pageSearch: pageSearch,
            searchValue: search,
            page: nbrPage,
        })
    }
    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()

    setDataVideo(res.videos)
}

export async function getSearchNumberPage(setNumberPage: any) {
    const apiUrlEndpoint = "/api/getNumberPage"

    const response = await fetch(apiUrlEndpoint)
    const res = await response.json()

    setNumberPage(res.products)
}

/* Type Page */

export async function getSelectedAllNameByType(pageType: any, actualPageNbr: any, setDataResponse: any, setNumberPage: any) {
    const apiUrlEndpoint = "/api/getDataSelectedTest"

    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            page: pageType,
            nbrPage: actualPageNbr,
        })
    }

    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()
    setDataResponse(res.videos[0])
    setNumberPage(res.videos[1])
}


/* Name Page */

export async function getSelectedAllVideoByName(pageType: any, nomGroupe: any, actualPageNbr: any, setDataResponse: any, setNumberPage: any) {
    const apiUrlEndpoint = "/api/getDataSelectedByTest"

    const postData: any = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
            page: pageType,
            id: nomGroupe,
            nbrPage: actualPageNbr,
        })
    }

    const response = await fetch(apiUrlEndpoint, postData)
    const res = await response.json()
    setDataResponse(res.videos[0])
    setNumberPage(res.videos[1])
}