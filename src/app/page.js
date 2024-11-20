"use client";
import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import {
  logInWithEmailAndPassword,
  logout,
  signUpWithEmailAndPassword,
} from "@/services/firebase";
import Button from "@mui/material/Button";
import LoginModal, { MODAL_TYPES } from "@/components/LoginModal";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [modalType, setModalType] = useState(MODAL_TYPES.NONE)

    // const handleLogin = useCallback(async () => {
    //     // If either the email or password are "" this function stops.
    //     console.log("email:", email);
    //     if (!email || !password) return;

    //     await logInWithEmailAndPassword(email, password);
    //     setPassword("");
    //     setEmail("");
    //     console.log("The user is logged in.");
    // }, [email, password/*, login*/]);

    // const handleSignUp = useCallback(async () => {
    //     // If either the email or password are "" this function stops.
    //     console.log("email:", email);
    //     if (!email || !password) return;

    //     await signUpWithEmailAndPassword(email, password);
    //     setPassword("");
    //     setEmail("");
    //     console.log("The user is signed in.");
    // }, [email, password]);

    return (
        <div>
            <h1>Expense Tracker</h1>
            <h2>Sign In</h2>

            <main>
                <Button
                    variant="outlined"
                    onClick={() => setModalType(MODAL_TYPES.LOG_IN)}
                >
                    Log In
                </Button>

                <Button
                    variant="contained"
                    onClick={() => setModalType(MODAL_TYPES.SIGN_UP)}
                >
                    Sign Up
                </Button>
            </main>

            <LoginModal type={modalType}/>
        </div>
    );
}