import React, { Component } from 'react';

function News(props) {
    const newsArray = Object.values(props);
    const news_item = newsArray.map((g) => {
        return (
            // E a descrição menor
            <li key={g.ID} className={"list-group-item"}>
            <div>
                <span>{g.title}</span> 
                <p className="list-item">{g.description}</p>
                <p className="date-item">{g.tags.join()}</p>
            </div>
            </li>
        )
    });

    return (
        <div className="panel-group">
        <div className="panel panel-default panel-blue">
            <a data-toggle="collapse" href="#news-list">
                <h4 className="panel-header">
                    Notícias e Avisos
                </h4>
            </a>
            <div id="news-list" className="panel-collapse collapse in">
                <ul className="list-group">
                    {news_item}
                </ul>
            </div>
        </div>
        </div> 
    )
}

export default News;