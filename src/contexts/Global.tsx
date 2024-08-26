import { createContext, Dispatch, SetStateAction } from "react";

type GlobalContextProps = {
    pressedKey: {
        value: string[],
        setPressedKey: Dispatch<SetStateAction<string[]>>
    }
}

export const GlobalContext = createContext<GlobalContextProps | null>(null)