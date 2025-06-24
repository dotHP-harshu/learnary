import { Children, createContext } from "react";

export const collectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  return (
    <collectionContext.Provider value={value}>
      {children}
    </collectionContext.Provider>
  );
};
