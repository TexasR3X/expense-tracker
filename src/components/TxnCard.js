"use client";
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import Money from "@/components/Money";
import ExpRow from './TxnRow';
import { createRandomID } from '@/services/randomIDs';

export default function ExpCard({ heading, txns }) {
    // console.log("txn:", txn);
    // console.log("txn.forEachTxn():", txn.forEachTxn());

    const txnBody = txns.map((txn) => <ExpRow txn={txn} key={createRandomID()}/>);

    const txnFooter = 0; //////////////

    return (
        <div className="txn-card">
            <h4>
                <div>{heading}</div>
                <AddIcon/>
            </h4>

            <div>{txnBody}</div>

            <div>{txnFooter}</div>
        </div>
    );
}