"use client";
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import Money from "@/components/Money";
import TxnRow, { TXN_ROW_INPUT_TYPES } from './TxnRow';
import { createRandomID } from '@/services/randomIDs';

export default function TxnCard({ heading, txns, goal }) {
    console.log("goal:", goal);

    const total = txns.total;
    const difference = goal?.amount - total;

    return (
        <div className="txn-card">
            <h4>
                <div>{heading}</div>
                <AddIcon/>
            </h4>

            <div>
                {txns.map((txn) => (
                    <TxnRow
                        data={txn}
                        inputType={TXN_ROW_INPUT_TYPES.TXN}
                        key={createRandomID()}
                    />
                ))}
                {/* <TxnRow txn={txns.createBalanceTxn()} key={createRandomID()}/> */}
                <TxnRow
                    data={goal}
                    inputType={TXN_ROW_INPUT_TYPES.GOAL}
                    key={createRandomID()}
                />
                <TxnRow
                    data={{ amount: total }}
                    inputType={TXN_ROW_INPUT_TYPES.TOTAL}
                    key={createRandomID()}
                />
                <TxnRow
                    data={{ amount: difference }}
                    inputType={TXN_ROW_INPUT_TYPES.DIFFERENCE}
                    key={createRandomID()}
                />
            </div>
        </div>
    );
}