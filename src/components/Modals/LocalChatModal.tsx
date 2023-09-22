import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../../store";
import { Modal, Box } from "@mui/material";
import { storeModalProps } from "../../types/componentTypes";
import { between } from "../../functions/utils";
import { generateEnemyList } from "../../functions/fightFuncs";

function LocalChatModal({ isOpen, handleModalClose }: storeModalProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleClose() {
        handleModalClose();
    }
    function generateQuest() {
        let number = between(15, 40);
        let enemy = generateEnemyList()[0].name;
        return [number, enemy];
    }
    function handleChatOptionClick(index: number) {
        if (index === -2) {
            handleAcceptQuest();
            return;
        } else if (index === -1) {
            setLocalsChat(localChatTree[1]);
            setUserChatOptions(userChatTree[1]);
            handleClose();
            return;
        } else {
            //@ts-ignore
            setLocalsChat(localChatTree[index]);
            //@ts-ignore
            setUserChatOptions(userChatTree[index]);
        }
    }
    const [currentQuest, setCurrentQuest] = useState(generateQuest);
    function handleAcceptQuest() {
        setLocalsChat(localChatTree[1]);
        setUserChatOptions(userChatTree[1]);
        playerState.currentQuest = [currentQuest[1], currentQuest[0], currentQuest[0]];
        handleClose();
        setCurrentQuest(generateQuest());
        return;
    }
    const localChatTree = {
        1: "Welcome to our village, how may I help you",
        2: "Our village has been a starting point for adventurers like you, we are a humble collection of simple villagers who settled here for its relative safety",
        3: "Yes actually, we have been having a slight problem with robbers, could you help?",
        4: `I need you to go vanquish ${currentQuest[0]} ${currentQuest[1]}`,
    };
    const userChatTree = {
        1: [
            ["What is this place?", 2],
            ["Is there anything I can help with around here?", 3],
            ["Gotta go!", -1],
        ],
        2: [
            ["Is there anything I can help with around here?", 3],
            ["Gotta go!", -1],
        ],
        3: [
            ["Yea! Who do I need to take down for you!", 4],
            ["Sorry I can't right now, goodbye", -1],
        ],
        4: [["Perfect!", -2]],
    };
    const style = {
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
    };
    const [localsChat, setLocalsChat] = useState(localChatTree[1]);
    const [userChatOptions, setUserChatOptions] = useState(userChatTree[1]);

    return (
        <div>
            <Modal className="local-chat-modal-container" open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="travel-modal">
                    <div className="local-chat-wrapper">
                        <h2 className="locals-chat">{localsChat}</h2>
                        <div className="users-chat">
                            {userChatOptions.map((elm) => {
                                return (
                                    <button className="btn btn-primary" onClick={() => handleChatOptionClick(elm[1] as number)}>
                                        {elm[0]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default LocalChatModal;
