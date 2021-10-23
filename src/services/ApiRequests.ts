import _ from 'lodash';
import { Weather, WeatherLocation } from '../model/Weather';

const server = 'http://boiling-basin-64361.herokuapp.com';
//const server = window.location.host

async function searchLocation(term: string): Promise<WeatherLocation | undefined> {

  const result = await fetch(`${server}/api/v1/location`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      city: term,
    })
  });

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return await result.json();
}

async function readWeather(locationId: number): Promise<Weather> {

  const current = await fetch(`${server}/api/v1/weather`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      locationId: locationId,
    })
  });

  if (current.status !== 200) throw new Error('Failed to read location data');

  return await current.json();
}

async function readForecast(locationId: number): Promise<Weather[]> {

  const forecast = await fetch(`${server}/api/v1/forecast`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      locationId: locationId,
    })
  });

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json());
}

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

export const debounceLocation: any = _.debounce(searchLocation, 1000, { leading: true });

export const debounceWeather: any = _.debounce(readWeather, 1000, { leading: true });

export const debounceForecast: any = _.debounce(readForecast, 1000, { leading: true });
