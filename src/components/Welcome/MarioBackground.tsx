import { FC, memo, useEffect, useState } from "react"
import Sky from "./Sky"
import Soil from "./Soil"
import Blocks from "./Blocks"
import { useWelcome } from "../../hooks"

type MarioBGProps = {
    spriteObj: HTMLDivElement
}

const MarioBackground: FC<MarioBGProps> = ({ spriteObj }) => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches
    const [theme, setTheme] = useState<'dark' | 'light'>(getCurrentTheme() ? 'dark' : 'light')
    const { bgRef } = useWelcome()!

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
        <div className="relative h-full w-fit" ref={bgRef}>
            <Sky theme={theme}/>
            <Blocks spriteObj={spriteObj}/>
            <Soil />
        </div>
    )
}

export default memo(MarioBackground)