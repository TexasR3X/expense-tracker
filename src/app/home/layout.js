"use client";
import { useContext } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import Nav from "@/components/Nav";

export default function Layout({ children }) {
    const user = useContext(FirebaseAuthContext);

    return (
        <div>
            <Nav/>
            {!user ? <h2>Loading...</h2> : <main>{children}</main>}
        </div>
    );
}