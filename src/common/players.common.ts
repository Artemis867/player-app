import axios from 'axios';

// Common function to fetch players from the API
export const fetchPlayers = async () => {
  const response = await axios.get('https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=persons');
  return response.data;
};

export const getPlayerDetail = async (playerId: string | undefined | null) => {
  try {
    const response = await axios.get(`https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=statistics/for/person/in/career/persons/${playerId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching player details: ', error);
  }
}

export const getPlayerDetailBySeason = async (playerId: string | undefined | null) => {

  try {
    const response = await axios.get(`https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=statistics/for/person/in/career/seasons/persons/${playerId}`);

    return response.data;
  } catch (error) {
    console.log('Error fetching player details by season: ', error);
  }
}

export const checkValidValue = (data: number | null | undefined) => {
  if (data == null || data == undefined) {
    return '-';
  }
  return data.toFixed(1);
};