import { useState, useEffect } from 'react';
import axios from 'axios';

export default async function FetchNews(country,category) {


    const key = process.env.REACT_APP_NEWS_KEY2;
    const options = {
        method: 'GET',
        url: 'https://real-time-news-data.p.rapidapi.com/search',
        params: {
          query: `${category}`,
          country: `${country}`,
          lang: 'en'
        },
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
        },

    };

    try {
        const response = await axios(options); // Use axios directly with the options

        const newsItem = response.data
        console.log(response.data);
        return newsItem;

    } catch (error) {
        console.log(error);
        return null;
    }









}
