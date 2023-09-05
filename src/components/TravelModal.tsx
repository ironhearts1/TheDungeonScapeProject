import React from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../store";
import { Modal, Box } from "@mui/material";
import { storeModalProps } from "../types/componentTypes";

function TravelModal({ isOpen, handleModalClose }: storeModalProps) {
    const LEVELS = ["LEVEL 1", "LEVEL 2", "LEVEL 3", "LEVEL 4", "LEVEL 5", "LEVEL 6", "LEVEL 7"];
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleClose() {
        handleModalClose();
    }
    function handleTravel(newLocaiton: number) {
        playerState.location = newLocaiton;
        handleClose();
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
                            {LEVELS.map((level, index) => {
                                let levelCheck = playerState.bossesKilled.indexOf(index);
                                console.log(levelCheck);
                                if (levelCheck > -1) {
                                    return (
                                        <button className="btn-level level-enabled" onClick={() => handleTravel(index + 1)}>
                                            {level}
                                        </button>
                                    );
                                } else {
                                    return <button className="btn-level level-disabled">{level}</button>;
                                }
                            })}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default TravelModal;
