"use client";
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import Money from "@/components/Money";
import ExpRow from './ExpRow';
import { createRandomID } from '@/services/randomIDs';

export const EXP_CARD_TYPES = {
    
}

export default function ExpCard({ heading, exps }) {
    // console.log("exp:", exp);
    // console.log("exp.forEachTxn():", exp.forEachTxn());

    return (
        <div className="exp-card">
            <h4>
                <div>
                    {heading}
                </div>
                <AddIcon/>
            </h4>

            <div>
                {exps.map((exp) => <ExpRow exp={exp} key={createRandomID()}/>)}
            </div>

            {/* <div>
                {!!exps.length ? (
                    exps.map((exp) => <ExpRow exp={exp} key={createRandomID()}/>)
                ) : (
                    <div className="exp-empty-message">There are no expenses under this category.</div>
                )}
            </div> */}


            {/* <table>
                <tbody>
                    <tr>
                        <td>Amount Spent</td>
                        <td>
                            <Money number={1}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Goal</td>
                        <td>
                            <Money number={2}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Balance</th>
                        <th>
                            <Money
                                number={-3.14159}
                                // balanceThing = {}
                            />
                        </th>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}