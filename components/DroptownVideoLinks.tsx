"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5'
import { upperFirstLetter } from './Utils';

interface Props {
    video: Array<string>
    setPlayer: Dispatch<SetStateAction<number>>
}

// DropDown for video page where many link for one video

export default function DropDown(props: Props) {

    const [burgerMenu, setBurgerMenu] = useState(false);
    const [valueMenu, setValueMenu] = useState('stream n°1');

    const setPlayer = props.setPlayer
    const video = props.video
    const ref = useRef(null);

    useEffect(() => {
        const handleOutSideClick = (event: any) => {
            const elementPrincipale: any = ref.current
            if (!elementPrincipale.contains(event.target)) {
                setBurgerMenu(false)
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    function burgerMenuClick(e: any) {
        setValueMenu(e.target.innerText.replace("<h3>", "").replace("</h3>", "").toLowerCase())
        setPlayer(parseInt(e.target.innerText.replace(/\D/g, '')) - 1)
        setBurgerMenu(false)
    }

    function createStreamArray(size: number) {
        const streamArray = [];
        for (let i = 1; i <= size; i++) { streamArray.push(`stream n°${i}`); }
        return streamArray;
    }

    let list = createStreamArray(video.length);
    list = list.filter(list => list !== valueMenu);

    return (
        <div ref={ref} className='relative flex flex-col z-10 w-fit'>
            <button type="button" className="
            relative flex items-center justify-center h-10 w-full p-2 min-w-[110px] gap-3 rounded-xl hover:bg-gray-600 bg-gray-700 border-transparent border-2 hover:border-white"
                onClick={() => setBurgerMenu((val) => !val)}>
                <h3>{upperFirstLetter(valueMenu)}</h3>
                {burgerMenu ? (<IoCaretUpSharp />) : (<IoCaretDownSharp className="" />)}
            </button>

            {burgerMenu && (
                <div className="min-w-full
                absolute  top-[42px] flex origin-bottom-right flex-col rounded-2xl
                shadow-[0px_4px_6px_#0f131a99,0px_2px_22px_#FFFFF0f] bg-[#1b1f24] text-[#f5f5f5] border-x-2 border-y-[1px] border-[#292C33]">
                    <div className=' flex flex-col justify-between items-center space-y-1px p-[7px]'>
                        {list.map((name, id) => (
                            <p key={id} onClick={(e) => burgerMenuClick(e)} className='whitespace-nowrap rounded flex h-8 w-full items-center p-2 hover:bg-[#292c33] hover:cursor-pointer'>{upperFirstLetter(name)}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}