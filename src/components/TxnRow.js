"use client";
import { Txn, TXN_TYPES } from "@/services/database";
import Money from "./Money";
import { createRandomID } from "@/services/randomIDs";

export default function TxnRow({ data }) {
    if (data instanceof Txn) return (
        <div className="txn-row">
            <div key={createRandomID()}>
                {data.type === TXN_TYPES.BALANCE ? <strong>{data.name}</strong> : data.name}
            </div>
            <Money
                amount={data.amount}
                display="block"
                key={createRandomID()}
            />
        </div>
    );
    else if (data instanceof Goal) return (
        <div className="txn-row">
            <div key={createRandomID()}>
                {data.type === TXN_TYPES.BALANCE ? <strong>{data.name}</strong> : data.name}
            </div>
            <Money
                amount={data.amount}
                display="block"
                key={createRandomID()}
            />
        </div>
    );

    return (
        <div className="txn-row">
            <div key={createRandomID()}>{title}</div>
            <Money
                amount={data.amount}
                display="block"
                key={createRandomID()}
            />
        </div>
    );

    // return (
    //     <div className="txn-row">
    //         <div key={createRandomID()}>
    //             {data.type === TXN_TYPES.BALANCE ? <strong>{data.name}</strong> : data.name}
    //         </div>
    //         <Money
    //             amount={data.amount}
    //             display="block"
    //             key={createRandomID()}
    //         />
    //     </div>
    // );
}