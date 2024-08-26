import { Dispatch, FC, memo, SetStateAction } from "react"
import { useGlobal } from "../../hooks"

const ArrowUp: FC<{ pushFn: Dispatch<SetStateAction<string[]>>
 }> = ({ pushFn }) => {
    return (
        <button className="w-10 h-10 lg:w-12 lg:h-12" onClick={() => pushFn([...['w']])}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
        </button>
    )
}

const ArrowLeft: FC<{ pushFn: Dispatch<SetStateAction<string[]>>
}> = ({ pushFn }) => {
    return (
        <button className="w-10 h-10 lg:w-12 lg:h-12" onClick={() => pushFn([...['a']])}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
        </button>
    )
}

const ArrowRight: FC<{ pushFn: Dispatch<SetStateAction<string[]>>
}> = ({ pushFn }) => {
    return (
        <button className="w-10 h-10 lg:w-12 lg:h-12" onClick={() => pushFn([...['d']])}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
        </button>
    )
}

const Controls = () => {
    const { pressedKey: {setPressedKey: pushFn} } = useGlobal()!
    const ArrowRightMemoized = memo(ArrowRight)
    const ArrowLeftMemoized = memo(ArrowLeft)
    const ArrowUpMemoized = memo(ArrowUp)

    return (
        <div className="fixed bottom-[2%] left-1/2 flex justify-center -translate-x-1/2 w-full flex flex-col px-10 text-yellow-400 drop-shadow-xl">
    
            <div className="flex justify-between">
                <ArrowUpMemoized pushFn={pushFn}/>
                <ArrowUpMemoized pushFn={pushFn}/>
            </div>
            <div className="flex justify-between">
                <ArrowLeftMemoized pushFn={pushFn}/>
                <ArrowRightMemoized pushFn={pushFn}/>
            </div>
        </div>
    )
}

export default Controls