"use client";
import { useCallback, useContext, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import {
  loginWithEmailAndPassword,
  logout,
  signUpWithEmailAndPassword,
} from "@/services/firebase";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // login = is logged in
    const [login, setLogin] = useState(false);
    

    return (
        <div>
            <h1>Expense Tracker</h1>

            <main>
                <label>Email:</label>
                <input type="email"/>

                <label>Password:</label>
                <input type="password"/>

                <label>Re-enter Password:</label>
                <input type="password"/>

                <button>Submit</button>

                <button>Create Acount</button>
            </main>
        </div>
    );
}