import { LootDropIdentifier } from "../../types/miscTypes";
import { bandage, bronzeDagger, bronzeHelmat, bronzeShield, bronzeSword, coin } from "../items/items";

export const levelOneATable: LootDropIdentifier[] = [
    [50, coin, 5],
    [50, null, 0],
    [5, bandage, 1],
];
export const levelOneBTable: LootDropIdentifier[] = [
    [50, coin, 5],
    [50, coin, 15],
    [40, coin, 25],
    [15, bronzeShield, 1],
    [50, null, 0],
];
export const levelOneCTable: LootDropIdentifier[] = [
    [50, coin, 5],
    [50, coin, 15],
    [20, bandage, 1],
    [20, bronzeDagger, 1],
    [15, bronzeSword, 1],
    [15, bronzeHelmat, 1],
    [35, null, 0],
];
