import {AiOutlineSearch} from 'react-icons/ai'
import requests from '../assets/Requests';
import { useState, useCallback, useEffect } from 'react';

const Search = ({showInputSearch, setShowInputSearch}) => { 

    const [allData, setAllData] = useState(null)
    const [allResultsData, setAllResultsData] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [query, setQuery] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [makeSet, setSet] = useState([])
 
    const fetchAllData = useCallback(() => {
        Promise.all([
            fetch(requests.trendingData),
            fetch(requests.popularData),
            fetch(requests.recentlyAdded),
        ])

        .then((responses => Promise.all(responses.map(response => response.json()))))
        .then((data => {
            setAllData(data)
            setAllResultsData(data.map(item => item.results).flat())
        }))
        .catch((err => console.log(err)))
    }, [])
    
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData])
    
    
    const handleSearch = (e) => {
        setQuery(e.target.value)    
    }

    useEffect(() => {
        if(query){
            setShowSearchResults(true)
        } else{
            setShowSearchResults(false)
        }
    }, [query])

   

    useEffect(() => {
        if(allResultsData){

            let uniqueData = [...new Set(allResultsData.map(item => JSON.stringify(item)))].map(str => JSON.parse(str));
            let filteringData = uniqueData.filter((item => {

                const englishTitle = item.title.english || '';
                const romajiTitle = item.title.romaji || '';
                const nativeTitle = item.title.native || '';
                return (
                    englishTitle.toLowerCase().includes(query.toLowerCase()) ||
                    romajiTitle.toLowerCase().includes(query.toLowerCase()) ||
                    nativeTitle.toLowerCase().includes(query.toLowerCase())
                ) 
            }))
    
            setFilteredData(filteringData)

        }
    }, [query, allResultsData])


    
    return(

        <div className={`flex items-center justify-end relative  w-[100%] h-1/2 ${showSearchResults ? '' : 'overflow-hidden'}`}>
            <input type="text"
            placeholder="Search an anime title..."
            className={!showInputSearch ? "opacity-0" : "opacity-1 w-full  h-full indent-2"} 
            style={showInputSearch ? {animation: '.4s linear showInput'} : {}}
            onChange={(e) => handleSearch(e)}
           />
            <li>
                <AiOutlineSearch 
                fontSize={'2.5rem'} color={'white'} 
                className={`hover:cursor-pointer w-[60px] h-[30px] ${!showInputSearch ? '' : 'bg-lightBlue'}`} 
                onClick={() => setShowInputSearch(!showInputSearch)}
                style={showInputSearch ? {position: 'absolute', top: 0, right: 0, width: '60px', height: '100%', animation: '.1s linear movingSearch'}: {}}
                />
            </li>
            {showSearchResults && filteredData && filteredData.length > 0?
                (
                <div style={{position: 'absolute', top: '100%'}}
                className="search-container text-white border border-solid border-lightBlue w-full min-h-fit max-h-[500px] overflow-auto bg-black/90">
                    {filteredData.map((data, index) => (
                    <div key={index} className='flex justify-center items-center my-5 sm:my-5'>
                        <div className='w-full flex h-[100px] justify-start items-center hover:bg-white/10 hover:cursor-pointer'>
                            <img src={data.image} alt="title image" className='w-[100px] h-full mx-5'/>
                            <p className='w-full'>{data.title.english ? (data.title.english.length > 30 ? data.title.english.slice(0, 50) + '...' : data.title.english) : data.title.romaji ? data.title.romaji :  data.title.native}</p>
                        </div>
                    </div>
                    ))}
                </div>
                )
                : showSearchResults ?
                (
                    <div style={{position: 'absolute', top: '100%'}}
                    className="search-container text-white border border-solid border-lightBlue w-full min-h-fit max-h-[500px] overflow-auto bg-black/90">
                    <p className='text-center my-5'>No results found.</p>
                    </div>
                ) : null
            }      
        </div>

    )

}

export default Search;