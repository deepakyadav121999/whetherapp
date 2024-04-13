import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, InputField, SearchButton, Loading } from './StyledComponents';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;

  @media (min-width: 768px) {
    width: auto;
    min-width: 180px;
  }
`;

const StyledHeading = styled.h1`
  text-align: center;
  background-color: #3f51b5;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const StyledDescription = styled.p`
  text-align: center;
`;

function CitiesTable() {
  const [cities, setCities] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const StyledHeading = styled.h1`
  text-align: center;
  background-color: #3f51b5;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  min-width: 238px; 
  display: inline-block;

  @media (max-width: 768px) {
    width: auto; 
  }
`;

  const api = async (page) => {
    setLoading(true);
    const offset = (page - 1) * 20;
    const limit = 100; 
    let data = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&refine=cou_name_en%3A%22India%22&offset=${offset}`);
    let response = await data.json();
    setCities(prevCities => [...prevCities, ...response.results]);
    setLoading(false);
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    api(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCity = () => {
    setShowCities(!showCities);
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = cities.filter(city => city.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredCities(filtered);
 
    setSuggestions(filtered.map(city => city.name));
  };

  const handleAutocomplete = (selectedTerm) => {
    setSearchTerm(selectedTerm);
    setFilteredCities(cities.filter(city => city.name.toLowerCase().includes(selectedTerm.toLowerCase())));
    setSuggestions([]); 
  };


  return (
    <Container>
      <StyledHeading>Weather.com</StyledHeading>
    
      <h1>Search by City Name</h1>
      <div className="input-field">
        <InputField
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ minWidth: "200px", width: '90%' }}
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleAutocomplete(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <Link to={`/weather/${searchTerm}`} style={{ textDecoration: 'none' }}>
          <SearchButton>Search</SearchButton>
        </Link>
        <h1>Or Select City</h1>
      </div>
      <StyledSelect onClick={handleSelectCity} style={{ minWidth: '220px', width: '94%' }}>
        <option>Select City</option>
      </StyledSelect>
      {showCities && (
        <Table>
          <thead>
            <tr>
              <th>City Name</th>
              <th>Country</th>
              <th>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {cities.map(city => (
              <tr key={city.geoname_id}>
                <td>
                  <Link to={`/weather/${city.name}`}>
                    {city.name}
                  </Link>
                </td>
                <td>{city.cou_name_en}</td>
                <td>{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {loading && <Loading>Loading...</Loading>}
    </Container>
  );
}

export default CitiesTable;
