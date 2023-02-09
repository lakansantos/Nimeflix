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

    let resultsData = []

    if(data){
        // let getCoverImages = data.results.map(result => result.cover)
        let getResults = data.results.map(result => result)

        for(let i = 0; i < getResults.length; i++){
            resultsData.push(getResults[i])
        }

        console.log(resultsData)
    }
    

    useEffect(() => {

        const intervalId = setInterval(() => {
            changeIndex(currentIndex + 1);
        }, 15000);

        if(currentIndex >= resultsData.length){
            changeIndex(0)
        }

        return () => clearInterval(intervalId)
    }, [currentIndex])



    return data ?(
        <div 
        className="banner" 
        style={{
            background: `url(${resultsData[currentIndex].cover}) center/cover no-repeat rgba(0,0,0, .6)`,
            backgroundBlendMode: 'multiply'
        }
        }>
            <Navbar />
            <h1>This is a banner</h1>
            <p className="text-white">{resultsData[currentIndex].title.english}</p>
            <p className="text-white">{resultsData[currentIndex].description}</p>
        </div>
        
    ) : (
        <div className="banner flex justify-center items-center flex-col">
            <div className="loading"></div>
        </div>  
    )
}


export default Banner;
