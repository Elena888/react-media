import React, {useState, useEffect} from 'react'

const NotificationsItem = ({item, countTimer, handleRemoveRestoredItem, handleRestoreButton}) => {
    const [timer, setTimer] = useState(countTimer / 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const {title} = item.article;

    return(
        <div className="toast">
            <div className="toast-header">
                <strong className="mr-auto">Article</strong>

                <button
                    type="button"
                    className="ml-2 mb-1 close"
                    onClick={() => handleRemoveRestoredItem(item)}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                <h5>{title}</h5>
                <p>The article will be removed in <span>{timer}</span> seconds</p>

                <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => handleRestoreButton(item)}
                >
                    Restore
                </button>
            </div>
        </div>
    )
};

export default NotificationsItem;
