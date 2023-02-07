
import React, { useCallback, useState, useEffect, useRef} from "react";
import SkeletonTemplate from "./SkeletonTemplate";

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
            <div className="Rows h-full w-full py-10">
                <h1 className="text-white text-4xl my-4">{title}</h1>
                <div className="img-container h-fit w-full flex flex-row gap-5 overflow-auto" ref={containerRef} style={{scrollBehavior: 'smooth',}}>
                {data.results.map(result => (
                    <div className="w-full h-full hover:scale-110 duration-700" key={result.id}>
                        <img src={result.image} alt="" className="w-64 h-96 hover:cursor-pointer "/>
                        <div>
                            <p className="w-64 text-center text-white">{result.title.english ? result.title.english: result.title.romaji}</p>
                        </div>
                    </div>                      
                ))};
                </div>
                <button 
                className="mt-5 text-white bg-gray-800 px-5 py-2 rounded"
                onClick={() => {
                    if(containerRef.current){
                        containerRef.current.scrollLeft -= 750;
                    }       
                }}>
                    Scroll Left
                </button>
                <button 
                className="mt-5 text-white bg-gray-800 px-5 py-2 rounded"
                onClick={() => {
                    if(containerRef.current){
                        containerRef.current.scrollLeft += 750;
                    }       
                }}>
                    Scroll Right
                </button>
            </div>
        ) : (
            <div className="Rows h-96 w-full mt-20  flex flex-row gap-5">
                <SkeletonTemplate />
            </div>
        )

}



export default Rows;
