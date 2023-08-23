import { LootDropIdentifier } from "../../types/miscTypes";
import { bronzeShield, bronzeDagger, bronzeSword, bronzeHelmat, bronzePlatebody, giantsRing, warriorsCape, ironPlatebody } from "../items/combatItems";
import { bandage } from "../items/healingItems";
import { coin, levelOneBossKey } from "../items/items";

export const levelOneATable: LootDropIdentifier[] = [
    [50, coin, 5],
    [50, false, 0],
    [5, bandage, 1],
];
export const levelOneBTable: LootDropIdentifier[] = [
    [50, coin, 5],
    [50, coin, 15],
    [40, coin, 25],
    [15, bronzeShield, 1],
    [50, false, 0],
    [3, levelOneBossKey, 1],
];
export const levelOneCTable: LootDropIdentifier[] = [
    [50, coin, 5],
    [50, coin, 15],
    [20, bandage, 1],
    [20, bronzeDagger, 1],
    [15, bronzeSword, 1],
    [15, bronzeHelmat, 1],
    [35, false, 0],
    [6, levelOneBossKey, 1],
];
export const levelOneBossTable: LootDropIdentifier[] = [
    [10, coin, 200],
    [25, coin, 450],
    [20, bandage, 5],
    [25, bronzePlatebody, 1],
    [25, ironPlatebody, 1],
    [20, giantsRing, 1],
    [20, warriorsCape, 1],
    [6, levelOneBossKey, 1],
];
