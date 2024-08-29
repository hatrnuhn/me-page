import { FC, memo, useRef } from "react"
import { getRandomNumber } from "../../libs/random"

const Star = () => {
    const height = useRef((getRandomNumber(5, 95))).current
    const bottom = useRef((getRandomNumber(5, 60))).current

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`star absolute`} viewBox="0 0 16 16" style={{left: `${height}%`, top: `${bottom}%`}}>
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    )
}

const Stars = () => {
    return (
        <div className="h-full w-full text-yellow-100 flex overflow-hidden">
            {[[...Array(3)].map((_, i) => (
                <div className="relative grow" key={i}>
                    {[...Array(getRandomNumber(2, 4))].map(() => (
                        <Star key={crypto.randomUUID()}/>
                    ))}
                </div>
            ))]}
        </div>
    )
}

const Cloud = () => {
    const height = useRef((getRandomNumber(10, 90))).current
    const bottom = useRef((getRandomNumber(5, 60))).current

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`cloud absolute h-12 w-12`} viewBox="0 0 16 16" style={{left: `${height}%`, top: `${bottom}%`}}>
            <defs>
                <linearGradient id="grad1" x1="0%" y1="70%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f1f5f9"/>
                    <stop offset="50%" stop-color="#bfdbfe"/>
                    <stop offset="100%" stop-color="#93c5fd"/>
                </linearGradient>
            </defs>
            <path fill="url(#grad1)" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
        </svg>    
    )
}

const Clouds = () => {
    return (
        <div className="h-full w-full flex overflow-hidden">
            {[[...Array(3)].map((_, i) => (
                <div className="relative grow" key={i}>
                    {[...Array(getRandomNumber(1, 2))].map(() => (
                        <Cloud key={crypto.randomUUID()}/>
                    ))}
                </div>
            ))]}
        </div>    )
}

type SkyProps = {
    theme: 'dark' | 'light'
}

const Sky: FC<SkyProps> = ({ theme }) => {
    const StarsMemoized = memo(Stars)
    const CloudsMemoized = memo(Clouds)

    return (
        <div className="absolute h-full w-[100dvw] min-w-[1920px] sky bg-gradient-to-b from-sky-400 to-sky-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-600 z-[-1]">
            <div className="h-4/5">
                {
                    theme === 'dark' ? 
                        <StarsMemoized /> :
                        <CloudsMemoized />
                }
            </div>
        </div>
    )
}

export default memo(Sky)