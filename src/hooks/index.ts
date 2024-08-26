import { useContext } from "react";
import { GlobalContext } from "../contexts/Global";

export const useGlobal = () => useContext(GlobalContext)