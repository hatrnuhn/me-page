import { memo, useCallback, useEffect, useRef, useState } from "react"
import './displayBoard.css'
import { setRandomInterval } from "../../../libs/random"

const DisplayBoard = () => {
    const [isFlickering, setIsFlickering] = useState(false)
    const [isGlowing, setIsGlowing] = useState(false)
    const pRef = useRef<HTMLParagraphElement>(null)
    
    const randomFlick = useCallback(() => {
        const randomInterval = setRandomInterval(() => {
            setIsFlickering(true)
            setTimeout(() => {
                setIsFlickering(false)
                setIsGlowing(true)
            }, 7000)
        }, 10000, 30000)

        return randomInterval
    }, [])

    useEffect(() => {
        const flickInterval = randomFlick()

        return (() => {
            flickInterval.clear()
        })
    }, [randomFlick])

    useEffect(() => {
        setIsFlickering(true)
        const timeout1 = setTimeout(() => {
            setIsFlickering(false)
            setIsGlowing(true)
        }, 7000)

        return (() => {
            clearTimeout(timeout1)
        })
    }, [setIsFlickering])

    useEffect(() => {
        let timeout2: number
        if (isFlickering)
            timeout2 = setTimeout(() => {
                setIsGlowing(false)
            }, 2500)

        return (() => {
            clearTimeout(timeout2)
        })
    }, [isFlickering])

    return (
        <div className="drop board">
            <div className="px-4 py-2 bg-gray-900 md:px-6 md:py-3 board-front rounded-sm">
                <p className={`flex text-black grow max-w-[10rem] font-bold text-xl whitespace-nowrap uppercase bg-gray-700 overflow-hidden rounded-sm ${isGlowing ? 'glow' : ''} ${isFlickering ? 'board-flicker' : ''} md:max-w-[20rem] md:text-3xl`} style={{fontFamily: `"VT323", monospace`}} ref={pRef}>
                    <span className="pan-start md:pan-start-md">
                        <span className="flex gap-[15%] pan-infinite text-yellow-300">
                            <span className={`${isGlowing ? 'text-glow' : 'opacity-0'} ${isFlickering ? 'board-flicker-text' : ''}`}>
                                {'Hi, warmest welcome to you!'}
                            </span>
                            <span aria-hidden className={`${isGlowing ? 'text-glow' : 'opacity-0'} ${isFlickering ? 'board-flicker-text' : ''}`}>
                                {'Hi, warmest welcome to you!'}
                            </span>
                            <span aria-hidden className={`${isGlowing ? 'text-glow' : 'opacity-0'} ${isFlickering ? 'board-flicker-text' : ''}`}>
                                {'Hi, warmest welcome to you!'}
                            </span>
                        </span>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default memo(DisplayBoard)