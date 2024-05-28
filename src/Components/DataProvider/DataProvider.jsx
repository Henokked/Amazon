import React, { Children, createContext, useReducer } from "react";
import { initialState, reducer } from "../../Utility/reducer";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  
  //   const [state, dispatch] = useReducer(reducer, initialState);
  //   console.log("state", state, "dispathc", dispatch);
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
