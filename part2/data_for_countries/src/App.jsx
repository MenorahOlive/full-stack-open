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
