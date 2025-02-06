import axios from 'axios';

// Common function to fetch players from the API
export const fetchPlayers = async () => {
  const response = await axios.get('https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=persons&limit=30');
  return response.data;
};

export const getPlayerDetail = async () => {
  // 001c1bc8-bb4b-11ed-ba49-a3d5631247df$ // Hardcoded ID for testing

  const response = await axios.get(`https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=statistics/for/person/in/career/persons/004c8999-bb4b-11ed-ae4f-714b42d1feff`);
  return response.data;
}

export const getPlayerDetailBySeason = async () => {

  const response = await axios.get(`https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=statistics/for/person/in/career/seasons/persons/004c8999-bb4b-11ed-ae4f-714b42d1feff`);
  return response.data;
}

export const getSeasonDate = async () => {
  const response = await axios.get(`https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=seasons/111f8f44-70a7-11ed-aae6-2d98d9fac4b4`);
  return response.data;
}