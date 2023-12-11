"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NavPage from '../../components/NavPage'
import { upperFirstLetter } from '../../components/Utils'
import { getSelectedAllNameByType } from '../../components/Fetch'

export default function PageType({ params, searchParams, }: {
    params: { type: string },
    searchParams: { page: number }
}) {
    const actualPageNbr = searchParams.page ? Math.abs(searchParams.page) : 1
    const pageType = params.type
    const [dataResponse, setDataResponse] = useState([])
    const [numberPage, setNumberPage] = useState([] as any)

    useEffect(() => { getSelectedAllNameByType(pageType, actualPageNbr, setDataResponse, setNumberPage); }, [actualPageNbr])

    const nbrVideo = numberPage !== 1 ? numberPage * 48 : dataResponse.length

    return (
        <div className='flex justify-center gap-5 flex-col -mt-3'>
            <h2 className='text-center text-5xl font-bold'>{upperFirstLetter(params.type) + "s " + nbrVideo}</h2>
            <div className='grid justify-center grid-cols-4 gap-x-[30px] gap-y-[20px]  w-fit m-auto'>
                {dataResponse.map((data: any, id: number) =>
                    <Link key={id} href={"/" + params.type + "/" + data.res} className='w-fit hover:text-pink-200'>
                        <h3>{upperFirstLetter(data.res)}</h3>
                    </Link>
                )}
            </div>

            <NavPage page={actualPageNbr} numberPage={numberPage} />
        </div>
    )
}