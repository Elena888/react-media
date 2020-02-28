import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ArticlesItem from './ArticlesItem'
import Notifications from './Notifications'

class Articles extends React.Component{
    constructor(props) {
        super(props)

    }
    state = {
        data: [],
        loading: true,
        restoreDataArr: []
    };
    timerId = null
    componentDidMount() {
        const targetUrl = 'https://storage.googleapis.com/aller-structure-task/test_data.json';
        fetch(targetUrl)
            .then(blob => blob.json())
            .then(data => {
                const dataNew = [...data[0]];

                dataNew.map(item => {
                    let itemCopy = [...item.columns]
                    item.columns = itemCopy.map((article, index) => {
                        article.id = uuidv4();
                        article.columnPos = index;
                        // article = {
                        //     [index]: article
                        // };

                        //console.log('article', article)
                        return article
                    });
                    return item
                });

                //console.log(dataNew)
                this.setState({data: dataNew, loading: false});
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    handleEdit = (id, newTitle) => {
        const editedData = JSON.parse(JSON.stringify(this.state.data));
        editedData.forEach(item => {
            item.columns.forEach(article => {
                if(article.id === id){
                    article.title = newTitle
                }
            });
        });
        this.setState({ data: editedData });
    };

    handleDelete = article => {
        if(article) {
            let restoreData = {};

            let updatedData = JSON.parse(JSON.stringify(this.state.data));
            //console.log('updatedData', updatedData)
            updatedData.forEach((item, indexRow) => {
                item.columns = item.columns.filter(el => {
                    if (el.id !== article.id) {
                        return el
                    } else {
                        restoreData = {
                            indexRow,
                            indexCol: el.columnPos,
                            article,
                        };
                        return null
                    }
                });
            });
            this.setState({restoreDataArr: [...this.state.restoreDataArr, restoreData]}, () => {
                this.timerId = setTimeout(() => {
                    console.log(article)

                    this.handleRemoveRestore(article)


                }, 4000)
            });

            this.setState({data: updatedData});
        }
    };

    handleRemoveRestore = item => {
        let updatedData = JSON.parse(JSON.stringify(this.state.restoreDataArr));
        updatedData = updatedData.filter(el => el.article.id !== item.id);
        this.setState({restoreDataArr: updatedData})
    };

    handleRestoreItem = item => {
        const {indexRow, indexCol, article} = item;
        let updatedData = JSON.parse(JSON.stringify(this.state.data));
        const { columns } = updatedData[indexRow];

        //updatedData[indexRow].columns[indexCol] = article;
        columns.forEach((item, index) => {
            if(indexCol === index){
                console.log('1',index, indexCol)
                columns.splice(index, 0, article)
            }

            if(indexCol >= columns.length){
                console.log('3',index, indexCol)
                columns.push(article)
            }
        });
        //console.log(columns)
        //updatedData[indexRow].columns = columnsArr
        this.setState({data: updatedData});
        this.handleRemoveRestore(article)
        clearTimeout(this.timerId);
       // this.handleDelete(null)
    };

    render() {
        const {loading, data, restoreDataArr} = this.state;
        console.log('data', data)

        return (
            <section className="articles">
                <div className="container">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">Articles</h1>
                            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        data.map((item, index) => {
                            return (
                                <div className="row" key={index}>
                                    {
                                        item.columns.map(article => {
                                            return (
                                                <ArticlesItem
                                                    key={article.id}
                                                    data={article}
                                                    handleEdit={this.handleEdit}
                                                    handleDelete={this.handleDelete}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    )}
                </div>
                <Notifications
                    data={restoreDataArr}
                    handleRestoreItem={this.handleRestoreItem}
                    handleRemoveRestore={this.handleRemoveRestore}
                />
            </section>
        )
    }
}

export default Articles;
