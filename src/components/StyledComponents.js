
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

export const InputField = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  width: calc(100% - 100px);
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Select = styled.select`
  padding: 12px;
  margin-bottom: 10px;
`;

export const WeatherDetails = styled.div`
  margin-top: 20px;
`;

export const WeatherInfo = styled.div`
  margin-bottom: 10px;
`;

export const Loading = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;
  
