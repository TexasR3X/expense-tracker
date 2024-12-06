"use client";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useReducer } from "react";

const ACTIONS_TYPES = {

}

const reducerFn = (inputValues, action) => {
    switch (action.type) {
        case "": {
            return [

            ];
        }
    }
}

export default function FormModal({ heading, closeFn, children }) {
    const [inputValues, dispatch] = useReducer();

    console.log("children:", children);
    console.log("children.length:", children.length);

    // children[0].props = "123";

    console.log("T:", <TextField {...children[0].props}/>);

    return (
        <Modal
            open
            onClose={closeFn}
        >
            <Box>
                <div>
                    <h3>{heading}</h3>
                    
                    <IconButton
                        aria-label="close"
                        onClick={closeFn}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>

                <div>
                    {children}
                </div>
            </Box>
        </Modal>
    );
}

// Example:

const test = () => (
    <FormModal
        heading="My Heading"
        // closeFn={() => {}}
    >
        <TextField
            label="Transaction Name"
            id="input-txn-name"
            type="text"
            // value={userData.email}
            // onChange={(event) => handleUpdateEmail(event.target.value)}
            variant="outlined"
        />
        <TextField
            label="Amount"
            id="input-amount"
            type="text"
            // value={userData.email}
            // onChange={(event) => handleUpdateEmail(event.target.value)}
            variant="outlined"
        />
    </FormModal>
);