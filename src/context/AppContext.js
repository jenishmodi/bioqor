import { createContext, useReducer } from 'react';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ADMIN_LOGGED_IN = 'SET_ADMIN_LOGGED_IN';

const initialState = {
  products: [],
  isAdminLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  const updatedState = { ...state };

  switch (action.type) {
    case SET_PRODUCTS:
      updatedState.products = [...action.products];
      return updatedState;

    case SET_ADMIN_LOGGED_IN:
      updatedState.isAdminLoggedIn = action.isLoggedIn;
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

export const setIsAdminLoggedIn = (isLoggedIn) => ({
  type: SET_ADMIN_LOGGED_IN,
  isLoggedIn,
});

const AppContextProvider = ({ children }) => {
  const [{ products, isAdminLoggedIn }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <AppContext.Provider value={{ products, isAdminLoggedIn, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
