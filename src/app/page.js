"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import {
  logInWithEmailAndPassword,
  logout,
  signUpWithEmailAndPassword,
} from "@/services/firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginModal from "@/components/LoginModal";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = useCallback(async () => {
        // If either the email or password are "" this function stops.
        console.log("email:", email);
        if (!email || !password) return;

        await logInWithEmailAndPassword(email, password);
        setPassword("");
        setEmail("");
        console.log("The user is logged in.");
    }, [email, password/*, login*/]);

    const handleSignUp = useCallback(async () => {
        // If either the email or password are "" this function stops.
        console.log("email:", email);
        if (!email || !password) return;

        await signUpWithEmailAndPassword(email, password);
        setPassword("");
        setEmail("");
        console.log("The user is signed in.");
    }, [email, password]);

    return (
        <div>
            <h1>Expense Tracker</h1>
            <h2>Sign In</h2>

            <main>
                {/* <TextField
                    label="Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outlined"
                />
                
                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant="outlined"
                /> */}

                <br/> {/* Delete this later when styles are applied. */}

                <Button
                    variant="outlined"
                    onClick={handleLogin}
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

            <LoginModal>
                <h3>Welcome Back</h3>

                <TextField
                    label="Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outlined"
                />

                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant="outlined"
                />
            </LoginModal>
        </div>
    );
}