import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { storeModalProps } from "../types/componentTypes";

const style = {
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
};

function StoreModal({ isOpen, handleModalClose }: storeModalProps) {
    function handleClose() {
        handleModalClose();
    }
    return (
        <div>
            <Modal className="store-modal-container" open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="store-modal">
                    <h1>General Store!</h1>
                </Box>
            </Modal>
        </div>
    );
}
export default StoreModal;
