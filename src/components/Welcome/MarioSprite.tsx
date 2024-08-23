import { FC, memo, useCallback, useEffect, useRef, useState } from "react"

type MarioSpriteProps = {
    atStart: boolean
    atEnd: boolean
    pressedKey: string[]
    containerDiv: HTMLDivElement | null
}

const MarioSprite: FC<MarioSpriteProps> = ({ atEnd, atStart, pressedKey, containerDiv }) => {
    const divRef = useRef<HTMLDivElement>(null)
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
                setTimeout(() => isTransitioningRef.current = false, 300)
                jumpRef.current = true
                setJump(true)
                setTimeout(() => {
                    setJump(false)
                    jumpRef.current = false
                }, 150)
            }
        }

        if (containerDiv) {
            const { clientWidth } = containerDiv

            if (!atStart && !atEnd) {
                setX(clientWidth / 2)
                xRef.current = clientWidth / 2
            }
    
            if (containerDiv && divRef.current && ((atStart || atEnd)) && !isTransitioningRef.current) {
                if (key === 'a' || key === 'ArrowLeft') {
                    if (atEnd && !atStart && xValue - 20 < clientWidth / 2) {
                        setX(clientWidth / 2)
                        xRef.current = clientWidth /2
                        containerDiv.scrollLeft -= 20
                    }
                    else {
                        if (xValue - 20 > 0) {
                            setX(prev => prev - 20)
                            xRef.current -= 20
                        } else if (xValue - 20 <= 0) {
                            setX(1)
                            xRef.current = 1
                        }
                    }
                } else if ((key === 'd' || key === 'ArrowRight')) {
                    if (atStart && !atEnd && xValue + 20 > clientWidth / 2) {
                        setX(clientWidth / 2)
                        xRef.current = clientWidth / 2
                        containerDiv.scrollLeft += 20
                    } else {
                        if (xValue + 20 < clientWidth) {
                            setX(prev => prev + 20)
                            xRef.current += 20
                        }
                        else if (xValue + 20 >= clientWidth) {
                            setX(clientWidth - divRef.current.offsetWidth)
                            xRef.current = clientWidth - divRef.current.offsetWidth
                        }
    
                    }
                }
            }
        }
    }, [pressedKey, setX, atEnd, atStart, containerDiv])

    useEffect(() => {
        moveSprite()
    }, [moveSprite])

    useEffect(() => {
        if (containerDiv) {
            const initialX = containerDiv.clientWidth / 2
            setX(initialX)
            xRef.current = initialX
        }
    }, [setX, containerDiv])

    useEffect(() => {
        if ((atStart || atEnd) && containerDiv && x === 0) {
            const initialX = containerDiv.clientWidth / 2
            setX(initialX)
            xRef.current = initialX
        }
    }, [atStart, atEnd, x, containerDiv])

    return (
        <>
            <div 
                className={`w-4 h-12 bg-white fixed transition-transform duration-150 bottom-[80px]`}
                ref={divRef}
                style={{ transform: `translateX(${x}px) ${jump ? 'translateY(-130px)' : ''}` }}
            />
        </>
    )
}

export default memo(MarioSprite)