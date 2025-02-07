
import { useState } from "react";
import { snakeToCamel, postJSONToDb, patchJSONToDb, deleteJSONFromDb } from "../helper";
import useCrudState from "./useCrudState";
 
const useCrudStateDB = (setState, dbKey, optionalFunc=null, addFunc=null) => {

    const {addToState, updateState, deleteFromState, addToKeyInState, updateKeyInState, deleteFromKeyInState} = 
    useCrudState(setState, optionalFunc, addFunc);

    const addItem = (item) => {
      postJSONToDb(dbKey, item)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        addToState(jsonTransformed);
      })
    };
    
    const updateItem = (itemId, item) => {

      patchJSONToDb(dbKey, itemId, item)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        updateState(itemId, jsonTransformed);

        console.log("EDITED", jsonTransformed);
      })
      .catch(e => console.error(e));
      
    }
      
    const deleteItem = (itemId) => {
      deleteJSONFromDb(dbKey, itemId)
      deleteFromState(itemId)
    };
    
    const addToKey = (itemId, arrayKey, body) => {
      postJSONToDb(arrayKey, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        addToKeyInState(itemId, arrayKey, jsonTransformed);
      });
    };

    const updateKey = (itemId, arrayKey, arrayId, body) => {
      patchJSONToDb(arrayKey, arrayId, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        updateKeyInState(itemId, arrayKey, jsonTransformed);
      });
    };

    const deleteFromKey = (itemId, arrayKey, arrayId) => {
      deleteJSONFromDb(arrayKey, arrayId);
      deleteFromKeyInState(itemId, arrayKey, arrayId);
    };
    
    const addNestedKey = (itemId, arrayKey, nestedKey, body) => {
      postJSONToDb(arrayKey, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        addNestedToKeyInState(itemId, arrayKey, nestedKey, jsonTransformed);
      });
    };

    const updateNestedKey = (itemId, arrayKey, arrayId, nestedKey, nestedId, body) => {
      patchJSONToDb(nestedKey, nestedId, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        updateNestedKeyInState(itemId, arrayKey, arrayId, nestedKey, jsonTransformed);
      });
    };

  return {addItem, updateItem, deleteItem, 
    addToKey, updateKey, deleteFromKey,
    addNestedKey, updateNestedKey
  }
}

export default useCrudStateDB;
