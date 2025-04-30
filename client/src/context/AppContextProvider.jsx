import { useEffect, useState } from "react";
import { AppContent } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContextProvider = ({ children }) => {

  axios.defaults.withCredentials = true

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});


  const getAuthState = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
      if (data.success) {
        setIsLoggedin(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserData = async () => {
    try {
      const { data: responseData } = await axios.get(backendUrl + '/api/user/data');
      console.log(responseData);
      responseData.success
        ? setUserData(responseData.userData || {})
        : toast.error(responseData.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    getAuthState()
  }, [])

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {children}
    </AppContent.Provider>
  );
};