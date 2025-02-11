import { snakeToCamel } from "../helper";

const useCrudState = (setState, optionalFunc=null, addFunc=null) => {
  const addToState = (item) => {
    setState(prevItems => {
      const updatedState = Array.isArray(prevItems) ? [...prevItems, item] : [prevItems, item];
  
      optionalFunc?.(updatedState);
      addFunc?.(item);
      
      return updatedState;
    });
  };
  
  const updateState = (updatedItem, itemId) => {
    const updateItem = (item) => (item.id === itemId ? { ...item, ...updatedItem } : item);
  
    setState(prevItems => {
      const updatedState = Array.isArray(prevItems)
        ? prevItems.map(updateItem)
        : updateItem(prevItems);
  
      optionalFunc?.(updatedState);
      addFunc?.(updatedItem);
      
      return updatedState;
    });
  };
  
  const deleteFromState = (itemId) => {
    setState(prevItems => {
      const updatedState = Array.isArray(prevItems)
        ? prevItems.filter(item => item.id !== itemId)
        : prevItems.id === itemId ? null : prevItems;
  
      optionalFunc?.(updatedState);
      
      return updatedState;
    });
  };
  
  const addToKeyInState = (arrayKey, newObj, itemId) => {
    const stateArrayKey = snakeToCamel(arrayKey);
  
    const updateStateArray = (item) => ({
      ...item,
      [stateArrayKey]: [...(item[stateArrayKey] || []), newObj], // Ensure array exists
    });
  
    setState(prevItems => {
      const updatedState = Array.isArray(prevItems)
        ? prevItems.map(item => (item.id === itemId ? updateStateArray(item) : item))
        : updateStateArray(prevItems);
  
      optionalFunc?.(updatedState);
      addFunc?.(newObj);
      
      return updatedState;
    });
  };
  
    const updateKeyInState = (arrayKey, updatedObj, itemId) => {
      const stateArrayKey = snakeToCamel(arrayKey);

      const updateStateArray = (item) => ({
        ...item,
        [stateArrayKey]: Array.isArray(item[stateArrayKey])
          ? item[stateArrayKey].map(subItem =>
              subItem.id === updatedObj.id ? { ...subItem, ...updatedObj } : subItem
            )
          : updatedObj // Directly update if not an array
      });

      setState(prevItems => {
        const updatedState = Array.isArray(prevItems)
        ? prevItems.map(item => (item.id === itemId ? updateStateArray(item) : item))
        : updateStateArray(prevItems);

          optionalFunc?.(updatedState);
          addFunc?.(updatedObj);
          return updatedState;
      })
  };
  
  const deleteFromKeyInState = (arrayKey, arrayId, itemId) => {
    const stateArrayKey = snakeToCamel(arrayKey);
  
    const updateStateArray = (item) => ({
      ...item,
      [stateArrayKey]: item[stateArrayKey].filter(arrayObj => arrayObj.id !== arrayId),
    });
  
    setState(prevItems => {
      const updatedState = Array.isArray(prevItems)
        ? prevItems.map(item => (item.id === itemId ? updateStateArray(item) : item))
        : updateStateArray(prevItems);
  
      optionalFunc?.(updatedState);
      return updatedState;
    });
  };
  
  const addNestedToKeyInState = (arrayKey, arrayId, nestedKey, newObj, itemId) => {
    const stateArrayKey = snakeToCamel(arrayKey);
    const stateNestedKey = snakeToCamel(nestedKey);
  
    const updateStateArray = (item) => ({
      ...item,
      [stateArrayKey]: item[stateArrayKey].map(subItem => 
        subItem.id === arrayId
          ? { ...subItem, [stateNestedKey]: [...subItem[stateNestedKey], newObj] }
          : subItem
      ),
    });
    
    setState(prevItems => {
      console.log(prevItems); // Check if prevItems is an array
      const updatedState = Array.isArray(prevItems)
        ? prevItems.map(item => {
            return (item.id === itemId ? updateStateArray(item) : item);
          })
        : updateStateArray(prevItems);

      optionalFunc?.(updatedState);
      addFunc?.(newObj);
      return updatedState;
    });
  };
  
  const updateNestedKeyInState = (arrayKey, arrayId, nestedKey, nestedId, updatedObj, itemId) => {
    const stateArrayKey = snakeToCamel(arrayKey);
    const stateNestedKey = snakeToCamel(nestedKey);
  
    const updateStateArray = (item) => ({
      ...item,
      [stateArrayKey]: item[stateArrayKey].map(subItem =>
        subItem.id === arrayId
          ? {
              ...subItem,
              [stateNestedKey]: subItem[stateNestedKey].map(nestedSubItem =>
                nestedSubItem.id === nestedId ? { ...nestedSubItem, ...updatedObj } : nestedSubItem
              ),
            }
          : subItem
      ),
    });
  
    setState(prevItems => {
      const updatedState = Array.isArray(prevItems)
        ? prevItems.map(item => (item.id === itemId ? updateStateArray(item) : item))
        : updateStateArray(prevItems);
  
      optionalFunc?.(updatedState);
      addFunc?.(updatedObj);
      return updatedState;
    });
  };

    const deleteNestedKeyInState = (arrayKey, arrayId, nestedKey, nestedId, itemId) => {
      const stateArrayKey = snakeToCamel(arrayKey);
      const stateNestedKey = snakeToCamel(nestedKey);
    
      const updateStateArray = (item) => ({
        ...item,
        [stateArrayKey]: item[stateArrayKey].map(subItem =>
          subItem.id === arrayId
            ? {
                ...subItem,
                [stateNestedKey]: subItem[stateNestedKey].filter(nestedSubItem => nestedSubItem.id !== nestedId)
              }
            : subItem
        ),
      });
    
      setState(prevItems => {
        const updatedState = Array.isArray(prevItems)
          ? prevItems.map(item => (item.id === itemId ? updateStateArray(item) : item))
          : updateStateArray(prevItems);
    
        optionalFunc?.(updatedState);
        return updatedState;
      });
    };
  
    
    return {addToState, updateState, deleteFromState, 
      addToKeyInState, updateKeyInState, deleteFromKeyInState,
      addNestedToKeyInState, updateNestedKeyInState, deleteNestedKeyInState
    }
}

export default useCrudState;
