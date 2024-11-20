"use client";
import { useContext, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CredsContext, CredsReducerContext, ACTIONS } from "@/contexts/CredsContext";
import Button from "@mui/material/Button";
import { logInWithEmailAndPassword, signUpWithEmailAndPassword } from "@/services/firebase";
import If from "./logic-components/If";

export const MODAL_TYPES = {
    LOG_IN: "LOG_IN",
    SIGN_UP: "SIGN_UP",
    NONE: "NONE",
}

export default function LoginModal({ type }) {
    const creds = useContext(CredsContext);
    const dispatchCreds = useContext(CredsReducerContext);

    const handleUpdateEmail = (newEmail) => dispatchCreds({
        type: ACTIONS.UPDATE_EMAIL,
        newEmail,
    });
    const handleUpdatePassword = (newPassword) => dispatchCreds({
        type: ACTIONS.UPDATE_PASSWORD,
        newPassword,
    });
    const handleLogin = async () => {
        if (type === MODAL_TYPES.LOG_IN) {
            logInWithEmailAndPassword(creds.email, creds.password);
        }
        else if (type === MODAL_TYPES.SIGN_UP){
            signUpWithEmailAndPassword(creds.email, creds.password);
        }
    };

    console.log("type:", type);

    return (
        <Modal
            open={type !== MODAL_TYPES.NONE}
        >
            <Box className="modal-box">
            <h3>
                <If condition={type === MODAL_TYPES.LOG_IN}>Welcome Back</If>
                <If condition={type === MODAL_TYPES.SIGN_UP}>Sign Up</If>
            </h3>
            

            <TextField
                label="Email"
                id="email"
                type="email"
                value={creds.email}
                onChange={(event) => handleUpdateEmail(event.target.value)}
                variant="outlined"
            />

            <TextField
                label="Password"
                id="password"
                type="password"
                value={creds.password}
                onChange={(event) => handleUpdatePassword(event.target.value)}
                variant="outlined"
            />

            <br/> {/* I need to delete this <br/> tag later on. */}

            <Button
                variant="outlined"
                onClick={handleLogin}
            >
                Log In
            </Button>
            </Box>
        </Modal>
    );
}