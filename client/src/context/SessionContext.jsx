import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";

const SessionContext = React.createContext({});

const SessionProvider = ({ children }) => {
  /**
   *
   * The `user` object represents a user in the system.
   *
   * @typedef {Object} User
   * @property {string} _id The user's ID.
   * @property {string} email The user's email address.
   * @property {string} password The user's password.
   * @property {string} role The user's role.
   * @property {string} createdAt The user's creation date.
   * @property {number} __v The version number of the user.
   *
   */
  const [sessionUser, setSessionUser] = useState(/** @type {User} */ null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const sessionUser = localStorage.getItem("sessionUser");
  //   if (sessionUser) {
  //     try {
  //       const user = JSON.parse(sessionUser);
  //       setSessionUser(user);
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       // The session data is invalid, so clear it
  //       localStorage.removeItem("sessionUser");
  //       setSessionUser(null);
  //       setIsAuthenticated(false);
  //     }
  //   }
  // }, []);

  const getUserData = async () => {
    setLoading(true);
    setIsAuthenticated(false);

    try {
      const { data } = await axios.get(`/api/session/getUserData`);

      setSessionUser(data.user);
      setIsAuthenticated(true);

      setLoading(false);

      // Save the user data to localStorage
      localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const register = async (user) => {
    setLoading(true);
    setIsAuthenticated(false);

    try {
      const { data } = await axios.post(`/api/session/register`, user);

      setSessionUser(data.user);
      setIsAuthenticated(true);

      setLoading(false);

      // Save the user data to localStorage
      localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setIsAuthenticated(false);

    try {
      const { data } = await axios.post(`/api/session/login`, {
        email,
        password,
      });
      setSessionUser(data.user);
      setIsAuthenticated(true);

      setLoading(false);

      // Save the user data to localStorage
      localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setSessionUser({});
    setIsAuthenticated(false);
    setLoading(false);

    // Remove the user data from localStorage
    localStorage.removeItem("sessionUser");
  };

  return (
    <SessionContext.Provider
      value={{
        sessionUser,
        setSessionUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        error,
        setError,
        getUserData,
        register,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);

  return context;
};

export { SessionProvider, useSession };
