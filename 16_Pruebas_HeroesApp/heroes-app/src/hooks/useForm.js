import { useState } from "react";

/**
 * @param [initialState] - The initial state of the form.
 * @returns The values object, the handleInputChange function, and the reset function.
 */
export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => setValues(initialState)

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInputChange, reset]
}