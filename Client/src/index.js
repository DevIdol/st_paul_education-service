import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfirmProvider } from "material-ui-confirm";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AuthSlice, { loadUser } from "./Redux/UserAuthSlice"
import UsersReducer from './Redux/User/UserSlice'
import StudentReducer from './Redux/Student/StudentSice'
import MarkReducer from './Redux/Mark/MarkSlice'
import "react-toastify/dist/ReactToastify.css";
import VisitorReducer from './Redux/VisitorSlice';
import loginStudentReducer, { loadStudent } from './Redux/StudentAuth'

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    authstudent: loginStudentReducer,
    users: UsersReducer,
    students: StudentReducer,
    marks: MarkReducer,
    visitor: VisitorReducer
  },
});
store.dispatch(loadUser(null));
store.dispatch(loadStudent(null))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </Provider>

);

