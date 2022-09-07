import axios from 'axios';
import { APIKEY as appid } from '@/api/constants';

const weatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    appid,
  },
});

export { weatherInstance as Http };
