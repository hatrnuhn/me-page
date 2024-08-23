import { FC, memo, useCallback, useEffect, useRef } from "react"

const CharBlock: FC<{chars: string}> = ({chars}) => {
    const hRef = useRef<HTMLHeadingElement>(null)

    const listenJumps = useCallback(() => {
        if (hRef.current) {
            const x = hRef.current.getClientRects()
            const y = hRef.current.getBoundingClientRect()
            console.log(x)
        }
    }, [])

    useEffect(() => {
        listenJumps()
    }, [listenJumps])

    return (
        <h2 className="text-[30px] px-2 flex justify-center items-center" style={{fontFamily: "RocherColor", fontVariationSettings: `"BVEL" 69, "SHDW" 100`}} ref={hRef}>{chars}</h2>
    )
}

const GenericBlock = () => {
    return (
        <svg width="41" height="42">
            <style>
                {
                    `
                        .block {
                            font-variation-settings: "BVEL" 25, "SHDW" 0;
                        }
                    `
                }
            </style>
            <text 
            className="block"
            fontFamily="RocherColor"
            fontSize="100px" x="-3" y="51" fill="red">{'•'}</text>
        </svg>
    )
}

const Blocks = () => {
    const GenericBlockMemoized = memo(GenericBlock)
    const CharBlockMemoized = memo(CharBlock)

    return (
        <div className="bottom-[250px] w-[100dvw] min-w-[1920px] absolute flex drop-shadow-md justify-center">
            {[...Array(3)].map((_, i) => <GenericBlockMemoized key={i}/>)}            
            <CharBlockMemoized chars="ME"/>
            {[...Array(6)].map((_, i) => <GenericBlockMemoized key={i} />)}
            <CharBlockMemoized chars="ST"/>
            {[...Array(4)].map((_, i) => <GenericBlockMemoized key={i} />)}
            <CharBlockMemoized chars="PS"/>
            {[...Array(2)].map((_, i) => <GenericBlockMemoized key={i} />)}
        </div>
    )
}

export default Blocks