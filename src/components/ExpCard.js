"use client";
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import Money from "@/components/Money";

export const EXP_CARD_TYPES = {
    
}

export default function ExpCard({ heading, exp }) {
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

            </div>


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