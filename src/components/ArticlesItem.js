import React from 'react'

class ArticlesItem extends React.Component{
    constructor(props) {
        super(props);
        const { title } = this.props.data;
        this.state = {
            isEditing: false,
            title,
            errorMessage: ''
        }
    }

    handleEdit = () => {
        this.setState({isEditing: true})
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        })
    };

    handleSave = (e, id) => {
        e.preventDefault();
        const { handleEdit } = this.props;
        const { title } = this.state;
        if(title.length === 0) {
            this.setState({errorMessage: 'Title is empty'})

        }else if(title.length > 50){
            this.setState({errorMessage: 'Title must be less than 50 characters'})
        }else{
            handleEdit(id, title);
            this.setState({errorMessage: '', isEditing: false})
        }
    };

    handleDelete = (e, article) => {
        e.preventDefault();
        const {handleDelete} = this.props;
        handleDelete(article)
    };

    render() {
        const {title, isEditing, errorMessage} = this.state;
        const {data, data: {imageUrl, width, id}} = this.props;
        return (
            <div className={`col-md-${width}`}>
                <div className="card">
                    <img src={`${imageUrl}&height=300&width=300`} alt={title} className="card-img-top" />
                    <div className="card-body">
                        {isEditing ?
                            <form>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={title}
                                    name="title"
                                    onChange={e => this.handleChange(e)}
                                />
                                <div className="card-body__error">
                                    {errorMessage}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-light"
                                    onClick={e => this.handleSave(e, id)}
                                >
                                    Save
                                </button>
                            </form>
                            :
                            <>
                                <h3 className="card-text">{title}</h3>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={this.handleEdit}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={e => this.handleDelete(e, data)}
                                >
                                    Delete
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticlesItem;
