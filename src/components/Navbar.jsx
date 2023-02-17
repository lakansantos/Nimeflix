import React from "react";
import { useEffect, useState} from "react";
import Search from "./Search";
const Navbar = () => {

    const [showNav, setShowNav] = useState(false)
    const [showInputSearch, setShowInputSearch] = useState(false)
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
        <nav className={`h-fit w-full flex flex-row justify-between  fixed z-[100] ${showNav ? 'bg-black/90': 'bg-none'} duration-700`}>
            <a href="/"><img src="/Nimeflix logo.png" alt="Nimeflix"  className="p-2 ml-4 sm:ml-5 hover:cursor-pointer  h-[60px] w-[60px] sm:h-[70px] sm:w-[65px]"/></a>
            <ul className={`flex flex-row gap-5 items-center mr-1 sm:mr-0 w-[80%] sm:w-[30%] sm:max-xl:w-[70%]`}>
                <Search  setShowInputSearch={setShowInputSearch} showInputSearch={showInputSearch}/>  
                <li><img src="/avatar.png" alt="avatar-icon" className="w-[70px] h-[55px]"/></li>
            </ul>
        </nav>
    )
}


export default Navbar;