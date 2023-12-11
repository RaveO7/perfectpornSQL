"use client"
{/**
Récupere le nombre d'acteurs/tags récupere la taille de chacun que l'on Add on Add nbrTags * mr
Si résultat + grand que *2 de hauteur du bloque alors on ajoute un bouton aggrandire.
*/}
import Separateur from '@/components/Separateur'
import VideoPresentation from '@/components/VideoPresentation';
import React, { useState, useEffect } from 'react'
import { FaFlag } from "react-icons/fa";
import { IoMdThumbsUp } from "react-icons/io";
import { IoMdThumbsDown } from "react-icons/io";
import TimeDifference, { getRating, upperFirstLetter } from '@/components/Utils';
import DropDown from '@/components/DroptownVideoLinks';
import Link from 'next/link';
import { getNumberVideoByChannel, getMoreVideo, getVideoSelected } from '@/components/Fetch';


export default function VideoPage(
  { params, }: { params: { id: number | string; type: string } }
) {
  const [dataVideo, setDataVideo] = useState([] as any)
  const [dataMoreVideo, setDataMoreVideo] = useState([])
  const [dataNbrVideo, setDataNbrVideo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [player, setPlayer] = useState(0);

  let id = params.id
  if (id == "random") { id = Math.floor(Math.random() * 1808) + 1; }

  let chaine: string

  useEffect(() => { getVideoSelected(id, setDataVideo, setLoading); }, [])
  useEffect(() => { getNumberVideoByChannel(id, setDataNbrVideo) }, []);
  useEffect(() => { getMoreVideo(id, chaine, setDataMoreVideo) }, [dataVideo])

  if (isLoading) return <p>Loading...</p>
  if (!dataVideo) return <p>No data</p>

  const name: string = dataVideo.title;
  chaine = JSON.parse(dataVideo.chanelle)[0];
  let date: string = dataVideo.dateUpload
  date = TimeDifference({ date })
  const like: number = dataVideo.likeVideo
  const dislike: number = dataVideo.dislikeVideo
  const nbrView: number = dataVideo.nbrView
  const rating: number = getRating(like, dislike)
  const videos: Array<string> = JSON.parse(dataVideo.videoUrl);
  if (!dataVideo.tags.endsWith('"]')) { dataVideo.tags += '"]' }
  const tags: Array<string> = JSON.parse(dataVideo.tags);
  if (!dataVideo.acteurs.endsWith('"]')) { dataVideo.acteurs += '"]' }
  const acteurs: Array<string> = JSON.parse(dataVideo.acteurs);

  return (
    <div className='w-full flex flex-col'>

      {videos[1] && <DropDown video={videos} setPlayer={setPlayer} />}

      <div className='flex w-full mb-2'>
        <div className='border-[1px] border-blue-300 w-[75%] aspect-video h-full bg-gray-950'>
          <iframe id="monIframe" className='w-full h-full'
            name={`video ` + name}
            allowFullScreen allow="autoplay" scrolling="no" frameBorder="0"
            src={videos[player]}></iframe>
        </div>

        <div className='max-w-[25%] flex flex-col justify-between bg-green-500 w-full'>
          <h2 className='text-center font-extrabold'>Pubed</h2>
        </div>
      </div>
      <div className='flex'>
        <div className='w-[75%] h-full p-2'>
          <div>
            <h2 className="max-w-full mb-2 text-xl">{upperFirstLetter(name)}</h2>
            <div className='flex items-center justify-between text-sm text-infoVideo'>
              <div className='flex items-center '>
                <p>{nbrView} Vues</p>

                <Separateur />

                <div className='flex items-center'><IoMdThumbsUp className="mr-1" /> {Math.ceil(rating)} %</div>

                <Separateur />

                <div>Il y a {date}</div>

              </div>

              <div className='flex items-center gap-1 text-xl'>
                <button role="button" className='flex items-center hover:text-blue-500 duration-300'> <IoMdThumbsUp className="mr-1" />{like}</button>
                <Separateur />
                <button role="button" className='flex items-center hover:text-red-500 duration-300'> <IoMdThumbsDown className="mr-1" />{dislike}</button>
                <Separateur />
                <button role="button" className='flex items-center hover:text-red-700 duration-300'> <FaFlag className="mr-2" />Repport</button>
              </div>
            </div>

            <div className='w-full border-b-2 opacity-10 border-red-50 my-3'></div>

            <div className='w-full min-h-[100px] flex flex-col'>
              <div className='flex justify-start'>

                <Link href={'/channel/' + chaine} className=' hover:text-red-500 px-2 mx-2 flex flex-col justify-center items-center hover:bg-bgTimeVideo hover:cursor-pointer rounded-xl'>
                  <h3 className='text-[25px] text-center'>{upperFirstLetter(chaine)}</h3>
                  <p className='text-dessous text-xs mb-[5px] mt-2'>{dataNbrVideo} Videos</p>
                </Link>

                <div className='flex-1 w-full max-h-[107px] overflow-hidden '>
                  <p className='text-dessous text-[15px] mb-[5px]'>Pornstars</p>
                  {acteurs.map((actor, id) => (
                    actor && <Link href={'/pornstar/' + actor} key={id} className='bg-bgTimeVideo hover:bg-midnight text-dessous rounded-lg text-sm py-2 px-[18px] mr-1 inline-block  mb-1'>
                      {upperFirstLetter(actor)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='w-full border-b-2 opacity-10 border-red-50 my-3'></div>

              <div>
                <p className='text-dessous text-[15px] mb-[5px]'>Categories</p>
                {tags.map((categorie: string, id: React.Key) => (
                  categorie && <Link href={'/categorie/' + categorie} key={id} className='bg-bgTimeVideo hover:bg-midnight text-dessous rounded-lg text-sm py-2 px-[18px] mr-1 inline-block  mb-1'>
                    {upperFirstLetter(categorie)}
                  </Link>
                ))}
              </div>
            </div>

            <div className='w-full border-b-2 opacity-10 border-red-50 my-3'></div>

            <div className='grid justify-center grid-cols-3 gap-y-[15px] gap-x-[25px]'>
              {dataMoreVideo.slice(0, 9).map((video: any, id: number) =>
                <VideoPresentation key={id}
                  video={video}
                  id={video.id}
                  title={video.title}
                  url={video.imgUrl}
                  chaine={video.chanelle}
                  time={video.time}
                  view={video.nbrView}
                  like={video.likeVideo}
                  dislike={video.dislikeVideo}
                />
              )}
            </div>
          </div>

        </div>
        <div className='max-w-[25%] flex flex-col justify-between bg-green-500 w-full'>
          <h2 className='text-center font-extrabold'>Pubed</h2>
        </div>
      </div>
    </div>
  )
}