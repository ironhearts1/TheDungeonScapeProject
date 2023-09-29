import { Enemy } from "../objects/characters/npc";
import { CombatItem, HealingItem, Item } from "./itemTypes";

export type healthBarProps = {
    barWidth: number;
    currHP: number;
    maxHP: number;
    name?: string;
    className?: string;
};
export type playerMenuProps = {
    handleAttackStyleChange: Function;
    attackStyle: string;
    updateConsole: Function;
    enterBossDungeon: Function;
};

export type inventoryItemProps = {
    elm: [number, Item | CombatItem | HealingItem | false];
    index: number;
    enterBossDungeon: Function;
};
export type storeSellerItemProps = {
    elm: Item | CombatItem | HealingItem;
    index: number;
};
export type equipmentItemProps = {
    elm: [string, CombatItem | false];
    index: number;
    updateConsole: Function;
};

export type playerAttackStyleProps = {
    attackStyle: string;
    handleAttackStyleChange: Function;
};

export type storeModalProps = {
    isOpen: boolean;
    handleModalClose: Function;
};
export type localChatModalProps = {
    isOpen: boolean;
    handleModalClose: Function;
    updateConsole: Function;
};

export type gameButtonsProps = {
    runFight: Function;
    currentEnemy: Enemy;
    enterDungeon: Function;
    clearConsole: Function;
    handleOpenStoreModal: Function;
    handleTravelModalOpen: Function;
    gameDisabled: boolean;
    handleLocalChatModalOpen: Function;
};
export type runGameButtonsProps = {
    runFight: Function;
    currentEnemy: Enemy;
    gameDisabled: boolean;
};

export type playerConsoleProps = {
    isLoading: boolean;
    consoleMessages: string[];
};
