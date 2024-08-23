import { memo, useEffect, useState } from "react"
import Sky from "./Sky"
import Soil from "./Soil"

const MarioBackground = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches
    const [theme, setTheme] = useState<'dark' | 'light'>(getCurrentTheme() ? 'dark' : 'light')
    
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
        const handleChange = (event: MediaQueryListEvent) => {
            setTheme(event.matches ? 'dark' : 'light')
        };
    
        mediaQuery.addEventListener('change', handleChange)
    
        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    return (
        <>
            <Sky theme={theme}/>
            <Soil />
        </>
    )
}

export default memo(MarioBackground)