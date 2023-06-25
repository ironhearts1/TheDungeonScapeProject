export interface Item {
    name: string;
    value: number;
    stackable: boolean;
    clickOptions: string[];
}
export interface CombatItem extends Item {
    attBonus: number;
    strBonus: number;
    defBonus: number;
    equipSlot: string;
}
export interface HealingItem extends Item {
    pointsHealed: number;
}
