import { LootDropIdentifier } from "../../types/miscTypes";
import { ironPlatebody, maceOfJustice, ringOfFire, steelDagger, steelHelmet, steelPlatebody, steelPlatelegs, steelShield, steelSword, warriorsCape } from "../items/combatItems";
import { basicFirstAidKit, mediumFirstAidKit, ointment } from "../items/healingItems";
import { coin, levelThreeBossKey } from "../items/items";

export const levelThreeATable: LootDropIdentifier[] = [
    [50, coin, 75],
    [35, coin, 120],
    [40, false, 0],
    [15, ointment, 2],
    [15, basicFirstAidKit, 1],
];
export const levelThreeBTable: LootDropIdentifier[] = [
    [40, coin, 120],
    [15, steelShield, 1],
    [15, ironPlatebody, 1],
    [15, ointment, 2],
    [15, basicFirstAidKit, 2],
    [30, false, 0],
    [5, levelThreeBossKey, 1],
];
export const levelThreeCTable: LootDropIdentifier[] = [
    [40, coin, 150],
    [10, coin, 400],
    [20, ointment, 4],
    [15, basicFirstAidKit, 2],
    [15, mediumFirstAidKit, 1],
    [15, steelDagger, 1],
    [15, steelHelmet, 1],
    [10, levelThreeBossKey, 1],
];
export const levelThreeBossTable: LootDropIdentifier[] = [
    [10, coin, 400],
    [25, coin, 1000],
    [20, ointment, 4],
    [20, basicFirstAidKit, 3],
    [15, mediumFirstAidKit, 2],
    [25, steelPlatelegs, 1],
    [25, steelSword, 1],
    [15, ringOfFire, 1],
    [15, maceOfJustice, 1],
    [8, levelThreeBossKey, 1],
];
