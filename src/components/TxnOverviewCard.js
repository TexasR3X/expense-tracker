"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Money from "./Money";
import AddGoalButton from "./AddGoalButton";
import DateDisplay from "./DateDisplay";


export default function TxnOverviewCard({ txnCollection }) {
    return (
        <div className="txn-overview-card">
            <h4>Expense Overview</h4>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Goal</TableCell>
                            <TableCell align="center">Due Date</TableCell>
                            {/* <TableCell align="right">Difference</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {txnCollection.map((txnGroup) => {
                            return (
                                <TableRow key={`TableRow key: ${txnGroup.type}`}>
                                    <TableCell align="center">
                                        {txnGroup.type}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Money amount={txnGroup.total}/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <AddGoalButton
                                            goal={txnGroup.goal}
                                            // amount={txnGroup.goal.amount}
                                            // type={txnGroup.type}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <DateDisplay date={txnGroup.goal.date}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {/* {TXN_TYPES.map((txn) => (
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        ))} */}

                        {/* <TableRow>
                            <TableCell align="center">Food</TableCell>
                            <TableCell align="center">$900.00</TableCell>
                            <TableCell align="center">$151.98</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Education</TableCell>
                            <TableCell align="center">$1400.00</TableCell>
                            <TableCell align="center">$400.00</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}