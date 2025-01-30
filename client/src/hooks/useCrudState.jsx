
import { useState } from "react";
import { postJSONToDb } from "../helper";

const useCrudState = (setState) => {
    const addToState = (item) => {
        setState(prevItems => [...prevItems, item])
    };

    const updateState = (itemId, updatedItem) => {
        setState(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, ...updatedItem } : item
          )
        );
      };
    
    const deleteFromState = (itemId) => {
        setState(prevItems => prevItems.filter(item => item.id !== itemId))
    };
    
    const addToKeyInState = (itemId, arrayKey, newObj) => {
        setState(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                ? { ...item, arrayKey: [...item[arrayKey], newObj] }
                : item
            )
        )
    };
    
    // const deleteFromKey = (itemId, arrayKey) => {
    //     setState(prevItems =>
    //         prevItems.map(item =>
    //             item.id === itemId
    //             ? { ...item, arrayKey: item[arrayKey].filter(arrayObj => arrayObj[userId] !== user.id) }
    //             : item
    //         ))
    // };

    return {addToState, updateState, deleteFromState, addToKeyInState}
}

export default useCrudState;
