"use client";
import { useState } from 'react';
import { db } from '@/services/database';
import AddIcon from '@mui/icons-material/Add';
import TxnRow, { TXN_ROW_INPUT_TYPES } from './TxnRow';
import createRandomID from '@/services/createRandomID';
import FormModal from './FormModal';
import Money from "@/components/Money";
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { sanitizeNum, sanitizeStr } from '@/services/sanitizeData';

export default function TxnCard({ type, txns, goal }) {
    const [modalOpen, setModalOpen] = useState(false);
    

    const handleAddIconClick = () => setModalOpen(true);

    const total = txns.total;
    const difference = goal?.amount - total;

    return (
        <div className="txn-card">
            <h4>
                <div>{type}</div>
                <AddIcon onClick={handleAddIconClick}/>
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


            <FormModal
                heading={`Add New ${type} Transaction`}
                submitLabel="Add Transaction"
                isOpen={modalOpen}
                closeModalFn={() => setModalOpen(false)}
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

                    const sanitizedValue0 = sanitizeStr(inputValues[0]);
                    const sanitizedValue1 = sanitizeNum(inputValues[1]);
                    console.log("sanitizedValue0:", sanitizedValue0);
                    console.log("sanitizedValue1:", sanitizedValue1);

                    if (sanitizedValue0.valid && sanitizedValue1.valid) {
                        console.log("Valid!");
                    }

                    return [
                        sanitizedValue0.valid,
                        sanitizedValue1.valid,
                    ];
                }}
            />

            {/* <FormModal
                heading={`Add New ${type} Transaction`}
                isOpen={modalOpen}
                closeModalFn={() => setModalOpen(false)}
            >
                <TextField
                    label="Transaction Name"
                    id={createRandomID()}
                    key={createRandomID()}
                    type="text"
                    // value={userData.email}
                    // onChange={(event) => handleUpdateEmail(event.target.value)}
                    variant="outlined"
                />
                <TextField
                    label="Amount"
                    id={createRandomID()}
                    key={createRandomID()}
                    type="text"
                    // value={userData.email}
                    // onChange={(event) => handleUpdateEmail(event.target.value)}
                    variant="outlined"
                />
            </FormModal> */}
        </div>
    );
}