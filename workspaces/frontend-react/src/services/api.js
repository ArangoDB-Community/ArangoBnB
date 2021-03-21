import axios from 'axios';
import config from 'config';

const search = async ({ destination, date, nights, travelers }) => {
  console.log('search', { destination, date, nights, travelers });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1500);
  });
};

const autocomplete = async ({ term }) => {
  const { data } = await axios.get(`${config.api.url}/api/neighborhood/search`, {
    params: { query: term },
  });

  return data;
};

const searchNeighborhood = async (latLng) => {
  const { data } = await axios.get(`${config.api.url}/api/neighborhood`, {
    params: {
      lat: latLng[0],
      lng: latLng[1],
    },
  });

  return data;
};

const api = { search, autocomplete, searchNeighborhood };

export default api;
