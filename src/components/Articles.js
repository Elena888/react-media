import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ArticlesItem from './ArticlesItem'
import NotificationsItem from "./NotificationsItem";


const DELETE_ARTICLE_TIMER = 5000;

//deep coping an object
function cloneObject(data){
    return JSON.parse(JSON.stringify(data))
}

class Articles extends React.Component{
    state = {
        data: [],
        loading: true,
        restoreDataArr: [],
    };

    timerIds = [];

    componentDidMount() {
        const targetUrl = 'https://storage.googleapis.com/aller-structure-task/test_data.json';
        fetch(targetUrl)
            .then(blob => blob.json())
            .then(data => {
                const dataNew = [...data[0]];

                dataNew.map((item, rowIndex) => {
                    const itemCopy = [...item.columns];
                    item.columns = itemCopy.map((article, index) => {
                        article.id = uuidv4();
                        article.columnPos = index;
                        article.rowIndex = rowIndex;
                        return article
                    });
                    return item
                });

                this.setState({data: dataNew, loading: false});
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }



    handleEdit = (id, newTitle) => {
        const editedData = cloneObject(this.state.data);
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
        let restoreData = {};
        let updatedData = cloneObject(this.state.data);
        updatedData.forEach((item, index) => {
            item.columns = item.columns.filter(el => {
                if (el.id !== article.id) {
                    return el
                } else {
                    restoreData = {
                        article,
                        indexRow: index,
                    };
                    return null
                }
            });
        });

        this.setState({data: updatedData,restoreDataArr: [...this.state.restoreDataArr, restoreData]}, () => {
            this.timerIds[`timer-${article.id}`] = setTimeout(() => {
                console.log('timer', restoreData)
                this.handleRemoveRestoredItem(restoreData)

            }, DELETE_ARTICLE_TIMER)
        });
    };

    filterRestoreData = item => {
        let updatedRestoredData = cloneObject(this.state.restoreDataArr);
        clearTimeout(this.timerIds[`timer-${item.id}`]);
        return updatedRestoredData.filter(el => el.article.id !== item.id);
    };

    handleRemoveRestoredItem = item => {
        const {article, indexRow} = item;
       // console.log('item', item)
        let updatedData = cloneObject(this.state.data);

        if(updatedData[indexRow] !== undefined && updatedData[indexRow].columns.length === 0){
            updatedData.splice(indexRow, 1);
        }
        const updatedRestoredData = this.filterRestoreData(article);
        this.setState({data: updatedData, restoreDataArr: updatedRestoredData});
    };

    handleRestoreButton = item => {
        const {article, indexRow} = item;
        let updatedData = cloneObject(this.state.data);
        const { columns } = updatedData[indexRow];

        columns.push(article);
        columns.sort((a, b) => {
            const columnPosA = a.columnPos;
            const columnPosB = b.columnPos;

            return columnPosA - columnPosB
        });

        const updatedRestoredData = this.filterRestoreData(article)
        this.setState({data: updatedData, restoreDataArr: updatedRestoredData});
    };

    render() {
        const {loading, data, restoreDataArr} = this.state;
        //console.log('this.data', data)

        return (
            <section className="articles">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Articles</h1>
                    </div>
                </div>
                <div className="container">
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
                {
                    restoreDataArr.length > 0 &&
                    <div className="notifications">
                        {restoreDataArr.map(item => {
                            return (
                                <NotificationsItem
                                    key={item.article.id}
                                    item={item}
                                    handleRemoveRestoredItem={this.handleRemoveRestoredItem}
                                    handleRestoreButton={this.handleRestoreButton}
                                    countTimer={DELETE_ARTICLE_TIMER}
                                />
                            )
                        })}
                    </div>
                }
            </section>
        )
    }
}

export default Articles;
