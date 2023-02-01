import React from "react";
import { Link, NavLink , useNavigate } from "react-router-dom";
import "./Header.css";
import  '../theme.css';
import {useContext} from 'react';
import ThemeContext from "../context/themeContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../fireBase/config';
import { signOut } from "firebase/auth";

const Header = () => {
  const {theme,changeName} = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="myheader">
      <header className="hide-when-mobile ali ">
        <h1>
          <Link className="logo" to="/">FATHAOUI SOUFIANE ♣</Link>
        </h1>
        {/* <button onClick={() => {
          changeName(theme === "Light" ? "Dark" : "Light")          
        }}  className="theme-btn" >{theme}</button> */}
        <i onClick={() => {
          changeName(theme === "Light" ? "Dark" : "Light")          
        }} class="fa-solid fa-moon"></i>
        <i onClick={() => {
          changeName(theme === "Light" ? "Dark" : "Light")          
        }} class="fa-solid fa-sun"></i>
        <ul className="flex">
        {user &&   <li className="main-list">
            <NavLink className="main-link" to="/html">
              About
            </NavLink>
          </li>}

        {user &&   <li className="main-list">
            <NavLink className="main-link" to="/javascript">
              Profile
            </NavLink>
            
          </li>}

          {user && <li onClick={() => {
            signOut(auth).then(() => {
              // Sign-out successful.
              navigate('/Login')
            }).catch((error) => {
              // An error happened.
            });
          }} className="main-list">
            <NavLink className="main-link" >
              Sign Out
            </NavLink>
          </li>}

        {!user &&  <li className="main-list">
            <NavLink className="main-link" to="/Login">
              Log in
            </NavLink>
          </li> }
          
          {!user && <li className="main-list">
            <NavLink className="main-link" to="/SignUp">
              Sign Up
            </NavLink>
          </li> }
        </ul>
      </header>
    </div>
  );
};

export default Header;
