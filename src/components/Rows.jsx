
import React, { useCallback, useState, useEffect, useRef} from "react";
import SkeletonTemplate from "./SkeletonTemplate";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from 'react-icons/hi'


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
    const [rightButtonClicked, setRightButtonClicked] = useState(false)
    const [getScrollLeft, setScrollLeft] = useState(0)

    useEffect(() => {
        if(containerRef.current){
            setScrollLeft(containerRef.current.scrollLeft += 750);
        } 
    }, [containerRef])



    return data ? (
        <div className="Rows h-fit  w-full py-10 relative ">
            <h1 className="text-white text-4xl my-4 ">{title}</h1>
            {rightButtonClicked && getScrollLeft > 0? 
                <button 
                className="text-white bg-gray-800/80 px-5 py-2 rounded absolute top-auto z-50  bottom-auto h-96 w-auto left-0 flex justify-start items-center opacity-0 hover:opacity-100 duration-700 max-md:hidden"
                onClick={() => {
                    if(containerRef.current){
                        setScrollLeft(containerRef.current.scrollLeft -= 750);
                    } 
                }}>
                    <HiOutlineChevronLeft  style={{fontSize: '50px', float: 'left'}}/>
                </button> 
                : null
            }

            <button 
            className="text-white bg-gray-800/80 px-5 py-2 rounded absolute top-auto z-50  bottom-auto h-96 w-auto right-0 flex justify-start items-center opacity-0 hover:opacity-100 duration-700 max-md:hidden"
            onClick={() => {    

                setRightButtonClicked(true)
                if(containerRef.current){
                    setScrollLeft(containerRef.current.scrollLeft += 750);
                }    
            }}>
                <HiOutlineChevronRight  style={{fontSize: '50px', float: 'left'}}/>
            </button>
            <div className="img-container  h-[500px] w-full flex  flex-row gap-5 overflow-auto max-h-5xl relative" ref={containerRef} style={{scrollBehavior: 'smooth',}}>
           
            {data ? data.results.map((result, key)=> (
                <div className="w-full h-fit hover:scale-110 duration-700" key={key}>
                    <img src={result.image} alt="" className="w-64 h-96  filter-none hover:cursor-pointer hover:grayscale"/>
                    <div>
                        <p className="w-64 text-center text-white">{result.title.english ? (result.title.english.length > 50 ? result.title.english.slice(0, 50) + '...' : result.title.english) : result.title.romaji}</p>
                    </div>
                </div>                      
            )): 'No data available'};
            </div>
        </div>
    ) : (
        <div className="Skeleton-container h-96 w-full mt-0 sm:mt-20 overflow-auto flex flex-row gap-[70px] sm:gap-5">
            <SkeletonTemplate />
        </div>
        )

}



export default Rows;
