import React from 'react'

const Notifications = ({data, handleRemoveRestore, handleRestoreItem}) => {

    return(

        data.length > 0 &&
        <div className="notifications">
            {data.map(item => {
               //console.log(item)
                const {title, id} = item.article
                return (
                    <div className="toast" key={id}>
                        <div className="toast-header">
                            <strong className="mr-auto">Article</strong>

                            <button
                                type="button"
                                className="ml-2 mb-1 close"
                                onClick={() => handleRemoveRestore(item.article)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            {title}
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => handleRestoreItem(item)}
                            >
                                Restore
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>

    )
};

export default Notifications;
