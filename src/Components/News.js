import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d34078d879ae4e68a42594e68b7b477e&page=${page}&pageSize=${props.pageSize}`
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
        updateNews();
    }, [])

    // handleNextClick = async () => {
    //     console.log("next clicked")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&&category=${this.props.category}&apiKey=d34078d879ae4e68a42594e68b7b477e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parseData = await data.json()
    //     console.log(parseData)
    //     this.setState({ page: this.state.page + 1, articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    // }

    // handlePrevClick = async () => {
    //     console.log("prev clicked")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&&category=${this.props.category}&apiKey=d34078d879ae4e68a42594e68b7b477e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url)
    //     let parseData = await data.json()
    //     console.log(parseData)

    //     this.setState({ page: this.state.page - 1, articles: parseData.articles, loading: false })
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d34078d879ae4e68a42594e68b7b477e&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url)
        let parseData = await data.json()
        console.log(parseData)
        setArticles(articles.concat(parseData.articles))
        setLoading(false)
    }

    return (
        <>
            <h1 className='text-center ' style={{ margin: "35px", marginTop: "95px" }}>NewsMonkey -Top {capitalizeFirstLetter(props.category)} headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container '>
                    <div className='row'>
                        {(articles === undefined ? "" : articles.map((element) => (

                            <div className='col-4'  key={element.url}>
                                <NewsItem title={element.title === undefined ? "Mytitile" : element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        )))}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
        </>

    )
}

export default News
