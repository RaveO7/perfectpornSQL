"use client"

import React, { useState, useEffect } from 'react'
import PageListVideo from '@/components/PageListVideo'
import { getSelectedAllVideoByName } from '@/components/Fetch'

export default function PageName({ params, searchParams }: {
    params: { type: string, name: string }
    searchParams: { page: number }
}) {
    const [videos, setDataResponse] = useState([])
    const [numberPage, setNumberPage] = useState([] as any)

    const pageType = params.type
    const nomGroupe = decodeURI(params.name)
    const actualPageNbr = searchParams.page ? Math.abs(searchParams.page) : 1
    const nbrVideo = numberPage !== 1 ? numberPage * 48 : videos.length

    useEffect(() => { getSelectedAllVideoByName(pageType, nomGroupe, actualPageNbr, setDataResponse, setNumberPage); }, [actualPageNbr])

    return (<PageListVideo valueMenu={""} setValueMenu={""} videos={videos} page={actualPageNbr} numberPage={numberPage} nomGroupe={nomGroupe} nbrVideo={nbrVideo} />)
}