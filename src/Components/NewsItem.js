import React from 'react'

const NewsItem = (props) => {
    return (
        <div className='container'>
            <div className="card">
                <img src={!props.imageUrl ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/VPQ43YOHTXBNLZ2STHZULW6L7Y_size-normalized.jpg&w=1440" : props.imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title.slice(0,40)}....</h5>
                    <p className="card-text">{props.description.slice(0,100)}....</p>
                    <p className="card-tex text-sm">Published By {!props.author ? "unknown" : props.author} on {!props.date ? "unknown" : new Date(props.date).toGMTString()}</p>
                    <a href={props.newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
