import React from 'react';
import { BrowserRouter ,Routes, Route,} from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <div>
         <Routes>
          <Route path="/" element={<CitiesTable/>} />
          <Route path="/weather/:cityName" element={<WeatherPage/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
