import React, { createContext, useReducer } from 'react';
import RegisterForm from '../../component/RegisterForm';

const initialState = { user: null };
function reducer(state, action) {
  if ((action, type === 'setUser')) {
    return { ...state, user: action.payload };
  }
  return state;
}

export const Context = createContext;

function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={state}>
      <h2>Register your new account</h2>
      <RegisterForm />
    </Context.Provider>
  );
}

export default RegisterPage;
