import { useContext } from "react";
import { GlobalContext } from "../contexts/Global";
import { WelcomeContext } from "../contexts/Welcome";

export const useGlobal = () => useContext(GlobalContext)
export const useWelcome = () => useContext(WelcomeContext)