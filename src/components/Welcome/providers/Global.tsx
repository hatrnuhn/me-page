import { ReactNode, useCallback, useEffect, useState } from "react"
import { GlobalContext } from "../../../contexts/Global"

const GlobalProvider = ({ children }: { children: ReactNode}) => {
    const [pressedKey, setPressedKey] = useState<string[]>([''])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        setPressedKey([...[e.key]])
    }, [setPressedKey])


    const onScroll = useCallback((e: Event) => {
        e.preventDefault()
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('scroll', onScroll, {capture: true, passive: false})

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('wheel', onScroll, {capture: true})
        }
    }, [onKeyDown, onScroll])

    return (
        <GlobalContext.Provider value={{ pressedKey: {
            value: pressedKey,
            setPressedKey
        } }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider