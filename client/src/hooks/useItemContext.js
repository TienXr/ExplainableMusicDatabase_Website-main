import { ItemContext } from "../context/ItemContext";
import { useContext } from "react";

export const useItemContext = () => {
    // contain state and dispatch from ItemContext.js
    const context = useContext(ItemContext);

    if (!context) {
        throw Error("useItemContext must be used inside an ItemContextProvider")
    }

    return context;

}