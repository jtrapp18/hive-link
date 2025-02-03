
import { useState } from "react";
import { postJSONToDb } from "../helper";
 
const useCrudState = (setState, optionalFunc=null) => {
    const addToState = (item) => {
        setState(prevItems => {
            const updatedState = [...prevItems, item]
            
            if (optionalFunc) {
                optionalFunc(updatedState)
            }

            return updatedState
        })
    };

    const updateState = (itemId, updatedItem) => {
        setState(prevItems => {
          const updatedState = prevItems.map(item =>
            item.id === itemId ? { ...item, ...updatedItem } : item
          )

          if (optionalFunc) {
            optionalFunc(updatedState)
            console.log(updatedState)
          }

          return updatedState
        });
      };
    
    const deleteFromState = (itemId) => {
        setState(prevItems => {
            const updatedState = prevItems.filter(item => item.id !== itemId)

            if (optionalFunc) {
              optionalFunc(updatedState)
            }
    
            return updatedState
        })
    };
    
    const addToKeyInState = (itemId, arrayKey, newObj) => {
        setState(prevItems => {
          console.log('prevState', prevItems)
            const updatedState = prevItems.map(item =>
              item.id === itemId
              ? { ...item, [arrayKey]: [...item[arrayKey], newObj] }
              : item
            )

            if (optionalFunc) {
              optionalFunc(updatedState)
              console.log(updatedState)
            }
      
            return updatedState 
        })
    };
    
    const deleteFromKeyInState = (itemId, arrayKey, arrayId) => {
        setState(prevItems => {
            const updatedState = prevItems.map(item =>
                item.id === itemId
                ? { ...item, [arrayKey]: item[arrayKey].filter(arrayObj => arrayObj.id !== arrayId) }
                : item              
            )

            if (optionalFunc) {
              optionalFunc(updatedState)
            }
      
            return updatedState 
        })
    };

    return {addToState, updateState, deleteFromState, addToKeyInState, deleteFromKeyInState}
}

export default useCrudState;
