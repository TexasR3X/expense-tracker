"use client";
import { useCallback, useContext, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import {
  loginWithEmailAndPassword,
  logout,
  signUpWithEmailAndPassword,
} from "@/services/firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // login = true => User is logging in.
    // login = false => User is signing up.
    const [login, setLogin] = useState(false);

    const handleLogin = useCallback(async () => {
        // If either the email or password are "" stop this code.
        console.log("email:", email);
        if (!email || !password) return;

        // If logging in
        if (login) {
            await loginWithEmailAndPassword(email, password);
            console.log("The user is logged in.");
        }
        // If signing up
        else {
            await signUpWithEmailAndPassword(email, password);
            console.log("The user signed up.");
        }
    }, [email, password, login]);

    return (
        <div>
            <h1>Expense Tracker</h1>
            <h2>Sign In</h2>

            <main>
                <TextField
                    label="Email"
                    id="email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outlined"
                />
                {/* <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                /> */}
                
                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    variant="outlined"
                />
                {/* <label>
                    Password:
                    <input
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </label> */}

                <br/> {/* Delete this later when styles are applied. */}

                <Button
                    variant="contained"
                    onClick={handleLogin}
                >
                    {login ? "Login In" : "Sign Up"}
                </Button>

                <p>or</p>

                <Button
                    variant="contained"
                    onClick={() => setLogin(!login)}
                >
                    {login ? "Create an account" : "Login"}
                </Button>
            </main>
        </div>
    );
}