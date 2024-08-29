import { memo } from "react"

const Dirt = () => {
    return (
        <svg className="w-full h-[6dvh] text-yellow-700 scale-y-150 absolute top-[3.5dvh] drop-shadow dark:text-yellow-800">
            <defs>
                <pattern
                    id="dirt-pattern"
                    patternUnits="userSpaceOnUse"
                    width="15dvh"
                    height="6dvh"
                    viewBox="-3 0 6 2.25"
                >
                    <path d="M 3 0 V 2 Q 1.5 1.5 0 2 Q -1.5 2.5 -3 2 V 0" fill="currentColor"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dirt-pattern)" />
        </svg>
    )
}

const Grass = () => {
    return (
        <svg className="w-full h-[4.91dvh] text-lime-500 dark:text-lime-700 drop-shadow-lg"> 
            <defs>
                <pattern 
                    id="grass-pattern" 
                    patternUnits="userSpaceOnUse"
                    width="6.666dvh"
                    height="5dvh"
                    viewBox="-3 0 3 2.25"
                >
                    <path 
                        d="M 0 0 V 1.5 Q -1.5 3 -3 1.5 V 0"
                        fill="currentColor"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grass-pattern)" />
        </svg>
    )
}

const Soil = () => {
    const GrassMemoized = memo(Grass)
    const DirtMemoized = memo(Dirt)

    return (
        <div className="h-[15dvh] w-[100dvw] min-w-[1920px] absolute shadow bottom-0 bg-yellow-800 dark:bg-yellow-900 z-[-1]">
            <DirtMemoized />
            <GrassMemoized />
        </div>
    )
}

export default memo(Soil)