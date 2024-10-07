import { createContext, useState } from "react";
export const SubmitContext = createContext();

const SubmitProvider = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);

    return (
        <SubmitContext.Provider value={{isSubmit, setIsSubmit}}>
            {props.children}
        </SubmitContext.Provider>
    )
}
export default SubmitProvider;
