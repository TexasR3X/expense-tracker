"use client";
import { useContext } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Avatar } from "@mui/material";

export default function Nav() {
    const user = useContext(FirebaseAuthContext);

    return (
        <nav>
            <h2>Expense Tracker</h2>

            <div>{!user ? <div>Lodaing...</div> : user?.email}</div>
            <Avatar>{user?.email.slice(0, 1).toUpperCase()}</Avatar>
        </nav>
    );
}