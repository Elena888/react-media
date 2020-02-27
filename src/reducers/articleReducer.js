
export const articleReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_ARTICLES':
            return [...state];
        case 'REMOVE_BOOK':
            return state.filter(book => book.id !== action.id)
        default:
            return state
    }
};
