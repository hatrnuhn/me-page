import { createContext, RefObject } from "react";

type WelcomeContextProps = {
    bgRef: RefObject<HTMLDivElement>
    containerRef: RefObject<HTMLDivElement>
}

export const WelcomeContext = createContext<WelcomeContextProps | null>(null)