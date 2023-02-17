import {AiOutlineSearch} from 'react-icons/ai'
import requests from '../assets/Requests';
import { useState, useCallback, useEffect } from 'react';

const Search = ({showInputSearch, setShowInputSearch}) => { 

    const [allData, setAllData] = useState(null)

    const fetchData = useCallback(() => {
        Promise.all([
            fetch(requests.popularData),
            fetch(requests.trendingData),
            fetch(requests.recentlyAdded)
        ])
        .then(responses => Promise.all(responses.map((response => response.json()))))
        .then(data => setAllData(data))
        .catch(err => console.log(err));

    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])
    
    console.log(allData)
    
    return(
        <div className={"flex items-center justify-end relative overflow-hidden w-[100%] h-1/2"}>
        <input type="text"
        placeholder="Search a movie, a title, genre..."
        className={!showInputSearch ? "opacity-0" : "opacity-1 w-full  h-[60px] indent-2"} 
        style={showInputSearch ? {animation: '.4s linear showInput'} : {}}/>
        <li>
            <AiOutlineSearch 
            fontSize={'2.5rem'} color={'white'} 
            className={`hover:cursor-pointer w-[60px] h-[30px] ${!showInputSearch ? '' : 'bg-lightBlue'}`} 
            onClick={() => setShowInputSearch(!showInputSearch)}
            style={showInputSearch ? {position: 'absolute', top: 0, right: 0, width: '60px', height: '100%', animation: '.1s linear movingSearch'}: {}}
            />
        </li>
    </div>
    )

}

export default Search;