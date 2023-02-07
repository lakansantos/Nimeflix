
import React, { useCallback, useState, useEffect, useRef} from "react";
import SkeletonTemplate from "./SkeletonTemplate";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from 'react-icons/hi'
import { border, width } from "@mui/system";

const Rows = ({title, fetchURL}) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')

    const fetchData = useCallback(() => {
        fetch(fetchURL)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => setError(err))
            
    }, [])

    useEffect(() => {

        fetchData()
       
    }, [fetchData])
    
    const containerRef = useRef(null);
    useEffect(() => {
        if(containerRef.current){
            containerRef.current.scrollLeft += 750;
        }
    }, [containerRef])

        return data ? (
            <div className="Rows h-fit w-full py-10 relative">
                <h1 className="text-white text-4xl my-4 ">{title}</h1>
                <button 
                className="text-white bg-gray-800/80 px-5 py-2 rounded absolute top-auto z-50  bottom-auto h-96 w-auto left-0 flex justify-start items-center"
                onClick={() => {
                    if(containerRef.current){
                        containerRef.current.scrollLeft -= 750;
                    }       
                }}>
                    <HiOutlineChevronLeft  style={{fontSize: '50px', float: 'left'}}/>
                </button>
                <button 
                className="text-white bg-gray-800/80 px-5 py-2 rounded absolute top-auto z-50  bottom-auto h-96 w-auto right-0 flex justify-start items-center"
                onClick={() => {
                    if(containerRef.current){
                        containerRef.current.scrollLeft += 750;
                    }       
                }}>
                    <HiOutlineChevronRight  style={{fontSize: '50px', float: 'left'}}/>
                </button>
                <div className="img-container h-fit w-full flex flex-row gap-5 overflow-auto max-h-5xl relative" ref={containerRef} style={{scrollBehavior: 'smooth',}}>
               
                {data.results.map(result => (
                    <div className="w-full h-fit " key={result.id}>
                        <img src={result.image} alt="" className="w-64 h-96 hover:cursor-pointer hover:scale-110 duration-700"/>
                        <div>
                            <p className="w-64 text-center text-white">{result.title.english  ? result.title.english : result.title.romaji}</p>
                        </div>
                    </div>                      
                ))};
                </div>
            </div>
        ) : (
            <div className="Rows h-96 w-full mt-20  flex flex-row gap-5">
                <SkeletonTemplate />
            </div>
        )

}



export default Rows;
