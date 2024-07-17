// ComponentsContext.js
import React, { createContext, useState, useContext } from 'react';

export const ComponentsContext = createContext();
export const useComponentsContext = () => useContext(ComponentsContext);
export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(null);


  return (
    <ComponentsContext.Provider
      value={{
        components,
        setComponents,
        currentComponent,
        setCurrentComponent,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};
