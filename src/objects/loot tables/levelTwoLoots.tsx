import { LootDropIdentifier } from "../../types/miscTypes";
import { hardLeatherGloves, ironHelmet, ironPlatebody, ironPlatelegs, ironShield, sapphireNecklace, steelPlatebody, steelSword, warriorsCape } from "../items/combatItems";
import { bandage, basicFirstAidKit, ointment } from "../items/healingItems";
import { coin, levelTwoBossKey } from "../items/items";

export const levelTwoATable: LootDropIdentifier[] = [
    [50, coin, 25],
    [35, coin, 70],
    [40, false, 0],
    [15, ointment, 1],
    [15, ointment, 2],
];
export const levelTwoBTable: LootDropIdentifier[] = [
    [40, coin, 25],
    [40, coin, 120],
    [15, ironShield, 1],
    [15, ironPlatelegs, 1],
    [15, ointment, 2],
    [20, false, 0],
    [5, levelTwoBossKey, 1],
];
export const levelTwoCTable: LootDropIdentifier[] = [
    [40, coin, 100],
    [40, coin, 130],
    [10, coin, 200],
    [20, bandage, 5],
    [15, ointment, 1],
    [5, basicFirstAidKit, 1],
    [20, sapphireNecklace, 1],
    [15, hardLeatherGloves, 1],
    [15, ironHelmet, 1],
    [10, levelTwoBossKey, 1],
];
export const levelTwoBossTable: LootDropIdentifier[] = [
    [10, coin, 300],
    [25, coin, 700],
    [20, ointment, 2],
    [20, basicFirstAidKit, 1],
    [25, steelPlatebody, 1],
    [25, steelSword, 1],
    [25, ironPlatebody, 1],
    [20, warriorsCape, 1],
    [8, levelTwoBossKey, 1],
];
