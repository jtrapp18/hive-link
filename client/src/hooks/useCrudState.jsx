
import { useState } from "react";
import { postJSONToDb } from "../helper";
 
const useCrudState = (setState, optionalFunc=null, addFunc=null) => {
    const addToState = (item) => {
        setState(prevItems => {
            const updatedState = [...prevItems, item]
            
            if (optionalFunc) {
                optionalFunc(updatedState)
            }

            if (addFunc) {
              addFunc(item)
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
          }

          if (addFunc) {
            addFunc(updatedItem)
            console.log('ran', addFunc)
            console.log('values', updatedItem)
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
            const updatedState = prevItems.map(item =>
              item.id === itemId
              ? { ...item, [arrayKey]: [...item[arrayKey], newObj] }
              : item
            )

            if (optionalFunc) {
              optionalFunc(updatedState)
            }
      
            return updatedState 
        })
    };

    const updateKeyInState = (itemId, arrayKey, arrayId, newObj) => {
      setState(prevItems => {
          const updatedState = prevItems.map(item => {
            if (item.id !== itemId) return item; // Keep unchanged items
      
            return {
              ...item,
              [arrayKey]: item[arrayKey].map(subItem =>
                subItem.id === arrayId ? { ...subItem, ...newObj } : subItem
              )
            };
          });

          if (optionalFunc) {
            optionalFunc(updatedState)
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

    return {addToState, updateState, deleteFromState, 
      addToKeyInState, updateKeyInState, deleteFromKeyInState}
}

export default useCrudState;
