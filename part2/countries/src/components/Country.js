import { useEffect, useState } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({capital}) => {
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`
    const [temp, setTemp] = useState([])
    const [wind, setWind] = useState([])
    const [img,setImg] = useState([])


    useEffect(() => {
        axios
            .get(
                weather_url
            )
            .then((response) => {
                setTemp(response.data.main.temp)
                setWind(response.data.wind.speed)
                setImg(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)






            })
    }, [weather_url])
    return(
        <div>
            <h2>Weather in {capital}</h2>
            <div>Temperature {temp} Celcius</div>
            <img src={img} alt={""}/>
            <div>Wind {wind} m/s</div>

        </div>
    )
}

const Country = ({country}) => {

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital {country.capital}</div>
            <div>Area: {country.area} km^2</div>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map((lang) => (
                    <li key={lang}>{lang}</li>

                    ))}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />

            <Weather capital={country.capital} />


        </div>
    );
};

export default Country;
