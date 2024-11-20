"use client";
import { useContext, useState } from "react";
import { FIRE_BASE_LOGIN_ERRORS, logInWithEmailAndPassword, signUpWithEmailAndPassword } from "@/services/firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { CredsContext, CredsReducerContext, ACTIONS } from "@/contexts/CredsContext";
import If from "./logic-components/If";

export const MODAL_TYPES = {
    LOG_IN: "LOG_IN",
    SIGN_UP: "SIGN_UP",
    NONE: "NONE",
}

export default function LoginModal({ type }) {
    const creds = useContext(CredsContext);
    const dispatchCreds = useContext(CredsReducerContext);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleUpdateEmail = (newEmail) => dispatchCreds({
        type: ACTIONS.UPDATE_EMAIL,
        newEmail,
    });
    const handleUpdatePassword = (newPassword) => dispatchCreds({
        type: ACTIONS.UPDATE_PASSWORD,
        newPassword,
    });
    const handleLogin = async () => {
        if (!creds.email || !creds.password) setAlertMessage("You must fill out every field.");
        else if (type === MODAL_TYPES.LOG_IN) {
            const errorMessage = await logInWithEmailAndPassword(creds.email, creds.password);

            switch (errorMessage) {
                case FIRE_BASE_LOGIN_ERRORS.INVALID_EMAIL: {
                    setAlertMessage("Invalid email entered");
                    break;
                }
                case FIRE_BASE_LOGIN_ERRORS.INVALID_PASSWORD: {
                    setAlertMessage("Invalid password entered");
                    break;
                }
            }
        }
        else if (type === MODAL_TYPES.SIGN_UP){
            const errorMessage = await signUpWithEmailAndPassword(creds.email, creds.password);

            console.log("errorMessage:", errorMessage);

            switch (errorMessage) {
                case FIRE_BASE_LOGIN_ERRORS.INVALID_EMAIL: {
                    setAlertMessage("Invalid email entered.");
                    break;
                }
                case FIRE_BASE_LOGIN_ERRORS.INVALID_PASSWORD: {
                    setAlertMessage("Invalid password entered. Password needs to be at least six characters long.");
                    break;
                }
            }
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

            <Alert
                severity="warning"
                onClose={() => {}}
                display={!alertMessage ? "block" : "none" }
            >
                {alertMessage}
            </Alert>

            <br/> {/* I need to delete this <br/> tag later on. */}

            <Button
                variant="contained"
                onClick={handleLogin}
                disabled={!creds.email || !creds.password}
            >
                {
                    type === MODAL_TYPES.LOG_IN ? "Log In" :
                    type === MODAL_TYPES.SIGN_UP ? "Sign Up" :
                    null
                }
            </Button>
            </Box>
        </Modal>
    );
}