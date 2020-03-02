import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from "uuid";
import Loading from './Loading'

const ArticlesList = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const targetUrl = 'https://storage.googleapis.com/aller-structure-task/test_data.json';
        fetch(targetUrl)
            .then(blob => blob.json())
            .then(data => {
                const dataNew = [];

                data[0].map(item => {
                    item.columns.map(article => {
                        article.id = uuidv4();
                        const articleData = {
                            id: article.id,
                            title: article.title
                        };
                        dataNew.push(articleData);
                        return article;
                    });
                    return item
                });

                setData(dataNew);
                setLoading(false);
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }, []);

    return (
        <section className="article-list">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Articles List</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {loading ? (
                            <Loading />
                        ) : (
                            data.map(item => {
                                return (
                                    <h3 key={item.id}>{item.title}</h3>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ArticlesList;
