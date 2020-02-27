import React, {useEffect, useState} from 'react'
import ArticlesItem from './ArticlesItem'

const Articles = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const targetUrl = 'https://storage.googleapis.com/aller-structure-task/test_data.json';
        fetch(targetUrl)
            .then(blob => blob.json())
            .then(data => {
                setData(data[0]);
                setLoading(false);
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }, []);

    return (
        <section className="articles">
            <div className="container">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Articles</h1>
                        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
                            parent.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            {data.map((item, index) => {
                                return (
                                    <div className="row" key={index}>
                                        {
                                            item.columns.map((article, index) => {
                                                return (
                                                    <ArticlesItem key={index} data={article} />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
};

export default Articles;
