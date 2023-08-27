import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
    // contain state and dispatch from ThemeContext.js
    const context = useContext(ThemeContext)

    if (!context) {
        throw Error("useThemecontext must be used inside an ThemeContextProvider")
    }
    return context
}