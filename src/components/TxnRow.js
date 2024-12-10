"use client";
import { Goal, Txn, TXN_TYPES } from "@/services/database";
import Money from "./Money";
import createRandomID from "@/services/createRandomID";

export const TXN_ROW_INPUT_TYPES = {
    TXN: "TXN",
    GOAL: "GOAL",
    TOTAL: "TOTAL",
    DIFFERENCE: "DIFFERENCE",
}

export default function TxnRow({ data, inputType }) {
    let title;
    let className = `txn-row ${inputType !== TXN_ROW_INPUT_TYPES.TXN && "txn-overal-data"}`;

    if (inputType === TXN_ROW_INPUT_TYPES.TXN) {
        title = data.name;
    }
    else if (inputType === TXN_ROW_INPUT_TYPES.GOAL) {
        title = "Goal";
    }
    else if (inputType === TXN_ROW_INPUT_TYPES.TOTAL) {
        title = "Total";
    }
    else if (inputType === TXN_ROW_INPUT_TYPES.DIFFERENCE) {
        title = "Difference";
    }

    return (
        <div className={className}>
            <div key={createRandomID()}>{title}</div>
            <Money
                amount={data?.amount}
                display="block"
            />
        </div>
    );
}