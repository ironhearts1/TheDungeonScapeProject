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
};

export type inventoryItemProps = {
    elm: [number, Item | CombatItem | HealingItem | false];
    index: number;
};

export type playerAttackStyleProps = {
    attackStyle: string;
    handleAttackStyleChange: Function;
};
