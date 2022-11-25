import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export const useApp = () => {
  return useContext(AppContext);
};
