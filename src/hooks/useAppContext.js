// useAppContext.js
import { useContext } from "react";
import AppContext from "../Context/AppContextProvider";

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;