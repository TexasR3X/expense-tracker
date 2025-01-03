"use client";
import { useEffect, useState } from "react";
import { logout } from "@/services/firebase";
import Button from "@mui/material/Button";
import LoginModal, { LOGIN_MODAL_TYPES } from "@/components/Modals/LoginModal";

export default function LogIn() {
    // const user = useContext(FirebaseAuthContext);
    const [modelOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const handleLogIn = () => {
        setModalOpen(true);
        setModalType(LOGIN_MODAL_TYPES.LOG_IN);
    }
    const handleSignUp = () => {
        setModalOpen(true);
        setModalType(LOGIN_MODAL_TYPES.SIGN_UP);
    }

    useEffect(() => {
        logout();
    }, []);

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

            {modelOpen ? <LoginModal type={modalType} setModalOpen={setModalOpen}/> : null}
        </div>
    );
}