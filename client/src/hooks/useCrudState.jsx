import { snakeToCamel } from "../helper";

const useCrudState = (setState, optionalFunc=null, addFunc=null) => {
    const addToState = (item) => {
        setState(prevItems => {
            const updatedState = [...prevItems, item];
            
            if (optionalFunc) {
                optionalFunc(updatedState);
            }

            if (addFunc) {
              addFunc(item);
            }

            return updatedState;
        })
    };

    const updateState = (itemId, updatedItem) => {
        setState(prevItems => {
          const updatedState = prevItems.map(item =>
            item.id === itemId ? { ...item, ...updatedItem } : item
          )

          if (optionalFunc) {
            optionalFunc(updatedState);
          }

          if (addFunc) {
            addFunc(updatedItem);
          }

          return updatedState;
        });
      };
    
    const deleteFromState = (itemId) => {
        setState(prevItems => {
            const updatedState = prevItems.filter(item => item.id !== itemId)

            if (optionalFunc) {
              optionalFunc(updatedState);
            }
    
            return updatedState;
        })
    };
    
    const addToKeyInState = (itemId, arrayKey, newObj) => {
        const stateArrayKey = snakeToCamel(arrayKey);

        setState(prevItems => {
            const updatedState = prevItems.map(item =>
              item.id === itemId
              ? { ...item, [stateArrayKey]: [...item[stateArrayKey], newObj] }
              : item
            )

            if (optionalFunc) {
              optionalFunc(updatedState);
            }

            if (addFunc) {
              addFunc(newObj);
            }
      
            return updatedState;
        })
    };

    const updateKeyInState = (itemId, arrayKey, updatedObj) => {
      const stateArrayKey = snakeToCamel(arrayKey);

      setState(prevItems => {
          const updatedState = prevItems.map(item => {
            if (item.id !== itemId) return item; // Keep unchanged items

            return {
              ...item,
              [stateArrayKey]: item[stateArrayKey].map(subItem =>
                subItem.id === updatedObj.id ? { ...subItem, ...updatedObj } : subItem
              )
            };
          });

          if (optionalFunc) {
            optionalFunc(updatedState);
          }

          if (addFunc) {
            addFunc(updatedObj);
          }
    
          return updatedState;
      })
  };
  
  const deleteFromKeyInState = (itemId, arrayKey, arrayId) => {
    const stateArrayKey = snakeToCamel(arrayKey);

    setState(prevItems => {
        const updatedState = prevItems.map(item =>
            item.id === itemId
            ? { ...item, [stateArrayKey]: item[stateArrayKey].filter(arrayObj => arrayObj.id !== arrayId) }
            : item              
        )

        if (optionalFunc) {
          optionalFunc(updatedState);
        }
  
        return updatedState;
    })
};

  const addNestedToKeyInState = (itemId, arrayKey, nestedKey, newObj) => {
    const stateArrayKey = snakeToCamel(arrayKey);
    const stateNestedKey = snakeToCamel(nestedKey);

    setState(prevItems => {
      const updatedState = prevItems.map(item => {
        if (item.id !== itemId) return item; // Keep unchanged items

        return {
          ...item,
          [stateArrayKey]: item[stateArrayKey].map(subItem => {
            if (subItem.id !== newObj[stateArrayKey + 'Id']) return subItem; // Ensure it matches the right subItem

            return {
              ...subItem,
              [stateNestedKey]: [...subItem[stateNestedKey], newObj]
            };
          })
        };
      });

      if (optionalFunc) {
        optionalFunc(updatedState);
      }

      if (addFunc) {
        addFunc(newObj);
      }

      return updatedState;
    });
  };

  const updateNestedKeyInState = (itemId, arrayKey, arrayId, nestedKey, updatedObj) => {
    const stateArrayKey = snakeToCamel(arrayKey);
    const stateNestedKey = snakeToCamel(nestedKey);
  
    setState(prevItems => {
      const updatedState = prevItems.map(item => {
        if (item.id !== itemId) return item; // Keep unchanged items
  
        return {
          ...item,
          [stateArrayKey]: item[stateArrayKey].map(subItem => {
            if (subItem.id !== arrayId) return subItem; // Keep unchanged subItems
  
            return {
              ...subItem,
              [stateNestedKey]: subItem[stateNestedKey].map(nestedSubItem => 
                nestedSubItem.id === updatedObj.id ? { ...nestedSubItem, ...updatedObj } : nestedSubItem
              )
            };
          })
        };
      });
  
      if (optionalFunc) {
        optionalFunc(updatedState);
      }
  
      if (addFunc) {
        addFunc(updatedObj);
      }
  
      return updatedState;
    });
  };
  
    return {addToState, updateState, deleteFromState, 
      addToKeyInState, updateKeyInState, deleteFromKeyInState,
      addNestedToKeyInState, updateNestedKeyInState
    }
}

export default useCrudState;
