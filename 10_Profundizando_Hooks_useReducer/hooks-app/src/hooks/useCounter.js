import { useState } from "react";

/**
 * @param [initialState=10] - The initial state of the counter.
 * @returns The state, increment, decrement, and reset functions.
 */
export const useCounter = (initialState = 10) => {
    const [state, setState] = useState(initialState);

    const increment = (factor = 1) => setState(state + factor)

    const decrement = (factor = 1) => setState(state - factor)

    const reset = () => setState(initialState)

    return { state, increment, decrement, reset };
};
