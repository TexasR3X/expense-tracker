"use client";
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import Money from "@/components/Money";
import TxnRow from './TxnRow';
import { createRandomID } from '@/services/randomIDs';

export default function TxnCard({ heading, txns }) {
    console.log("txns:", txns);
    console.log("txns.createBalanceTxn():", txns.createBalanceTxn());

    return (
        <div className="txn-card">
            <h4>
                <div>{heading}</div>
                <AddIcon/>
            </h4>

            <div>
                {txns.map((txn) => <TxnRow txn={txn} key={createRandomID()}/>)}
                <TxnRow txn={txns.createBalanceTxn()} key={createRandomID()}/>
            </div>
        </div>
    );
}