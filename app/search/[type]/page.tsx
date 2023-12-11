"use client"

import React, { useState, useEffect } from 'react'
import { getSearchDataVideos, getSearchNumberPage } from '@/components/Fetch'
import PageListVideo from '@/components/PageListVideo'

export default function SearchPage({ params, searchParams, }: {
  params: { type: string },
  searchParams: { page: number, name: string }
}) {
  const [videos, setDataVideo] = useState([])
  const [valueMenu, setValueMenu] = useState("Latest");
  const [numberPage, setNumberPage] = useState([] as any)

  const actualPageNbr = searchParams.page ? Math.abs(searchParams.page) : 1
  const pageSearch = params.type
  const search = searchParams.name

  useEffect(() => { getSearchDataVideos(valueMenu, pageSearch, search, actualPageNbr, setDataVideo); }, [valueMenu]);
  useEffect(() => { getSearchNumberPage(setNumberPage) }, [actualPageNbr])

  return (<PageListVideo valueMenu={valueMenu} setValueMenu={setValueMenu} videos={videos} page={actualPageNbr} numberPage={numberPage} nomGroupe={""} nbrVideo={""} />)
}