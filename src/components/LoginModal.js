"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function LoginModal({ children }) {

    return (
        <Modal
            open={true}
        >
            <Box className="modal-box">
                {children}
            </Box>
        </Modal>
    );
}