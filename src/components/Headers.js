import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function Headers() {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You must be logged in");
        }
      })
      .then((res) => {
        setUsername(res.username);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setUsername(null);
        setIsLoggedIn(false);
      });

    return () => {
      // This will be called when the component is unmounted
    };
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then(() => {
        setUsername(null);
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <header>
      <Link to="/" className="logo">
        Blog
      </Link>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/create">Create new Post</Link>
            <a href="" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
