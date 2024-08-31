import { ReactNode, useRef } from "react"
import { WelcomeContext } from "../contexts/Welcome"

const WelcomeProvider = ({ children }: { children: ReactNode }) => {
    const bgRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <WelcomeContext.Provider value={{ bgRef, containerRef }}>
            {children}
        </WelcomeContext.Provider>
    )
}

export default WelcomeProvider