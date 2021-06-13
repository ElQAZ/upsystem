import { apiKey } from '../../constants';
import moment from 'moment';
import axios from 'axios';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const REQUEST_INIT = 'REQUEST_INIT';
export const requestInit = () => ({ type: REQUEST_INIT });

export const fetchItemsSuccess = items => {
  return { type: FETCH_ITEMS_SUCCESS, items };
};

export const fetchFailure = (error) => {
  return { type: FETCH_ITEMS_FAILURE, error: error };
};

export const fetchItems = () => {
  let response;
  return async dispatch => {
    try {
      response = await axios.get('https://countriesnow.space/api/v0.1/countries');
      let targetObj = {};
      response.data.data.map(item => {
        return targetObj[item.country] = item.cities;
      });
      dispatch(fetchItemsSuccess(targetObj));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(fetchFailure(error.response.data));
      } else {
        dispatch(fetchFailure({ global: "No Internet" }));
      }
    }
  }
};

export const fetchWeatherForcast = (city) => {
  let coordResponse;
  let forcastResponse;
  return async dispatch => {
    try {
      coordResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const lat = coordResponse.data.coord.lat;
      const lon = coordResponse.data.coord.lon;
      const part = 'hourly,minutely,alerts';
      const units = 'metric';
      forcastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=${units}`);
      const formattedForcast = forcastResponse.data.daily.map(day => ({ ...day, date: moment.unix(day.dt).format("DD.MM.YYYY") }));
      let targetObj = {
        name: city,
        forcast: formattedForcast
      };
      return targetObj;
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(fetchFailure(error.response.data));
      } else {
        dispatch(fetchFailure({ global: "No Internet" }));
      }
    }
  }
};