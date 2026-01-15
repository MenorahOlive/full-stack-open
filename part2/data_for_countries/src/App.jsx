import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="150" />
    </div>
  );
};

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value) {
      console.log("Fetching countries...");
      console.log(value);
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => setCountries(response.data));
    }
  }, [value]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <>
      find countries <input value={value} onChange={handleSearch} />
      {value === "" ? null : filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountryList countries={filteredCountries} />
      )}
    </>
  );
};

export default App;
