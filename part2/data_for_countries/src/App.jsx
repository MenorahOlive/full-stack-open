import { useState, useEffect } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country.capitalInfo || !country.capitalInfo.latlng) {
      return;
    }

    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} width="150" />

      <h2>Weather in {country.capital[0]}</h2>

      {weather && (
        <>
          <p>Temperature {weather.main.temp} C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
            width="50"
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

const CountryList = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearch = (event) => {
    setValue(event.target.value);
    setSelected(null);
  };

  useEffect(() => {
    if (value) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => setCountries(response.data));
    }
  }, [value]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  const handleShow = (name) => {
    const findCountry = countries.find(
      (country) => country.name.common === name
    );
    setSelected(findCountry);
  };

  return (
    <>
      find countries <input value={value} onChange={handleSearch} />
      {value === "" ? null : selected ? (
        <CountryDetails country={selected} />
      ) : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountryList countries={filteredCountries} handleShow={handleShow} />
      )}
    </>
  );
};

export default App;
