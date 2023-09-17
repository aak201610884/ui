import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { RoomProvider } from './context/RoomContext';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Room from './pages/Room';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import SignupEmail from './pages/user/SignupEmail';
import ForgotPassword from './pages/user/ForgotPassword ';
import ResetPassword  from './pages/user/resetPassword ';
import Massenger  from './pages/massenger/Massenger';
import CreateProfile from './pages/user/profile/CreateProfile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/profile" element={<CreateProfile/>}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/user/signup_email" element={<SignupEmail/>}/>
        <Route path="/user/forgot" element={<ForgotPassword/>}/>
        <Route path="/user/reset" element={<ResetPassword/>}/>
        <Route path="/massenger" element={<RoomProvider><Massenger /></RoomProvider>} />
        <Route path="/home" element={<RoomProvider><Home /></RoomProvider>} />
        <Route path="/room/:id" element={<RoomProvider><Room /></RoomProvider>} />
      </Routes>
  
      </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
