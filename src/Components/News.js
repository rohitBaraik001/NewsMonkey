import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import FetchNews from './FetchNews'

const News = (props) => {
    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [news, setNews] = useState([]);
    const key = process.env.REACT_APP_NEWS_KEY


    const getNews = async () => {
        console.log("loading news")
        const result = await FetchNews(props.country, props.category);
        // console.log("this new is from rapid api");
        // console.log(result.data);
        setNews(result.data);
    }




    const updateNews = async () => {
        props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${key}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parseData = await data.json()
        props.setProgress(50)
        console.log(parseData)
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = "NewsMonkey - " + props.category
        getNews();

    }, [])



    return (
        <>

            <h1 className='text-center' style={{ margin: '35px', marginTop: '95px' }}>
                NewsMonkey - Top {capitalizeFirstLetter(props.category)} headlines
            </h1>
            <div className='happy'>
                <div className='row row-cols-1 row-cols-md-3'>
                    {news === undefined
                        ? ''
                        : news.map((element) => (
                            <div className='col mb-3' key={element.link}>
                                <NewsItem
                                    title={element.title === undefined ? 'My Title' : element.title}
                                    description={element.source_url}
                                    imageUrl={element.photo_url}
                                    newsUrl={element.link}
                                    date={element.published_datetime_utc}
                                />
                            </div>
                        ))}
                </div>
            </div>




        </>

    )
}

export default News
