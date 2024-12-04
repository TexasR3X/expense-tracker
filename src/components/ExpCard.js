"use client";
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import Money from "@/components/Money";
import ExpRow from './ExpRow';
import { createRandomID } from '@/services/randomIDs';

export default function ExpCard({ heading, exps }) {
    // console.log("exp:", exp);
    // console.log("exp.forEachTxn():", exp.forEachTxn());

    const expBody = exps.map((exp) => <ExpRow exp={exp} key={createRandomID()}/>);

    const expFooter = 0; //////////////

    return (
        <div className="exp-card">
            <h4>
                <div>{heading}</div>
                <AddIcon/>
            </h4>

            <div>{expBody}</div>

            <div>{expFooter}</div>
        </div>
    );
}