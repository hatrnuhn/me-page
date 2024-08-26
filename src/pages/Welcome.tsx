import { memo, useCallback, useEffect, useRef, useState } from "react"
import MarioBackground from "../components/Welcome/MarioBackground"
import MarioSprite from "../components/Welcome/MarioSprite"
import Controls from "../components/Welcome/Controls"
import Blocks from "../components/Welcome/Blocks"
import { useGlobal } from "../hooks"
import { MOVE_STEP } from "../constants"

const Welcome = () => {
    const { pressedKey: {value: pressedKey} } = useGlobal()!
    const divRef = useRef<HTMLDivElement>(null)
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
        const container = divRef.current
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
    }, [pressedKey, atStart, atEnd, checkScrollPosition])

    // useEffects
    useEffect(() => {
        moveContainer()
    }, [moveContainer])

    useEffect(() => {
        const container = divRef.current
        if (container) {
            container.scrollLeft = container.scrollWidth / 2
        }
    }, [])

    return (
        <div className="w-full h-full overflow-hidden relative" ref={divRef} style={{ touchAction: "none" }}>
            <MarioBackground />
            <MarioSprite atStart={atStart} atEnd={atEnd} pressedKey={pressedKey} containerDiv={divRef.current} ref={spriteRef}/>
            <Blocks spriteObj={spriteRef.current}/>
            <Controls/>
        </div>
    )
}

export default memo(Welcome)