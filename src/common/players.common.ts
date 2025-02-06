import axios from 'axios';

const API_URL = 'https://test.services.nbl.com.au/api_cache/nbl1/synergy?format=true&route=';

// Common function to fetch players from the API
export const fetchPlayers = async () => {
  const response = await axios.get(`${API_URL}persons`);
  return response.data;
};

// Common function to fetch player details from the API
// @param playerId: string | undefined | null
export const getPlayerDetail = async (playerId: string | undefined | null) => {
  try {
    const response = await axios.get(`${API_URL}statistics/for/person/in/career/persons/${playerId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching player details: ', error);
  }
}

// Common function to fetch player details by season from the API
// @param playerId: string | undefined | null
export const getPlayerDetailBySeason = async (playerId: string | undefined | null) => {
  try {
    const response = await axios.get(`${API_URL}statistics/for/person/in/career/seasons/persons/${playerId}`);

    return response.data;
  } catch (error) {
    console.log('Error fetching player details by season: ', error);
  }
}

// Common function to get season range from the API
// @param urls: []
export const getSeasonRange = async (urls: string[]) => {
  const promises = urls.map((url: string) => fetch(url).then(res => res.json()));
  const results = await Promise.all(promises);
  const range = [...results].map(result =>  `${result.data[0].added.substring(0, 4)} - ${result.data[0].endDate.substring(0, 4)}`);
  return range;
}

// Common function to check if the value is valid
// @param data: number | null | undefined
export const checkValidValue = (data: number | null | undefined) => {
  if (data == null || data == undefined) {
    return '-';
  }
  return data.toFixed(1);
};