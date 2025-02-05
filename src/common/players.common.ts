import axios from 'axios';

// Common function to fetch players from the API
export const fetchPlayers = async () => {
  const response = await axios.get('https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=persons&limit=30');
  return response.data;
};