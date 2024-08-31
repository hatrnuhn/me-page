import { memo, useCallback, useEffect, useRef, useState } from "react"
import MarioBackground from "../components/Welcome/MarioBackground"
import MarioSprite from "../components/Welcome/MarioSprite"
import Controls from "../components/Welcome/Controls"
import { useGlobal, useWelcome } from "../hooks"
import { MOVE_STEP } from "../constants"

const Welcome = () => {
    const { pressedKey: {value: pressedKey} } = useGlobal()!
    const { containerRef } = useWelcome()!
    const [atStart, setAtStart] = useState(false);
    const [atEnd, setAtEnd] = useState(false);
    const spriteRef = useRef<HTMLDivElement>(null)

    // Callbacks
    const checkScrollPosition = useCallback((container: HTMLElement) => {
        const maxScrollLeft = container.scrollLeft + container.clientWidth;
        setAtStart(container.scrollLeft === 0);
        setAtEnd(maxScrollLeft >= container.scrollWidth);
    }, [setAtEnd, setAtStart]);

    const moveContainer = useCallback(() => {
        const key = pressedKey[0]
        const container = containerRef.current
        if (container) {
            if (key === 'a' || key === 'ArrowLeft') {
                if (!atEnd)
                    container.scrollLeft -= container.scrollWidth * (MOVE_STEP / 100)
            } else if (key === 'd' || key === 'ArrowRight') {
                if (!atStart) 
                    container.scrollLeft += container.scrollWidth * (MOVE_STEP / 100)
            }
            checkScrollPosition(container)
        }
    }, [pressedKey, atStart, atEnd, checkScrollPosition, containerRef])

    // useEffects
    useEffect(() => {
        moveContainer()
    }, [moveContainer])

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.scrollLeft = container.scrollWidth / 2
        }
    }, [containerRef])

    return (
        <div className="w-full h-full overflow-hidden" ref={containerRef} style={{ touchAction: "none" }}>
            <MarioBackground spriteObj={spriteRef.current!}/>
            <MarioSprite atStart={atStart} atEnd={atEnd} pressedKey={pressedKey} ref={spriteRef}/>
            <Controls/>
        </div>
    )
}

export default memo(Welcome)