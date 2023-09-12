import { LootDropIdentifier } from "../../types/miscTypes";
import { coin, levelFourBossKey } from "../items/items";

export const levelFourATable: LootDropIdentifier[] = [
    [50, coin, 75],
    [35, coin, 120],
    [40, false, 0],
    [15, basicFirstAidKit, 1],
];
export const levelFourBTable: LootDropIdentifier[] = [
    [40, coin, 120],
    [15, steelShield, 1],
    [15, ironPlatebody, 1],
    [15, ointment, 2],
    [15, basicFirstAidKit, 2],
    [30, false, 0],
    [5, levelFourBossKey, 1],
];
export const levelFourCTable: LootDropIdentifier[] = [
    [40, coin, 150],
    [10, coin, 400],
    [15, basicFirstAidKit, 2],
    [15, mediumFirstAidKit, 1],
    [15, steelDagger, 1],
    [15, steelHelmet, 1],
    [10, levelFourBossKey, 1],
];
export const levelFourBossTable: LootDropIdentifier[] = [
    [10, coin, 400],
    [25, coin, 1000],
    [20, ointment, 4],
    [20, basicFirstAidKit, 3],
    [15, mediumFirstAidKit, 2],
    [25, steelPlatelegs, 1],
    [25, steelSword, 1],
    [15, ringOfFire, 1],
    [15, maceOfJustice, 1],
    [8, levelFourBossKey, 1],
];
