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
};

export type inventoryItemProps = {
    elm: [number, Item | CombatItem | HealingItem | false];
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
