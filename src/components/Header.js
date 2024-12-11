"use client";
import { useContext, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Header() {
    const user = useContext(FirebaseAuthContext);
    const [popOverAnchor, setPopOverAnchor] = useState(null);

    const handleAvatarClick = (event) => {
        console.log("event.currentTarget:", event.currentTarget);
        setPopOverAnchor(event.currentTarget);
    }

    console.log("popOverAnchor:", popOverAnchor);

    return (
        <header>
            <h2>Expense Tracker</h2>

            <div>{!user ? <div>Lodaing...</div> : user?.email}</div>

            <Avatar
                onClick={handleAvatarClick}
                aria-describedby="popover"
            >
                {user?.email.slice(0, 1).toUpperCase()}
            </Avatar>
            <Popover
                id="logout-popover"
                open={!!popOverAnchor}
                anchorEl={popOverAnchor}
                onClose={() => setPopOverAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Typography sx={{ p: 2 }}>
                    <Link href="/">Log Out</Link>
                </Typography>
            </Popover>
        </header>
    );
}