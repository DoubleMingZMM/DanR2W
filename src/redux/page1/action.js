export const INCREMENT = 'page1/INCREMENT'
export const DECREMENT = 'page1/DECREMENT'
export const RESET = 'page1/RESET'

export function increment() {
    return { type: INCREMENT }
}

export function decrement() {
    return { type: DECREMENT }
}

export function reset() {
    return { type: RESET }
}
