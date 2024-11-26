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
import { useRouter } from "next/router";

export default function LogIn() {
    // const user = useContext(FirebaseAuthContext);
    const [modelOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const handleLogIn = () => {
        setModalOpen(true);
        setModalType(MODAL_TYPES.LOG_IN);
    }
    const handleSignUp = () => {
        setModalOpen(true);
        setModalType(MODAL_TYPES.SIGN_UP);
    }

    return (
        <div>
            <h1>Expense Tracker</h1>
            <h2>Sign In</h2>

            <main>
                <Button
                    variant="outlined"
                    onClick={handleLogIn}
                >
                    Log In
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
            </main>

            {modelOpen ? <LoginModal type={modalType} onClose={setModalOpen}/> : null}
        </div>
    );
}