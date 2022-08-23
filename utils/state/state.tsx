import React, { createContext, useContext, useReducer } from "react";
import cartHelper from '../cart-helper';


import { Action } from './reducer';

export type State = {
  cartBadge: number
};


const initialState: State = {
  cartBadge: cartHelper.totalItems()
};


export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
