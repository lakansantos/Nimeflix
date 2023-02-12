import React from "react";
import {AiOutlineSearch} from 'react-icons/ai'
import { useEffect, useState} from "react";
const Navbar = () => {

    const [showNav, setShowNav] = useState(false)
    useEffect(() => {
        const handleShow = () => {
            if(window.scrollY > 70){
                setShowNav(true)
            } else {
                setShowNav(false)
            };

        } 
        window.addEventListener('scroll', handleShow)
        return() => window.removeEventListener('scroll', handleShow)
    }, [])
    return (
        <nav className={`h-fit w-full flex flex-row justify-between fixed z-[100] ${showNav ? 'bg-black/90': 'bg-none'} duration-700`}>
            <a href="/"><img src="/Nimeflix logo.png" alt="Nimeflix"  className="p-2 ml-4 sm:ml-5 hover:cursor-pointer  h-[60px] w-[60px] sm:h-[70px] sm:w-[65px]"/></a>
            <ul className="flex flex-row justify-evenly items-center w-1/4 sm:w-[10%] mr-1 sm:mr-0">
                <li><AiOutlineSearch fontSize={'2.5rem'} color={'white'} className="hover:cursor-pointer"/></li>
                <li><img src="/avatar.png" alt="avatar-icon" className="w-60px h-[55px]"/></li>
            </ul>
        </nav>
    )
}


export default Navbar;