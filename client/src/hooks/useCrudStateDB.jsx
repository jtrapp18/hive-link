
import { useState } from "react";
import { snakeToCamel, postJSONToDb, patchJSONToDb, deleteJSONFromDb } from "../helper";
import useCrudState from "./useCrudState";
 
const useCrudStateDB = (setState, dbKey, optionalFunc=null, addFunc=null) => {

    const {addToState, updateState, deleteFromState, addToKeyInState, deleteFromKeyInState} = 
    useCrudState(setState, optionalFunc);

    const addItem = (item) => {
      postJSONToDb(dbKey, item)
      .then(json => {
        const jsonTransformed = snakeToCamel(json)
        addToState(jsonTransformed)

        if (addFunc) {
          addFunc(jsonTransformed)
        }
      })
    };
    
    const updateItem = (itemId, item) => {
      console.log(dbKey, itemId, item)
      patchJSONToDb(dbKey, itemId, item)
      updateState(itemId, item)
    }
      
    const deleteItem = (itemId) => {
      deleteJSONFromDb(dbKey, itemId)
      deleteFromState(itemId)
    };
    
    const addToKey = (itemId, arrayKey, body) => {
      postJSONToDb(arrayKey, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json)
        addToKeyInState(itemId, arrayKey, jsonTransformed)
      });
    };

    const updateKey = (itemId, arrayKey, arrayId, body) => {
      patchJSONToDb(arrayKey, arrayId, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json)
        updateKeyInState(itemId, arrayKey, jsonTransformed)
      });
    };

    const deleteFromKey = (itemId, arrayKey, arrayId) => {
      deleteJSONFromDb(arrayKey, arrayId)
      deleteFromKeyInState(itemId, arrayKey, arrayId)
    };
    

  return {addItem, updateItem, deleteItem, 
    addToKey, updateKey, deleteFromKey}
}

export default useCrudStateDB;
