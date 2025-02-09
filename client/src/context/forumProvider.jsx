import React, { useState } from 'react';

// create the context
const ForumContext = React.createContext();

// create a provider component
function ForumProvider({ children, value }) {

  return (
      <ForumContext.Provider value={value}>
        {children}
      </ForumContext.Provider>
    );
  }

export { ForumContext, ForumProvider };