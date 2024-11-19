"use client";
import { createContext, useReducer } from "react";

// creds = credentials

export const CredsContext = createContext(null);
export const CredsReducerContext = createContext(null);

export const ACTIONS = {
    UPDATE_EMAIL: "UPDATE_EMAIL",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
}

export default function CredsProvider({ children }) {
    const [creds, dispatchCreds] = useReducer(
        (creds, action) => {
            switch (action.type) {
                case ACTIONS.UPDATE_EMAIL: {
                    return {
                        ...creds,
                        email: action.newEmail,
                    }
                }
                case ACTIONS.UPDATE_PASSWORD: {
                    return {
                        ...creds,
                        password: action.newPassword,
                    }
                }
            }
        },
        {
            email: "",
            password: "",
        }
    );

    return (
        <CredsContext.Provider value={creds}>
            <CredsReducerContext.Provider value={dispatchCreds}>
                {children}
            </CredsReducerContext.Provider>
        </CredsContext.Provider>
    );
}