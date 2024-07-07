import { createContext, useContext, useState } from "react";

interface StateContextType {
    user: null | object;
    token: null | string;
    setUser: (user: object) => void;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
})

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<object>({});
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);