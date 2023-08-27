import React, { createContext, useReducer } from 'react';

export const ItemContext = createContext()

// USING CONTEXT API for global state with action to change global state
export const itemReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: action.payload
            }
        case 'CREATE_ITEM':
            return {
                chosen: state.chosen,
                items: [...state.items, action.payload]
            }
        case 'SET_CHOOSE':
            return {
                ...state,
                chosen: action.payload
            }
        case 'DELETE_ITEM':
            return {
                chosen: null,
                items: state.items.filter((i) => i._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ItemContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(itemReducer, {
        items: [],
        chosen: null
    });

    return (
        <ItemContext.Provider value={{...state, dispatch}}>
            {children}
        </ItemContext.Provider>
    );
}