import { forwardRef, memo, useCallback, useEffect, useRef, useState } from "react"
import { JUMP_DURATION_MS, MOVE_STEP } from "../../constants"
import { useWelcome } from "../../hooks"

type MarioSpriteProps = {
    atStart: boolean
    atEnd: boolean
    pressedKey: string[]
}

const MarioSprite = forwardRef<HTMLDivElement, MarioSpriteProps>(({ atEnd, atStart, pressedKey }, divRef) => {
    const { containerRef } = useWelcome()!
    const [x, setX] = useState(0)
    const xRef = useRef<number>(x)
    const [jump, setJump] = useState(false)
    const isTransitioningRef = useRef(false)
    const jumpRef = useRef(jump)
    const [rotate, setRotate] = useState(0)

    const moveSprite = useCallback(() => {
        const key = pressedKey[0]
        const xValue = xRef.current
        const containerDiv = containerRef.current

        if (key === 'w' || key === 'ArrowUp') {
            const jumpVal = jumpRef.current
            if (!jumpVal) {
                isTransitioningRef.current = true
                setTimeout(() => isTransitioningRef.current = false, JUMP_DURATION_MS)
                jumpRef.current = true
                setJump(true)
                setTimeout(() => {
                    setJump(false)
                    jumpRef.current = false
                }, JUMP_DURATION_MS / 2)
            }
        } else if (key === 'a' || key === 'ArrowLeft') 
            setRotate(prev => prev - 45)
        else if (key === 'd' || key === 'ArrowRight')
            setRotate(prev => prev + 45)

        if (containerDiv) {
            if (!atStart && !atEnd) {
                setX(50)
                xRef.current = 50
            }
    
            if (containerDiv && divRef && ((atStart || atEnd)) && !isTransitioningRef.current) {
                const getRatio = () =>  (containerDiv.scrollWidth / containerDiv.clientWidth )
                if (key === 'a' || key === 'ArrowLeft') {
                    if (atEnd && !atStart && xValue - MOVE_STEP <= 50) {
                        setX(50)
                        xRef.current = 50
                        containerDiv.scrollLeft -= 5
                    }
                    else {
                        if (xValue - (MOVE_STEP * getRatio()) >= 0) {
                            setX(prev => prev - (MOVE_STEP * getRatio()))
                            xRef.current -= MOVE_STEP * getRatio()
                        } else if (xValue - (MOVE_STEP * getRatio()) <= 0) {
                            setX(0)
                            xRef.current = 0
                        }
                    }
                } else if ((key === 'd' || key === 'ArrowRight')) {
                    if (atStart && !atEnd && xValue + MOVE_STEP >= 50) {
                        setX(50)
                        xRef.current = 50
                        containerDiv.scrollLeft += 5
                    } else {
                        if (xValue + (MOVE_STEP * getRatio()) <= 100 - MOVE_STEP) {
                            setX(prev => prev + (MOVE_STEP * getRatio()))
                            xRef.current += MOVE_STEP * getRatio()
                        }
                        else if (xValue + (MOVE_STEP * getRatio()) >= 100 - MOVE_STEP) {
                            setX(100 - (MOVE_STEP * getRatio()))
                            xRef.current = 100 - (MOVE_STEP * getRatio())
                        }
                    }
                }
            }
        }
    }, [pressedKey, setX, atEnd, atStart, containerRef, divRef])

    useEffect(() => {
        moveSprite()
    }, [moveSprite])

    useEffect(() => {
        setX(50)
        xRef.current = 50
    }, [])

    return (
        <>
            <div 
                className={`fixed transition-transform duration-100 bottom-[15dvh] origin-center`}
                ref={divRef}
                style={{ transform: `translateX(${x}dvw) ${jump ? 'translateY(-23dvh)' : ''}` }}
            >
                <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" className="w-[1.5rem] h-[1.5rem] transition-transform duration-150" style={{ transform: `rotate(${rotate}deg)` }}>
                    <title>indoapr112</title>
                    <style>
                        {`
                            .s0 { fill: #513d32 } 
                            .s1 { fill: #f5b944 } 
                            .s2 { fill: #ffffff } 
                            .s3 { fill: #000000 } 
                        `}
                    </style>
                    <g id="object">
                        <g id="&lt;Group&gt;">
                            <g id="&lt;Group&gt;">
                                <path id="&lt;Compound Path&gt;" fillRule="evenodd" className="s0" d="m1000 2030.6c-1334.3-23.9-1334.1-2006.9 0-2030.6 1334.3 23.9 1334.1 2006.9 0 2030.6zm0-1921.6c-1191.1 21.4-1190.9 1791.4 0 1812.6 1191-21.4 1190.9-1791.4 0-1812.6z"/>
                            </g>
                            <g id="&lt;Group&gt;">
                                <path id="&lt;Path&gt;" fillRule="evenodd" className="s1" d="m1960.8 1015.3c-31.7 1265.7-1888.6 1268.6-1921.6 0 32.2-1267.2 1889.5-1267 1921.6 0z"/>
                            </g>
                            <g id="&lt;Group&gt;" style={{opacity: '0.3'}}>
                                <path id="&lt;Path&gt;" fillRule="evenodd" className="s2" d="m606.3 290c12.5 30.6 2.9 65.9-23.3 86.1-81.1 62.7-165 143.2-224.3 227.6-108.7 154.8-125.2 305.9-189.7 296.6-64.5-9.2-86.6-108.7 22.1-307.6 34.2-73.3 325.8-481.3 415.2-302.7z"/>
                            </g>
                            <g id="&lt;Group&gt;" style={{opacity: '0.3'}}>
                                <path id="&lt;Path&gt;" fillRule="evenodd" className="s2" d="m764.1 264.7c-35.5 15.1-73.5-6.9-83.2-43-12.5-31.3 3.3-66.6 34.9-78.4 45.6-16.9 157.8-59 168 10 1.8 50.6-14.7 69-119.7 111.4z"/>
                            </g>
                            <g id="&lt;Group&gt;" style={{opacity: '0.3'}}>
                                <path id="&lt;Path&gt;" fillRule="evenodd" className="s3" d="m1669.7 326.3c3.5 3.5 7.1 7 10.6 10.5-3.5-3.5-7.1-7.1-10.8-10.5q0-0.1 0.2 0z"/>
                            </g>
                            <g id="&lt;Group&gt;" style={{opacity: '0.3'}}>
                                <path id="&lt;Path&gt;" fillRule="evenodd" className="s3" d="m1960.8 1015.3c26.6 795.7-989.3 1259.3-1575.1 738.8 297.7 74 617.5 75.7 837.1-67.1 438.2-284.8 843.8-960.4 457.5-1350.2 173.3 173.8 280.5 413.7 280.5 678.5z"/>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </>
    )
})

export default memo(MarioSprite)