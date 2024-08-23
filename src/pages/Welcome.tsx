import { memo, useCallback, useEffect, useRef, useState } from "react"
import MarioBackground from "../components/Welcome/MarioBackground"
import MarioSprite from "../components/Welcome/MarioSprite"
import Controls from "../components/Welcome/Controls"
import Blocks from "../components/Welcome/Blocks"

const Welcome = () => {
    const divRef = useRef<HTMLDivElement>(null)
    const [atStart, setAtStart] = useState(false);
    const [atEnd, setAtEnd] = useState(false);
    const [pressedKey, setPressedKey] = useState([''])

    // Callbacks
    const checkScrollPosition = useCallback((container: HTMLElement) => {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        setAtStart(container.scrollLeft === 0);
        setAtEnd(container.scrollLeft >= maxScrollLeft);
    }, [setAtEnd, setAtStart]);

    const moveContainer = useCallback(() => {
        const key = pressedKey[0]
        const container = divRef.current
        if (container) {
            if (key === 'a' || key === 'ArrowLeft') {
                if (!atEnd)
                    container.scrollLeft -= 20
            } else if (key === 'd' || key === 'ArrowRight') {
                if (!atStart) 
                    container.scrollLeft += 20
            }
            checkScrollPosition(container)
        }
    }, [pressedKey, atStart, atEnd, checkScrollPosition])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        setPressedKey([...[e.key]])
    }, [setPressedKey])

    const onScroll = useCallback((e: Event) => {
        e.preventDefault()
    }, [])

    // useEffects
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('wheel', onScroll, {capture: true, passive: false})
        const container = divRef.current
        if (container)
            container.scrollLeft = (container.scrollWidth / 2) - container.clientWidth

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('wheel', onScroll, {capture: true})
        }
    }, [onKeyDown, onScroll])

    useEffect(() => {
        moveContainer()
    }, [moveContainer])

    useEffect(() => {
        setPressedKey([...['']])
    }, [])

    return (
        <div className="w-full h-full overflow-hidden relative" ref={divRef} style={{ touchAction: "none" }}>
            <MarioBackground />
            <MarioSprite atStart={atStart} atEnd={atEnd} pressedKey={pressedKey} containerDiv={divRef.current}/>
            <Blocks />
            <Controls pushFn={setPressedKey}/>
        </div>
    )
}

export default memo(Welcome)