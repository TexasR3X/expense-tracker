"use client";
import { useContext, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CredsContext, CredsReducerContext, ACTIONS } from "@/contexts/CredsContext";
import Button from "@mui/material/Button";
import { logInWithEmailAndPassword } from "@/services/firebase";

export default function LoginModal({ open, children }) {
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
        console.log("creds.email:", creds.email);
        logInWithEmailAndPassword(creds.email, creds.password);
    };

    return (
        <Modal
            open={open}
            // open={false}
        >
            <Box className="modal-box">
            <h3>Welcome Back</h3>

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

            <br></br>

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