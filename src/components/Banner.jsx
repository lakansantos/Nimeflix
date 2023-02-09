import React from "react";
import Navbar from "./Navbar";
import requests from "../assets/Requests";
import { useState, useEffect, useCallback } from "react";
const Banner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    let [currentIndex, changeIndex] = useState(0)
    const fetchTrending = useCallback(() => {
        fetch(requests.popularData)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
            console.log(data)
    }, [])

    useEffect(() => {

        fetchTrending();
    }, [fetchTrending])

    let coverImages = []

    if(data){
        let getCoverImages = data.results.map(result => result.cover)

        for(let i = 0; i < getCoverImages.length; i++){
            coverImages.push(getCoverImages[i])
        }
    }
    

    useEffect(() => {

        const intervalId = setInterval(() => {
            changeIndex(currentIndex + 1);
        }, 2000);

        if(currentIndex >= coverImages.length){
            changeIndex(0)
        }

        return () => clearInterval(intervalId)
    }, [currentIndex])


 



    return data ?(
        <div 
        className="banner" 
        style={{
                background: `url(${coverImages[currentIndex]}) center/cover no-repeat`,
        }
    }>
        <Navbar />
        <h1>This is a banner</h1>
        <p>Movie Title</p>
        <p>Movie description</p>
    </div>
    ) : (
        <div className="banner flex justify-center items-center flex-col">
            <div className="loading"></div>
        </div>  
    )
}


export default Banner;
