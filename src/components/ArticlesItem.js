import React from 'react'

class ArticlesItem extends React.Component{
    constructor(props) {
        super(props);
        const { title } = this.props.data;
        this.state = {
            isEditing: false,
            title,
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

    handleSave = () => {

    };

    render() {
        const {title, isEditing} = this.state;
        const {imageUrl, width} = this.props.data;
        return (
            <div className={`col-md-${width}`}>
                <div className="card">
                    <img src={`${imageUrl}&height=300&width=300`} alt={title} className="card-img-top" />
                    <div className="card-body">
                        {isEditing ?
                            <form className="form-inline">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={title}
                                    name="title"
                                    onChange={e => this.handleChange(e)}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-light"
                                    onClick={this.handleSave}
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
                                <button type="button" className="btn btn-danger">Delete</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }

};

export default ArticlesItem;
