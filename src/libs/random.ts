export const setRandomInterval = (cb: () => void, minDelay: number, maxDelay: number) => {
    let timeout: number;

    const runInterval = () => {
        const timeoutFn = () => {
            cb()
            runInterval()
        }

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

        timeout = setTimeout(timeoutFn, delay)
    }

    runInterval()

    return {
        clear() { clearTimeout(timeout) }
    }
}

export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
  