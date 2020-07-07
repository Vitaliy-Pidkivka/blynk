const SET_NEW_ITEM_NAME = "blynk/app/SET-NEW-ITEM-NAME";
const ADD_ITEM = "blynk/app/ADD-ITEM";
const REMOVE_ITEM = "blynk/app/REMOVE-ITEM";
const TOGGLE_ITEM = "blynk/app/TOGGLE-ITEM";
const ADD_COMMENT = "blynk/app/ADD-COMMENT";
const REMOVE_COMMENT = "blynk/app/REMOVE-COMMENT";
const CHANGE_COMMENT = "blynk/app/CHANGE-COMMENT";


let initialState = {
    items: [
        {
            id: 0, name: 'item 1', comments: [
                {id: 0, name: 'double click to change, lost focus to disable, press enter to set changes', background: '#333444'},
                {id: 1, name: 'second comment', background: '#333444'}
            ], isActive: false
        },
        {id: 1, name: 'item 2', comments: [], isActive: false},
        {id: 2, name: 'item 3', comments: [], isActive: false},
    ],
    newItemName: '',
    newItemId: 0,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_ITEM_NAME: {
            return {
                ...state,
                newItemName: action.name
            }
        }
        case ADD_ITEM: {
            let newItemId = state.newItemId
            let newId = state.items.map(item => {
                if (item.id > newItemId) {
                    newItemId = item.id
                }
            })
            let newItem = {id: newItemId + 1, name: state.newItemName, comments: [], isActive: false}
            return {
                ...state,
                items: [...state.items, newItem],
                newItemName: '',
                newItemId: state.newItemId + 1
            }
        }
        case REMOVE_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.itemId)
            }
        }
        case TOGGLE_ITEM: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.itemId) {
                        return {
                            ...item,
                            isActive: true
                        }
                    } else {
                        return {
                            ...item,
                            isActive: false
                        }
                    }
                })
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.itemId) {
                        return {
                            ...item,
                            comments: [...item.comments, {
                                id: action.commentId,
                                name: action.name,
                                background: action.background
                            }]
                        }
                    } else {
                        return item
                    }
                })
            }
        }
        case REMOVE_COMMENT: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.itemId) {
                        return {
                            ...item,
                            comments: item.comments.filter(item => item.id !== action.commentId)
                        }
                    } else {
                        return item
                    }
                })
            }
        }
        case CHANGE_COMMENT: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.itemId) {
                        return {
                            ...item,
                            comments: item.comments.map(comment => {
                                if(comment.id === action.commentId){
                                    return {
                                        ...comment,
                                        name: action.commentName
                                    }
                                } else {
                                    return comment
                                }
                            })
                        }
                    } else {
                        return item
                    }
                })
            }
        }
        default:
            return state
    }
}
export const setNewItemName = (name) => ({type: SET_NEW_ITEM_NAME, name});
export const addItem = () => ({type: ADD_ITEM});
export const removeItem = (itemId) => ({type: REMOVE_ITEM, itemId});
export const toggleItem = (itemId) => ({type: TOGGLE_ITEM, itemId});
export const addComment = (itemId, commentId, name, background) => ({ type: ADD_COMMENT, itemId, commentId, name, background });
export const removeComment = (itemId, commentId) =>({ type: REMOVE_COMMENT, itemId, commentId});
export const changeComment = (itemId, commentId, commentName) => ({ type: CHANGE_COMMENT, itemId, commentId, commentName});
//redux-thunk


export default appReducer;