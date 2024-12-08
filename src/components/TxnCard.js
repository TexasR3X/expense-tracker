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
                        type: "text",
                    },
                    {
                        label: "Amount",
                        type: "number",
                        slotProps: { input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }
                    }
                ]}
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