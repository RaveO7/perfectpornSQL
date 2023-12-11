import React from 'react'
import BurgerMenuIndexPage from './DroptwonFilter'
import VideoPresentation from './VideoPresentation'
import { upperFirstLetter } from './Utils'
import NavPage from './NavPage'

interface Props {
    valueMenu: any,
    setValueMenu: any,
    videos: any,
    page: any,
    numberPage: any,
    nomGroupe: any,
    nbrVideo: any
}

export default function PageListVideo(props: Props) {
    const valueMenu = props.valueMenu
    const setValueMenu = props.setValueMenu
    const videos = props.videos
    const page = props.page
    const numberPage = props.numberPage
    const nomGroupe = props.nomGroupe
    const nbrVideo = props.nbrVideo

    return (
        <div className='flex flex-col w-full'>
            {valueMenu ?
                <div className='mx-6 flex flex-col justify-between items-center text-[20px]'>
                    <div className='w-full flex justify-between items-center text-[20px] mb-6'>
                        <h2>{valueMenu + " " + upperFirstLetter("videos")}</h2>
                        <BurgerMenuIndexPage valueMenu={valueMenu} setValueMenu={setValueMenu} />
                    </div>
                </div>
                :
                <div className='w-full flex justify-between items-center text-[20px] mb-6'>
                    <h2 className='text-center text-5xl font-bold'>{upperFirstLetter(nomGroupe)} : {nbrVideo}</h2>
                </div>
            }

            <div className='grid justify-center grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-[15px] gap-x-[25px] mb-3'>
                {videos.map((video: any, id: number) =>
                    <VideoPresentation key={id} id={video.id} title={video.title} url={video.imgUrl} chaine={video.chanelle} time={video.time} view={video.nbrView} like={video.likeVideo} dislike={video.dislikeVideo} />
                )}
            </div>
            <NavPage page={page} numberPage={numberPage} />
        </div>
    )
}
