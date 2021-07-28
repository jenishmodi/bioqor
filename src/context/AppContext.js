import { createContext, useReducer } from 'react';

export const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  const updatedState = { ...state };

  switch (action.type) {
    case SET_PRODUCTS:
      updatedState.products = [...action.products];
      return updatedState;

    default:
      return updatedState;
  }
};

export const AppContext = createContext(initialState);

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const AppContextProvider = ({ children }) => {
  const [{ products }, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ products, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
