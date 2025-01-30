
import { useState } from "react";

const useCrud = (setState) => {
    const addItem = (item) => {
        setState(prevItems => [...prevItems, item])
    };
    
    const deleteItem = (itemId) => {
        setState(prevItems => prevItems.filter(item => item.id !== itemId))
    };
    
    const addToKey = (itemId, arrayKey, newObj) => {
        setState(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                ? { ...item, arrayKey: [...item[arrayKey], newObj] }
                : item
            )
        )
    };
    
    const deleteFromKey = (itemId, arrayKey) => {
        setState(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                ? { ...item, arrayKey: item[arrayKey].filter(arrayObj => arrayObj[userId] !== user.id) }
                : item
            ))
    };

    return {addItem, deleteItem, addToKey}
}


export default useCrud;
