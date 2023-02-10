import React from "react";
import {AiOutlineSearch} from 'react-icons/ai'
const Navbar = () => {

    return (
        <nav className="h-fit w-full flex flex-row justify-between fixed z-[100] bg-black/70">
            <img src="/src/img/Nimeflix logo.png" alt="Nimeflix"  className="p-2 ml-4 sm:ml-5 hover:cursor-pointer  h-[60px] w-[60px] sm:h-[70px] sm:w-[70px]"/>
            <ul className="flex flex-row justify-evenly items-center w-1/4 sm:w-[10%] mr-3 sm:mr-0">
                <li><AiOutlineSearch fontSize={'2.5rem'} color={'white'}/></li>
                <li><img src="/src/img/avatar.png" alt="avatar-icon" className="w-60px h-[55px]"/></li>
            </ul>
        </nav>
    )
}


export default Navbar;