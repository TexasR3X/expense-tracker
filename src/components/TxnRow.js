"use client";
import Money from "./Money";
import { createRandomID } from "@/services/randomIDs";

export default function ExpRow({ txn }) {
    return (
        <div className="txn-row">
            <div key={createRandomID()}>{txn.name}</div>
            <Money
                amount={txn.amount}
                display="block"
                key={createRandomID()}
            />
        </div>
    );
}