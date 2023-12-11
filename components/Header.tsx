"use client";

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react';
import Separateur from './Separateur'
import { IoSearch } from "react-icons/io5";
import { DroptownMenu } from './DroptownSearchBar';
import { Modal } from './Modal';
import { RxCross2 } from 'react-icons/rx';

export function Header() {
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const [search, setSearch] = useState('');
    const [valueMenu, setValueMenu] = useState("videos");
    const [burgerMenu, setBurgerMenu] = useState(false);

    function searchStart() {
        openSearchBar ? setOpenSearchBar(false) : setOpenSearchBar(true)
        console.log("test")
    }

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

    return (
        <header className='w-full z-50 bg-midnight px-8 py-4 fixed'>
            <nav className="flex flex-row items-center justify-between m-auto w-full max-w-[1600px] gap-5">

                {/* Left Part of Header */}
                <div className='flex gap-2'>
                    <Link href="/" className="flex items-center gap-2w-fit lg:text-2xl text-xl min-w-[155px] lg:min-w-[186px]">
                        The Perfect <span className='text-pink-300'>Porn</span>
                    </Link>

                    <Separateur />
                </div>

                {/* Center Part of Header */}
                <div className='flex'>
                    <div className='flex gap-4 items-center flex-1 max-w-[530px]'>
                        <div className='bg-gray-700 flex items-center justify-center max-w-[340px] rounded-full hover:bg-gray-600 hover:cursor-pointer' onClick={searchStart}>
                            <div className='hidden md:block md:w-[220px] lg:w-[340px]'>
                                <div className='flex h-10 flex-row items-center space-x-2 px-3'>
                                    <IoSearch id="b" className="w-5 h-5 text-white" />

                                    <div className="text-[14px] font-[600] leading-[18px] tracking-[0.1px] flex-grow text-alt2">{!search ? "Search " + valueMenu + " ..." : search} </div>

                                    <div className="text-[14px] font-[400] leading-[20px] tracking-[0] text-alt2">Ctrl+K</div>
                                </div>
                            </div>

                        </div>
                        by
                        <DroptownMenu valueMenu={valueMenu} setValueMenu={setValueMenu} />
                    </div>

                </div>

                <div className='hd:min-w-[210px] flex justify-end items-center gap-2 relative'>
                    <button role='button' type='button' className='hd:inline hidden rounded-full bg-slate-50 text-gray-700 px-[18px] min-h-10 h-10 w-auto text-sm hover:bg-slate-200'>Sign Up</button>
                    <button role='button' type='button' className='hd:inline hidden rounded-full bg-gray-700 text-slate-50 px-[18px] min-h-10 h-10 w-auto text-sm hover:bg-gray-600'>Log in</button>

                    <Separateur />

                    <div ref={ref} className='relative flex flex-col'>
                        <button type="button" className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-600 bg-gray-700"
                            onClick={() => setBurgerMenu((val) => !val)}>
                            {!burgerMenu ?
                                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                :
                                <RxCross2 className="w-6 h-6" />
                            }
                        </button>

                        {burgerMenu && (
                            // shadow-[0px_4px_6px_#00ffff,0px_2px_22px_#00ffff0f]
                            <div className="
                            shadow-[0px_4px_6px_#0f131a99,0px_2px_22px_#FFFFF0f]
                            bg-[#1b1f24] text-[#f5f5f5] absolute -right-2 top-12 flex origin-bottom-right flex-col rounded-2xl border border-[#292C33] bg-alt shadow-bellowMedium ">
                                <div className=' flex flex-col justify-between z-20 items-center space-y-1px p-[7px]'>
                                    <Link onClick={() => setBurgerMenu(false)} href={"/channel"} className='whitespace-nowrap rounded flex h-8 w-full items-center p-2 hover:bg-[#292c33]'>Channels</Link>
                                    <Link onClick={() => setBurgerMenu(false)} href={"/pornstar"} className='whitespace-nowrap rounded flex h-8 w-full items-center p-2 hover:bg-[#292c33]'>Pornstars</Link>
                                    <Link onClick={() => setBurgerMenu(false)} href={"/categorie"} className='whitespace-nowrap rounded flex h-8 w-full items-center p-2 hover:bg-[#292c33]'>Categories</Link>
                                    <Link onClick={() => setBurgerMenu(false)} href={"/videos/random"} className='whitespace-nowrap rounded flex h-8 w-full items-center p-2 hover:bg-[#292c33]'>Random Video</Link>
                                </div>
                                <div className='hd:hidden flex flex-row justify-between  space-x-2 items-center border-t border-[#292C33] p-2'>
                                    <button role='button' type='button' className='whitespace-nowrap rounded-full bg-[#eff0f1] text-gray-700 px-[18px] min-h-10 h-10 w-auto text-sm hover:bg-[#dfe0e0]'>Sign Up</button>
                                    <button role='button' type='button' className='whitespace-nowrap rounded-full bg-[#2f333b] text-slate-50 px-[18px] min-h-10 h-10 w-auto text-sm hover:bg-[#383b44]'>Log in</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Modal search={search} setOpenSearchBar={setOpenSearchBar} setSearch={setSearch} openSearchBar={openSearchBar} valueMenu={valueMenu} setValueMenu={setValueMenu} />
            </nav>
        </header >
    )
}

export default Header