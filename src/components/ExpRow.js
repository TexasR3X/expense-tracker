"use client";
import Money from "./Money";
import { createRandomID, createRandomKey } from "@/services/randomIDs";

export default function ExpRow({ exp }) {
    return (
        <div className="exp-row">
            <div key={createRandomID()}>{exp.name}</div>
            <Money
                amount={exp.amount}
                display="block"
                key={createRandomID()}
            />
        </div>
    );
}