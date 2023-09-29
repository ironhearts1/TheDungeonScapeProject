import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../../store";
import { Modal, Box } from "@mui/material";
import { localChatModalProps, storeModalProps } from "../../types/componentTypes";
import { between, resetQuest, saveToDatabase } from "../../functions/utils";
import { addDropToInventory, generateEnemyList } from "../../functions/fightFuncs";
import { Quest } from "../../types/miscTypes";
import { coin } from "../../objects/items/items";

function LocalChatModal({ isOpen, handleModalClose, updateConsole }: localChatModalProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleClose() {
        setLocalsChat(localChatTree[1]);
        setUserChatOptions(userChatTree[1]);
        handleModalClose();
    }
    function generateQuest(): Quest {
        let number = between(15, 40);
        let enemy = generateEnemyList()[0].name;
        return [enemy, number];
    }
    function handleChatOptionClick(index: number, elmText: string) {
        if (index === -2) {
            handleAcceptQuest();
            return;
        } else if (index === -1) {
            handleClose();
            return;
        } else if (index === -3) {
            addDropToInventory([coin, 500 * playerState.currentQuest.questLevel], updateConsole);
            resetQuest();
            saveToDatabase();
            handleClose();
            return;
        } else if (index === -4) {
            let experienceType = elmText.split(" ")[0];
            let experienceAmount = 275 * playerState.currentQuest.questLevel;
            if (experienceType === "Defense") {
                playerState.xp.hpXP += Math.floor((1 / 4) * experienceAmount);
                playerState.xp.defenseXP += Math.floor(experienceAmount);
            } else if (experienceType === "Strength") {
                playerState.xp.hpXP += Math.floor((1 / 4) * experienceAmount);
                playerState.xp.strengthXP += Math.floor(experienceAmount);
            } else {
                playerState.xp.hpXP += Math.floor((1 / 4) * experienceAmount);
                playerState.xp.attackXP += Math.floor(experienceAmount);
            }
            resetQuest();
            saveToDatabase();
            handleClose();
            return;
        } else if (index === 3 && playerState.currentQuest.questEnemy !== "None") {
            setLocalsChat(localChatTree[5]);
            setUserChatOptions(userChatTree[5]);
        } else if (index === 6 && playerState.currentQuest.killsLeft > 0) {
            setLocalsChat(localChatTree[7]);
            setUserChatOptions(userChatTree[7]);
        } else if (index === 6 && playerState.currentQuest.questEnemy === "None") {
            setLocalsChat(localChatTree[8]);
            setUserChatOptions(userChatTree[8]);
        } else {
            //@ts-ignore
            setLocalsChat(localChatTree[index]);
            //@ts-ignore
            setUserChatOptions(userChatTree[index]);
        }
    }
    const [currentQuest, setCurrentQuest] = useState<Quest>(generateQuest);
    function handleAcceptQuest() {
        setLocalsChat(localChatTree[1]);
        setUserChatOptions(userChatTree[1]);
        playerState.currentQuest.questEnemy = currentQuest[0];
        playerState.currentQuest.questGoal = currentQuest[1];
        playerState.currentQuest.killsLeft = currentQuest[1];

        handleClose();
        setCurrentQuest(generateQuest());
        return;
    }
    const localChatTree = {
        1: "Welcome to our village, how may I help you",
        2: "Our village has been a starting point for adventurers like you, we are a humble collection of simple villagers who settled here for its relative safety",
        3: "Yes actually, we have been having a slight problem with robbers, could you help?",
        4: `I need you to go vanquish ${currentQuest[0]} ${currentQuest[1]}`,
        5: `You actually already have a quest from me! You need to kill ${playerState.currentQuest.questGoal} ${playerState.currentQuest.questEnemy}`,
        6: "Thank you for your help, please accept this reward as a thanks from our village. Please pick your preference.",
        7: "You have more to go with your quest, please help us!",
        8: "You have no quest!",
    };
    const userChatTree = {
        1: [
            ["What is this place?", 2],
            ["Is there anything I can help with around here?", 3],
            ["I have completed your quest!", 6],
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
        5: [["My apologies, I forgot. I will get right on that", -1]],
        6: [
            ["Money", -3],
            ["Attack experience", -4],
            ["Strength experience", -4],
            ["Defense experience", -4],
        ],
        7: [["My apologies, I forgot. I will get right on that", -1]],
        8: [["Oops, sorry!", -1]],
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
                                    <button className="btn btn-primary" onClick={() => handleChatOptionClick(elm[1] as number, elm[0] as string)}>
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
