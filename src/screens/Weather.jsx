import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {options, options_two} from '../apiService'
const Weather = () => {
    const [city, setCity] = useState('');
    const [data, setData] = useState([])
    const handleChange = (e) => {
        setCity(e.target.value)
    }


        const fetch3 = async (city) =>{
            try {
                let url = `https://open-weather13.p.rapidapi.com/city/${city}`;
                const response = await axios.get(url, options);
                console.log(response.data);

                let lat = response.data.coord.lat
                let lon = response.data.coord.lon


                let url_two = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`

                const response2 = await axios.get(url_two, options_two);
                console.log(response2.data);

                let arr = response2.data.list

                await setData(arr.slice(0,5))

            } catch (error) {
                console.error(error);
            }   
        }


        const fetchData = (city) => {

            let url = `https://open-weather13.p.rapidapi.com/city/${city}`;

            fetch(url, options)
                .then(response => {
                     return response.json();
                })
                .then(res =>{
                    console.log(res)
                    return {
                        lat : res.coord.lat,
                        lon : res.coord.lon 
                    }
                })
                .then(data => {
                    console.log('TURRRRRR', data)
                    let lat = data.lat;
                    let lon = data.lon;
                    let url_two = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`

                    return fetch(url_two, options_two)
                })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log('FFFFFFFFFF', data)

                    let arr = data.list.slice(0,5)

                    console.log('OKOKOKOK',arr)

                    setData(arr)

                })
        }

        const handleSearch = () => {
            fetchData(city)
        }
        console.log(data, 'LKJHGFF')
    return (
    <div>
        <h1>Weather in Your City</h1>

        <input 
            value={city}
            onChange={handleChange}

        />
        <button onClick ={handleSearch}>Search</button>

        {data.map(item => {
            return(

                <>
                <div style={{
                    border:'2px solid black',
                    width:'200px'
                }}>
                    <h2>{item.dt_txt}</h2>
                    <p><span>Temp-min</span>- <span>{item.main.temp_min}</span></p>
                    <p><span>Temp-max</span>- <span>{item.main.temp_max}</span></p>


                </div>
                </>
            )
        })}

    </div>
    )
}

export default Weather