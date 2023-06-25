import { MutableRefObject } from "react";
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
    inventory: [number, Item | CombatItem | HealingItem | null][];
    equipment: [string, CombatItem | null][];
    setInventory: Function;
    setEquipment: Function;
};

export type inventoryItemProps = {
    elm: [number, Item | CombatItem | HealingItem | null];
    index: number;
    inventory: [number, Item | CombatItem | HealingItem | null][];
    equipment: [string, CombatItem | null][];
    setInventory: Function;
    setEquipment: Function;
};

export type playerAttackStyleProps = {
    attackStyle: string;
    handleAttackStyleChange: Function;
};
