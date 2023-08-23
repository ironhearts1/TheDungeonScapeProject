import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { storeModalProps } from "../types/componentTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";
import StoreBuyerItem from "./StoreBuyerItem";
import StoreSellerItem from "./StoreSellerItem";
import { generalStoreLevel1 } from "../objects/generalStoreTables";
import { findItemByName } from "../functions/utils";

const style = {
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
};

function StoreModal({ isOpen, handleModalClose }: storeModalProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleClose() {
        handleModalClose();
    }
    return (
        <div>
            <Modal className="store-modal-container" open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="store-modal">
                    <div>
                        <h1>General Store!</h1>
                        <p className="text-center">
                            Your gold:
                            {findItemByName("Coin") === -1
                                ? " 0"
                                : playerSnap.inventory.map((slot, index) => {
                                      if (slot[1] !== false) {
                                          if (slot[1].name === "Coin") {
                                              return " " + slot[0];
                                          }
                                      }
                                  })}
                        </p>
                    </div>
                    <div className="buyer-seller-wrapper">
                        <div className="store-buyer">
                            {" "}
                            <div className="player-inventory">
                                {playerState.inventory.map((elm, index) => {
                                    //@ts-ignore
                                    if (elm[1] === false) {
                                        return;
                                    }
                                    //@ts-ignore
                                    return <StoreBuyerItem elm={elm} index={index} />;
                                })}
                            </div>
                        </div>
                        <div className="store-seller">
                            {" "}
                            <div className="player-inventory">
                                {generalStoreLevel1.map((elm, index) => {
                                    //@ts-ignore
                                    if (elm[1] === false) {
                                        return;
                                    }
                                    //@ts-ignore
                                    return <StoreSellerItem elm={elm} index={index} />;
                                })}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
export default StoreModal;
