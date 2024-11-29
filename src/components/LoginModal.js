"use client";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logInWithEmailAndPassword, signUpWithEmailAndPassword } from "@/services/firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";

export const MODAL_TYPES = {
    LOG_IN: "LOG_IN",
    SIGN_UP: "SIGN_UP",
}

const LOGIN_ERRORS = {
    UNFILLED_FIELDS: {
        INPUT_MESSAGE: "UNFILLED_FIELDS.INPUT_MESSAGE",
        OUTPUT_MESSAGE: "You must fill out every field.",
    },
    UNEQUAL_PASSWORDS: {
        INPUT_MESSAGE: "UNEQUAL_PASSWORDS.INPUT_MESSAGE",
        OUTPUT_MESSAGE: "Both passwords need to match. Please re-enter passwords.",
    },
    // The following are all errors returned from firebase:
    INVALID_CREDENTIAL: {
        INPUT_MESSAGE: "Firebase: Error (auth/invalid-credential).",
        OUTPUT_MESSAGE: "Incorrect email or password entered.",
    },
    INVALID_EMAIL: {
        INPUT_MESSAGE: "Firebase: Error (auth/invalid-email).",
        OUTPUT_MESSAGE: "Invalid email entered."
    },
    INVALID_PASSWORD: {
        INPUT_MESSAGE: "Firebase: Password should be at least 6 characters (auth/weak-password).",
        OUTPUT_MESSAGE: "Invalid password entered. Passwords need to be at least six characters long.",
    },
    EMAIL_ALREADY_IN_USE: {
        INPUT_MESSAGE: "Firebase: Error (auth/email-already-in-use).",
        OUTPUT_MESSAGE: "This email is already being used.",
    },
}

const USER_DATA_ACTIONS = {
    UPDATE_USER_NAME: "UPDATE_USER_NAME",
    UPDATE_EMAIL: "UPDATE_EMAIL",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
    UPDATE_VERIFY_PASSWORD: "UPDATE_RE_ENTER_PASSWORD",
    CLEAR_PASSWORDS: "CLEAR_PASSWORDS",
}
const ALERT_ACTIONS = {
    SHOW_ALERT: "SHOW_ALERT",
    HIDE_ALERT: "HIDE_ALERT",
}

export default function LoginModal({ type, setModalOpen }) {
    const [userData, dispatchUserData] = useReducer(
        (userData, action) => {
            switch (action.type) {
                case USER_DATA_ACTIONS.UPDATE_USER_NAME: {
                    return {
                        ...userData,
                        userName: action.userName,
                    }
                }
                case USER_DATA_ACTIONS.UPDATE_EMAIL: {
                    return {
                        ...userData,
                        email: action.email,
                    }
                }
                case USER_DATA_ACTIONS.UPDATE_PASSWORD: {
                    return {
                        ...userData,
                        password: action.password,
                    }
                }
                case USER_DATA_ACTIONS.UPDATE_VERIFY_PASSWORD: {
                    return {
                        ...userData,
                        verifyPassword: action.verifyPassword,
                    }
                }
                case USER_DATA_ACTIONS.CLEAR_PASSWORDS: {
                    return {
                        ...userData,
                        password: "",
                        verifyPassword: type === MODAL_TYPES.SIGN_UP ? "" : null,
                    }
                }
                default: {
                    throw new Error(`Invalid type for dispatchUserData action\n\ttype = ${type}\n`);
                }
            }
        },
        {
            userName: type === MODAL_TYPES.SIGN_UP ? "" : null,
            email: "",
            password: "",
            verifyPassword: type === MODAL_TYPES.SIGN_UP ? "" : null,
        }
    );
    // const router = useNavigation();
    const router = useRouter();

    const handleUpdateUserName = (userName) => dispatchUserData({
        type: USER_DATA_ACTIONS.UPDATE_USER_NAME,
        userName,
    });
    const handleUpdateEmail = (email) => dispatchUserData({
        type: USER_DATA_ACTIONS.UPDATE_EMAIL,
        email,
    });
    const handleUpdatePassword = (password) => dispatchUserData({
        type: USER_DATA_ACTIONS.UPDATE_PASSWORD,
        password,
    });
    const handleUpdateVerifyPassword = (verifyPassword) => dispatchUserData({
        type: USER_DATA_ACTIONS.UPDATE_VERIFY_PASSWORD,
        verifyPassword,
    });

    const [alert, dispatchAlert] = useReducer(
        (_alert, action) => {
            switch (action.type) {
                case ALERT_ACTIONS.SHOW_ALERT: {
                    return {
                        showAlert: true,
                        message: action.message,
                    }
                }
                case ALERT_ACTIONS.HIDE_ALERT: {
                    return {
                        showAlert: false,
                        message: null,
                    }
                }
                default: {
                    break;
                }
            }
        },
        {
            showAlert: false,
            message: null,
        }
    );

    const handleLogin = async () => {
        // Non-firebase error handling:
        if (userData.userName === "" || userData.email === "" || userData.password === "" || userData.verifyPassword === "") {
            dispatchAlert({
                type: ALERT_ACTIONS.SHOW_ALERT,
                message: LOGIN_ERRORS.UNFILLED_FIELDS.OUTPUT_MESSAGE,
            });
            return;
        }
        if (userData.password !== userData.verifyPassword && type === MODAL_TYPES.SIGN_UP) {
            dispatchAlert({
                type: ALERT_ACTIONS.SHOW_ALERT,
                message: LOGIN_ERRORS.UNEQUAL_PASSWORDS.OUTPUT_MESSAGE,
            });
            return;
        }
        
        let errorInputMessage;
        if (type === MODAL_TYPES.LOG_IN) errorInputMessage = await logInWithEmailAndPassword(userData.email, userData.password);
        else if (type === MODAL_TYPES.SIGN_UP) errorInputMessage = await signUpWithEmailAndPassword(userData.email, userData.password);

        if (errorInputMessage !== null) {
            // Firebase error handling:
            for (const error of Object.values(LOGIN_ERRORS)) {
                if (errorInputMessage === error.INPUT_MESSAGE) {
                    dispatchAlert({
                        type: ALERT_ACTIONS.SHOW_ALERT,
                        message: error.OUTPUT_MESSAGE,
                    });
                    break;
                }
            }
        }
        // Put user on expense tracking home page.
        else router.push("/home");
    };

    const closeAlert = () => dispatchAlert({ type: ALERT_ACTIONS.HIDE_ALERT });

    useEffect(closeAlert, [userData]);

    const welcomeMessage = useMemo(() => {
        return (
            type === MODAL_TYPES.LOG_IN ? "Log In" :
            type === MODAL_TYPES.SIGN_UP ? "Sign Up" :
            null
        )
    }, []);

    const closeModal = () => setModalOpen(false);

    return (
        <Modal
            open="true"
            onClose={closeModal}
        >
            <Box className="modal-box">
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                >
                    <CloseIcon/>
                </IconButton>

                <h3>{welcomeMessage}</h3>
                
                {
                    type === MODAL_TYPES.SIGN_UP ? (
                        <TextField
                            label="User Name"
                            id="user-name"
                            type="text"
                            value={userData.userName}
                            onChange={(event) => handleUpdateUserName(event.target.value)}
                            variant="outlined"
                        />
                    ) : null
                }

                <TextField
                    label="Email"
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(event) => handleUpdateEmail(event.target.value)}
                    variant="outlined"
                />

                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    value={userData.password}
                    onChange={(event) => handleUpdatePassword(event.target.value)}
                    variant="outlined"
                />

                {
                    type === MODAL_TYPES.SIGN_UP ? (
                        <TextField
                            label="Re-enter Password"
                            id="verify-password"
                            type="password"
                            value={userData.verifyPassword}
                            onChange={(event) => handleUpdateVerifyPassword(event.target.value)}
                            variant="outlined"
                        />
                    ) : null
                }

                <br/> {/* I need to delete this <br/> tag later on. */}

                <Alert
                    severity="warning"
                    onClose={closeAlert}
                    sx={{ display: alert.showAlert ? "flex" : "none" }}
                >
                    {alert.message}
                </Alert>

                <br/> {/* I need to delete this <br/> tag later on. */}

                <Button
                    variant="contained"
                    onClick={handleLogin}
                    // disabled={showAlert}
                >
                    {welcomeMessage}
                </Button>
            </Box>
        </Modal>
    );
}