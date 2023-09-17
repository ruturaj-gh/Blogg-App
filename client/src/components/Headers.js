import { useState, useEffect, useContext } from "react";

import { Link, redirect,Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function Headers() {
  const {setUserInfo,userInfo} =useContext(UserContext)
  

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);
     

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    
    setUserInfo(null);
    
  };
  
  const username = userInfo && userInfo.username;
  

  return (
    <header>
      <Link to="/" className="logo">
        Blog
      </Link>
      <nav>
        {username && (
          
          <>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>
              Logout 
            </a>
          </>
        )}
        {!username && (
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          
          </>
        )}
      </nav>
    </header>
  );
}
