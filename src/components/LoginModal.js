"use client";
import { useContext, useReducer, useState } from "react";
import { FIRE_BASE_LOGIN_ERRORS, logInWithEmailAndPassword, signUpWithEmailAndPassword } from "@/services/firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// import { CredsContext, CredsReducerContext } from "@/contexts/CredsContext";
import If from "./logic-components/If";

export const MODAL_TYPES = {
    LOG_IN: "LOG_IN",
    SIGN_UP: "SIGN_UP",
    NONE: "NONE",
}
const USER_DATA_ACTIONS = {
    UPDATE_USER_NAME: "UPDATE_USER_NAME",
    UPDATE_EMAIL: "UPDATE_EMAIL",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
    UPDATE_VERIFY_PASSWORD: "UPDATE_RE_ENTER_PASSWORD",
}

export default function LoginModal({ type }) {
    // const creds = useContext(CredsContext);
    // const dispatchCreds = useContext(CredsReducerContext);

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
                case USER_DATA_ACTIONS.UPDATE_RE_ENTER_PASSWORD: {
                    return {
                        ...userData,
                        verifyPassword: action.verifyPassword,
                    }
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

    const [alertMessage, setAlertMessage] = useState(null);

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
        type: USER_DATA_ACTIONS.UPDATE_RE_ENTER_PASSWORD,
        verifyPassword,
    });

    const handleLogin = async () => {
        if (!!!userData.email || !userData.password) setAlertMessage("You must fill out every field.");
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
            
            <If condition={type === MODAL_TYPES.SIGN_UP}>
                <TextField
                    label="User Name"
                    id="user-name"
                    type="text"
                    value={userData.userName}
                    onChange={(event) => handleUpdateUserName(event.target.value)}
                    variant="outlined"
                />
            </If>

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

            <If condition={type === MODAL_TYPES.SIGN_UP}>
                <TextField
                    label="Re-enter Password"
                    id="verify-password"
                    type="password"
                    value={userData.verifyPassword}
                    onChange={(event) => handleUpdateVerifyPassword(event.target.value)}
                    variant="outlined"
                />
            </If>

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
                // disabled={!creds.email || !creds.password}
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