import Link from 'next/link'
import React from 'react'
import { IoMdThumbsUp } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { upperFirstLetter } from './Utils';

export default function VideoPresentation({ id, title, url, chaine, time, view, like, dislike }: any) {
    const rating = ((100 * like) / (like + dislike)) ? (100 * like) / (like + dislike) : 0;
    const chanelle = JSON.parse(chaine)[0]
    return (
        <div className="group self-stretch overflow-hidden">
            <Link href={'/videos/' + id + "?name=" + title} className=' relative aspect-video overflow-hidden rounded-xl block'>
                <img className=" object-cover w-full h-[193px] sm:transition-transform sm:duration-[400ms] sm:ease-in-out sm:group-hover:scale-105"
                    alt={title}
                    loading="lazy" width="800" height="337" decoding="async" data-nimg="1" src={url} />
                <div className="text-xs absolute right-[6px] bottom-[6px] w-[32px] h-[15px] bg-bgTimeVideo opacity-80 text-timeVideo hover:text-white">
                    <p>{time}</p>
                </div>
            </Link>

            <div className="flex justify-between text-sm text-infoVideo w-full">
                <Link href={'/chanelle/' + chanelle} className="hover:text-white w-full text-ellipsis overflow-hidden max-h-5">{upperFirstLetter(chanelle)}</Link>
                <div className="flex items-center">
                    <IoEyeSharp className="mr-[2px] text-grey-500" />
                    <p className="mr-2 hover:cursor-auto">{view}</p>
                    <IoMdThumbsUp className="mr-[2px] text-grey-500" />
                    <p className="hover:cursor-auto">{rating}%</p>
                </div>
            </div>

            <Link href={'/videos/' + id + "?name=" + title}>
                <h3 className="text-timeVideo group-hover:text-white text-[16px] font-[600] leading-5 tracking-wide mt-1 break-words max-h-10
                ">{title}</h3>
            </Link>
        </div>
    )
}