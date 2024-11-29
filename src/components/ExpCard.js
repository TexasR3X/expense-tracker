"use client";

export const EXP_CARD_TYPES = {
    
}

export default function ExpCard({ heading }) {
    return (
        <div className="exp-card">
            <table>
                <caption>{heading}</caption>
                <tbody>
                    <tr>
                        <td>Amount Spent</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Goal</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Balance</th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}