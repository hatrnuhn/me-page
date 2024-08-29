import { forwardRef, memo, useCallback, useEffect, useRef, useState } from "react"
import { JUMP_DURATION_MS, MOVE_STEP } from "../../constants"

type MarioSpriteProps = {
    atStart: boolean
    atEnd: boolean
    pressedKey: string[]
    containerDiv: HTMLDivElement | null
}

const MarioSprite = forwardRef<HTMLDivElement, MarioSpriteProps>(({ atEnd, atStart, pressedKey, containerDiv }, divRef) => {
    const [x, setX] = useState(0)
    const xRef = useRef<number>(x)
    const [jump, setJump] = useState(false)
    const isTransitioningRef = useRef(false)
    const jumpRef = useRef(jump)

    const moveSprite = useCallback(() => {
        const key = pressedKey[0]
        const xValue = xRef.current

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
        }

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
                        containerDiv.scrollLeft -= 2
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
                        containerDiv.scrollLeft += 2
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
    }, [pressedKey, setX, atEnd, atStart, containerDiv, divRef])

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
                className={`w-[3dvh] h-[9dvh] bg-white fixed transition-transform duration-150 bottom-[15dvh] origin-center`}
                ref={divRef}
                style={{ transform: `translateX(${x}dvw) ${jump ? 'translateY(-17dvh)' : ''}` }}
            />
        </>
    )
})

export default memo(MarioSprite)