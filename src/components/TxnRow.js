"use client";
import { TXN_TYPES } from "@/services/database";
import Money from "./Money";
import { createRandomID } from "@/services/randomIDs";

export default function TxnRow({ txn }) {
    return (
        <div className="txn-row">
            <div key={createRandomID()}>
                {txn.type === TXN_TYPES.BALANCE ? <strong>{txn.name}</strong> : txn.name}
            </div>
            <Money
                amount={txn.amount}
                display="block"
                key={createRandomID()}
            />
        </div>
    );
}