import React, { createContext, useContext, useState, useCallback } from "react";

const FlashContext = createContext();

export const useFlash = () => useContext(FlashContext);

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState(null);

  const showFlash = useCallback((message, type = "success", duration = 3000) => {
    setFlash({ message, type });

    setTimeout(() => {
      setFlash(null);
    }, duration);
  }, []);

  return (
    <FlashContext.Provider value={{ flash, showFlash }}>
      {children}
    </FlashContext.Provider>
  );
};
