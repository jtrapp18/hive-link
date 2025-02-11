import { snakeToCamel, postJSONToDb, patchJSONToDb, deleteJSONFromDb } from "../helper";
import useCrudState from "./useCrudState";
 
const useCrudStateDB = (setState, dbKey, optionalFunc=null, addFunc=null) => {

    const {addToState, updateState, deleteFromState, 
      addToKeyInState, updateKeyInState, deleteFromKeyInState, 
      addNestedToKeyInState, updateNestedKeyInState, deleteNestedKeyInState} = 
    useCrudState(setState, optionalFunc, addFunc);

    const addItem = (item) => {
      postJSONToDb(dbKey, item)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        addToState(jsonTransformed);
      })
    };
    
    const updateItem = (item, itemId) => {
      patchJSONToDb(dbKey, itemId, item)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        updateState(jsonTransformed, itemId);

        console.log("EDITED", jsonTransformed);
      })
      .catch(e => console.error(e));
      
    }
      
    const deleteItem = (itemId) => {
      deleteJSONFromDb(dbKey, itemId)
      deleteFromState(itemId)
    };
    
    const addToKey = (arrayKey, body, itemId=null) => {
      postJSONToDb(arrayKey, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        addToKeyInState(arrayKey, jsonTransformed, itemId); 
      });
    };

    const updateKey = (arrayKey, arrayId, body, itemId=null) => {
      patchJSONToDb(arrayKey, arrayId, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        updateKeyInState(arrayKey, jsonTransformed, itemId);
      });
    };

    const deleteFromKey = (arrayKey, arrayId, itemId=null) => {
      deleteJSONFromDb(arrayKey, arrayId);
      deleteFromKeyInState(arrayKey, arrayId, itemId);
    };
    
    const addNestedKey = (arrayKey, arrayId, nestedKey, body, itemId=null) => {
      postJSONToDb(nestedKey, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        addNestedToKeyInState(arrayKey, arrayId, nestedKey, jsonTransformed, itemId);
      });
    };

    const updateNestedKey = (arrayKey, arrayId, nestedKey, nestedId, body, itemId=null) => {
      patchJSONToDb(nestedKey, nestedId, body)
      .then(json => {
        const jsonTransformed = snakeToCamel(json);
        updateNestedKeyInState(arrayKey, arrayId, nestedKey, nestedId, jsonTransformed, itemId);
      });
    };

    const deleteNestedKey = (arrayKey, arrayId, nestedKey, nestedId, itemId=null) => {
      deleteJSONFromDb(nestedKey, nestedId);
      deleteNestedKeyInState(arrayKey, arrayId, nestedKey, nestedId, itemId);
    };

  return {addItem, updateItem, deleteItem, 
    addToKey, updateKey, deleteFromKey,
    addNestedKey, updateNestedKey, deleteNestedKey
  }
}

export default useCrudStateDB;
