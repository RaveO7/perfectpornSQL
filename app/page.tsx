"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getNumberPage, getPageData } from '../components/Fetch'
import PageListVideo from '../components/PageListVideo'

export default function Home({ searchParams, }: { searchParams: { page: number } }) {
  const [videos, setDataVideo] = useState([])
  const [valueMenu, setValueMenu] = useState("Latest");
  const [numberPage, setNumberPage] = useState([] as any)

  const actualPageNbr = searchParams.page ? Math.abs(searchParams.page) : 1
  const router = useRouter()

  useEffect(() => {
    if (numberPage < actualPageNbr) { router.replace('/') }
    getPageData(actualPageNbr, valueMenu, setDataVideo)
  }, [actualPageNbr, valueMenu])

  useEffect(() => { getNumberPage(setNumberPage) }, [actualPageNbr])

  return (<PageListVideo valueMenu={valueMenu} setValueMenu={setValueMenu} videos={videos} page={actualPageNbr} numberPage={numberPage} nomGroupe={""} nbrVideo={""} />)
}