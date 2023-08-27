import React, { createContext, useReducer } from 'react';

export const ThemeContext = createContext()

// USING CONTEXT API for global state with action to change global state
export const ThemeReducer = (state, action) => {
    switch (action.type) {
        case 'GET_THEMES':
            return {
                ...state,
                themes: action.payload
            }
        case 'CHOOSE_THEME':
            return {
                ...state,
                theme_choice: action.payload
            }
        default:
            return state
    }
}

export const ThemeContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(ThemeReducer, {
        themes: [],
        theme_choice: null
    });

    return (
        <ThemeContext.Provider value={{...state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    );
}