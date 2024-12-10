"use client";
import { useContext, useMemo, useState } from 'react';
import { FirebaseAuthContext } from '@/contexts/FirebaseAuthContext';
import { Txn } from '@/services/database';
import MenuIcon from '@mui/icons-material/Menu';
import TxnRow, { TXN_ROW_INPUT_TYPES } from './TxnRow';
import createRandomID from '@/services/createRandomID';
import FormModal from './FormModal';
import { sanitizeDate, sanitizeNum, sanitizeStr } from '@/services/sanitizeData';
import { Timestamp } from 'firebase/firestore';
import { Button, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { printDate, printMoney } from '@/util/printData';

export default function TxnCard({ txns }) {
    const user = useContext(FirebaseAuthContext);

    // const type = useMemo(() => txns.type, [txns]);
    // const goal = useMemo(() => txns.goal, [txns]);
    const [txnModalOpen, setTxnModalOpen] = useState(false);
    const [popOverAnchor, setPopOverAnchor] = useState(null);
    

    const handleMenuIconClick = (event) => {
        setPopOverAnchor(event.currentTarget);
    }

    const handlePopoverButtonClick = () => {
        setTxnModalOpen(true);
        setPopOverAnchor(null);
    }

    // const total = txns.total;
    // const difference = goal - total;

    return (
        <div className="txn-card">
            <h4>
                <div>{txns.type}</div>

                <MenuIcon
                    onClick={handleMenuIconClick}
                    aria-describedby="popover"
                />
                <Popover
                    id="popover"
                    open={!!popOverAnchor}
                    anchorEl={popOverAnchor}
                    onClose={() => setPopOverAnchor(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Typography sx={{ p: 2 }}>
                        <Button
                            onClick={handlePopoverButtonClick}
                            variant="text"
                        >
                            Add New Transaction
                        </Button>
                    </Typography>
                </Popover>
            </h4>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className="bolded-row">
                            <TableCell align="center">Transaction</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {txns.map((txn) => (
                            <TableRow key={`txn key: ${txn.docID}`}>
                                <TableCell align="center">{txn.name}</TableCell>
                                <TableCell align="center">{printMoney(txn.amount)}</TableCell>
                                <TableCell align="center">{printDate(txn.date)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            className="bolded-row"
                            key={`txn key: goal`}
                        >
                            <TableCell align="center">Goal</TableCell>
                            <TableCell align="center">{printMoney(txns.goal.amount)}</TableCell>
                            <TableCell align="center">{printDate(txns.goal.date)}</TableCell>
                        </TableRow>
                        <TableRow
                            className="bolded-row"
                            key={`txn key: total`}    
                        >
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">{printMoney(txns.total)}</TableCell>
                            <TableCell align="center">{printDate(null)}</TableCell>
                        </TableRow>
                        <TableRow
                            className="bolded-row"
                            key={`txn key: difference`}
                        >
                            <TableCell align="center">Difference</TableCell>
                            <TableCell align="center">{printMoney(txns.goal.amount - txns.total)}</TableCell>
                            <TableCell align="center">{printDate(null)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <div>
                {txns.map((txn) => (
                    <TxnRow
                        data={txn}
                        inputType={TXN_ROW_INPUT_TYPES.TXN}
                        key={createRandomID()}
                    />
                ))}
                <TxnRow
                    data={{ amount: txns.goal.amount }}
                    inputType={TXN_ROW_INPUT_TYPES.GOAL}
                    key={createRandomID()}
                />
                <TxnRow
                    data={{ amount: txns.total }}
                    inputType={TXN_ROW_INPUT_TYPES.TOTAL}
                    key={createRandomID()}
                />
                <TxnRow
                    data={{ amount: txns.goal.amount - txns.total }}
                    inputType={TXN_ROW_INPUT_TYPES.DIFFERENCE}
                    key={createRandomID()}
                />
            </div> */}


            <FormModal
                heading={`Add New ${txns.type} Transaction`}
                submitLabel="Add Transaction"
                isOpen={txnModalOpen}
                closeModalFn={() => setTxnModalOpen(false)}
                textFieldData={[
                    {
                        label: "Transaction Name",
                    },
                    {
                        label: "Amount",
                        // type: "number",
                        // slotProps: { input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } },
                    },
                    {
                        label: "Date Spent",
                        type: "date",
                        // Force the label to stay above the text field
                        slotProps: { inputLabel: { shrink: true } },
                    },
                ]}
                submitFn={(inputValues) => {
                    const sanitizedName = sanitizeStr(inputValues[0]);
                    const sanitizedAmount = sanitizeNum(inputValues[1]);
                    const sanitizedDate = sanitizeDate(inputValues[2]);

                    console.log("");
                    console.log("inputValues[2]:", inputValues[2]);
                    console.log("typeof inputValues[2]:", typeof inputValues[2]);
                    console.log("");

                    // Code that runs during a successful submit.
                    if (sanitizedName.valid && sanitizedAmount.valid && sanitizedDate.valid) {
                        const newTxn = new Txn({
                            name: sanitizedName.result,
                            type: txns.type,
                            amount: sanitizedAmount.result,
                            date: sanitizedDate.result,
                        });
                        newTxn.pushToDB(user);
                    }

                    // Returns which <Textfield>s had errors.
                    return [
                        sanitizedName.valid,
                        sanitizedAmount.valid,
                        sanitizedDate.valid,
                    ];
                }}
            />
        </div>
    );
}