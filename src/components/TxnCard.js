"use client";
import { useContext, useMemo, useState } from 'react';
import { FirebaseAuthContext } from '@/contexts/FirebaseAuthContext';
import { Txn } from '@/services/database';
import MenuIcon from '@mui/icons-material/Menu';
import TxnRow, { TXN_ROW_INPUT_TYPES } from './TxnRow';
import createRandomID from '@/services/createRandomID';
import FormModal from './FormModal';
import { sanitizeNum, sanitizeStr } from '@/services/sanitizeData';
import { Timestamp } from 'firebase/firestore';
import { Button, Popover, Typography } from '@mui/material';

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

            <div>
                {txns.map((txn) => (
                    <TxnRow
                        data={txn}
                        inputType={TXN_ROW_INPUT_TYPES.TXN}
                        key={createRandomID()}
                    />
                ))}
                <TxnRow
                    data={{ amount: txns.goal }}
                    inputType={TXN_ROW_INPUT_TYPES.GOAL}
                    key={createRandomID()}
                />
                <TxnRow
                    data={{ amount: txns.total }}
                    inputType={TXN_ROW_INPUT_TYPES.TOTAL}
                    key={createRandomID()}
                />
                <TxnRow
                    data={{ amount: txns.goal - txns.total }}
                    inputType={TXN_ROW_INPUT_TYPES.DIFFERENCE}
                    key={createRandomID()}
                />
            </div>


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
                    }
                ]}
                submitFn={(inputValues) => {
                    console.log("inputValues:", inputValues);

                    const sanitizedName = sanitizeStr(inputValues[0]);
                    const sanitizedAmount = sanitizeNum(inputValues[1]);
                    console.log("sanitizedName:", sanitizedName);
                    console.log("sanitizedAmount:", sanitizedAmount);

                    if (sanitizedName.valid && sanitizedAmount.valid) {
                        console.log("Valid!");

                        const newTxn = new Txn({
                            name: sanitizedName.result,
                            type: txns.type,
                            amount: sanitizedAmount.result,
                            date: Timestamp.now(),
                        });

                        newTxn.pushToDB(user);
                    }

                    return [
                        sanitizedName.valid,
                        sanitizedAmount.valid,
                    ];
                }}
            />
        </div>
    );
}