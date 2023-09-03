import { LootDropIdentifier } from "./miscTypes";

export type character = {
    name: string;
    npc: boolean;
    maxHP: number;
    currentHP: number;
    attack: number;
    strength: number;
    defense: number;
    boss: boolean;
    setHP: Function;
    getAttackRoll: Function;
    getDefenseRoll: Function;
    getStrengthRoll: Function;
    lootTable: LootDropIdentifier[];
};
