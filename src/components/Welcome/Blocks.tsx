import { Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { useGlobal } from "../../hooks"

type CharBlockProps = { chars: string, p: string, title: string, spriteObj: HTMLDivElement | null }

const CharBlock: FC<CharBlockProps> = ({ chars, p, title, spriteObj }) => {
    const [pValue, setPValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const {pressedKey: {value: pressedKey}} = useGlobal()!
    const isShowingRef = useRef(false)
    const [isShowing, setIsShowing] = useState(false)
    const isTypingRef = useRef(false)
    const hRef = useRef<HTMLHeadingElement>(null)

    const typeWrite = useCallback((text: string, setFn: Dispatch<SetStateAction<string>>, setIsTypingWhenEnds = false) => {
        if (isShowing) {
            setPValue('')
            setTitleValue('')
            isTypingRef.current = true

            text.split("").forEach((char, index) => {
                setTimeout(() => {
                    setFn((prev) => prev + char)
                    if (text.length === index + 1 && setIsTypingWhenEnds) {
                        isTypingRef.current = false
                    }
                }, 25 * index)
            })
        }
    }, [isShowing, setPValue, setTitleValue])

    const listenJumps = useCallback(() => {
        const isTyping = isTypingRef.current
        const isShowingVal = isShowingRef.current

        if (spriteObj) {
            const key = pressedKey[0]
            const spriteRect = spriteObj.getClientRects()[0]
            const hRect = hRef.current!.getClientRects()[0]
            const hXMin = hRect.x
            const hXMax = hRect.x + hRect.width
            const spriteXCenter = spriteRect.x + (spriteRect.width / 2)
            
            if ((key === 'w' || key === 'ArrowUp') && (spriteXCenter >= hXMin && spriteXCenter <= hXMax)) {
                setTimeout(() => {
                    if (!isShowingVal && !isTyping) {
                        setIsShowing(true)
                        isShowingRef.current = true
                    }
                    else if (isShowingVal && !isTyping) {
                        setIsShowing(false)
                        isShowingRef.current = false
                    }
                }, 175)
            }
        }
    }, [pressedKey, spriteObj])

    useEffect(() => {
        listenJumps()
    }, [listenJumps])

    useEffect(() => {
        if (title.length < p.length) {
            typeWrite(title, setTitleValue)
            typeWrite(p, setPValue, true)
        } else {
            typeWrite(title, setTitleValue, true)
            typeWrite(p, setPValue)
        }
    }, [typeWrite, setTitleValue, setPValue, p, title])

    return (
        <article>
            <h2 className="text-[1.5rem] mx-[0.2rem] flex justify-center items-center" style={{fontFamily: "RocherColor", fontVariationSettings: `"BVEL" 69, "SHDW" 100`}} ref={hRef}>{chars}</h2>

            {
                isShowing &&
                <span className="absolute bottom-[2.5rem] rounded-t-[1rem] rounded-b-[0.5rem] bg-gray-800 px-[1%] py-[0.5%] text-gray-300 border-[0.3rem] border-[#7e5e4e] max-w-[20rem] -translate-x-[42%]" style={{ fontFamily: "RocherColor", fontVariationSettings: `"BVEL" 0, "SHDW" 100`, borderStyle: "ridge"}}>
                    <span className="text-[1.5rem]" aria-hidden ><b>{titleValue}</b></span>
                    <p className="text-[1rem] text-justify" dangerouslySetInnerHTML={{__html: pValue}}></p>
                </span>
            }
        </article>
    )
}

const GenericBlock = () => {
    return (
        <svg width="2rem" height="2.22rem">
            <style>
                {
                    `
                        .block {
                            font-variation-settings: "BVEL" 25, "SHDW" 0;
                        }
                    `
                }
            </style>
            <text className="block" fontFamily="RocherColor" fontSize="5rem" x="-0.19rem" y="2.7rem">
                {'•'}
            </text>
        </svg>
    )
}

type BlocksProps = {
    spriteObj: HTMLDivElement | null
}

const Blocks: FC<BlocksProps> = ({ spriteObj }) => {
    const GenericBlockMemoized = memo(GenericBlock)
    const CharBlockMemoized = memo(CharBlock)

    return (
        <div className="bottom-[40%] min-w-[1920px] z-10 w-[100dvw] absolute flex drop-shadow-md justify-center">
            {[...Array(4)].map(() => <GenericBlockMemoized key={crypto.randomUUID()}/>)}
            <CharBlockMemoized chars="ME" p="WHAT. IS. UP?! I'm Yusron. I sure love building in the Web 🕸 and I ain't even no spider 🕷!" title="On Me" spriteObj={spriteObj} />
            {[...Array(9)].map(() => <GenericBlockMemoized key={crypto.randomUUID()} />)}
            <CharBlockMemoized chars="ST" p="Language: Typescript<br>Front-end: React<br>Back-end: Node & Express<br>DB: PostgreSQL & MongoDB" title="Stack" spriteObj={spriteObj} />
            {[...Array(7)].map(() => <GenericBlockMemoized key={crypto.randomUUID()} />)}
            <CharBlockMemoized chars="PJs" p={`<a href="https://jangkau-delta.vercel.app/" target="_blank">Jangkau</a>`} title="Projects" spriteObj={spriteObj} />
            {[...Array(5)].map(() => <GenericBlockMemoized key={crypto.randomUUID()}/>)}
        </div>
    )
}

export default memo(Blocks)