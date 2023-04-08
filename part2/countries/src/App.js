import React, { useState, useEffect } from 'react';
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow,setCountriesToShow] =useState([])
  const [filter, setFilter] = useState("")


  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  const handleSearchChange = (event) => {
    setFilter(event.target.value)
    setCountriesToShow(
        countries.filter((country) =>
            country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        )
    )
  }

  return (
      <div>
        <h1>Country Data</h1>
        <div>
          Find countries <input value={filter} onChange={handleSearchChange} />
        </div>

        {countriesToShow.length > 10 ? (
            <div>Too many matches, specify another filter</div>
        ) : (
            <Countries
                countriesToShow={countriesToShow}
                setCountriesToShow={setCountriesToShow}
            />
        )}
      </div>
  );
}

export default App;
