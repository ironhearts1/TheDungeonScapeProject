import React from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../store";
import { Modal, Box } from "@mui/material";
import { storeModalProps } from "../types/componentTypes";

function TravelModal({ isOpen, handleModalClose }: storeModalProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleClose() {
        handleModalClose();
    }
    const style = {
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
    };
    return (
        <div>
            <Modal className="travel-modal-container" open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="travel-modal">
                    <div>
                        <h1 className="travel-heading">Select Destination</h1>
                        <div className="level-buttons">
                            <button className="btn-level">LEVEL 1</button>
                            <button className="btn-level">LEVEL 2</button>
                            <button className="btn-level-disabled">LEVEL 3</button>
                            <button className="btn-level-disabled">LEVEL 4</button>
                            <button className="btn-level-disabled">LEVEL 5</button>
                            <button className="btn-level-disabled">LEVEL 6</button>
                            <button className="btn-level-disabled">LEVEL 7</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default TravelModal;
