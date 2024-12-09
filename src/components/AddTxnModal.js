"use client";
import CloseIcon from "@mui/icons-material/Close";
//import { Box, IconButton, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";


export default function AddTxnModal({ setModalOpen }) {

    const closeModal = () => setModalOpen(false);

    return (
        <Modal
            open="true"
            onClose={closeModal}
        >
            <Box>
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                >
                    <CloseIcon/>
                </IconButton>

                <h3>Add Transaction</h3>

                <TextField
                    label="Transaction Name"
                    id="txn-name"
                    type="text"
                    // value={userData.email}
                    // onChange={(event) => handleUpdateEmail(event.target.value)}
                    variant="outlined"
                />
            </Box>
        </Modal>
    );
}