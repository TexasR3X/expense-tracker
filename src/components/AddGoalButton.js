"use client";
import { useCallback, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export default function AddGoalButton({ amount, type }) {
    const formatter = useMemo(() => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
    });
    const handleAddIconClick = useCallback((event) => {

    }, []);

    if (amount === "none") {
        return (
            <IconButton
                aria-label="add goal"
            >
                <AddIcon/>
            </IconButton>
        );
    }
    else {
        let formattedAmount = formatter.format(amount);

        return <div className="money">{formattedAmount}</div>;
    }


    // if (isBalance && number < 0) formattedNumber = `\u2014 ${formattedNumber}`

    // if (display === "block") return <div className="money money-block">{formattedAmount}</div>;
    // else if (display === "inline") return <span className="money money-inline">{formattedAmount}</span>;
}