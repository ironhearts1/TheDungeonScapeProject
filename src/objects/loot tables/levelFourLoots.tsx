import { LootDropIdentifier } from "../../types/miscTypes";
import { heroesCape, maceOfJustice, mithrilDagger, mithrilPlatelegs, mithrilShield, mithrilSword, steelPlatebody } from "../items/combatItems";
import { basicFirstAidKit, mediumFirstAidKit } from "../items/healingItems";
import { coin, levelFourBossKey } from "../items/items";

export const levelFourATable: LootDropIdentifier[] = [
    [50, coin, 110],
    [35, coin, 150],
    [40, false, 0],
    [15, mediumFirstAidKit, 1],
];
export const levelFourBTable: LootDropIdentifier[] = [
    [40, coin, 165],
    [20, coin, 200],
    [15, steelPlatebody, 1],
    [15, mediumFirstAidKit, 1],
    [10, basicFirstAidKit, 3],
    [25, false, 0],
    [5, levelFourBossKey, 1],
];
export const levelFourCTable: LootDropIdentifier[] = [
    [20, coin, 150],
    [20, coin, 220],
    [20, coin, 350],
    [15, basicFirstAidKit, 2],
    [15, mediumFirstAidKit, 2],
    [15, mithrilDagger, 1],
    [15, mithrilSword, 1],
    [10, levelFourBossKey, 1],
];
export const levelFourBossTable: LootDropIdentifier[] = [
    [30, coin, 500],
    [25, coin, 750],
    [15, coin, 1250],
    [20, basicFirstAidKit, 4],
    [15, mediumFirstAidKit, 3],
    [25, mithrilPlatelegs, 1],
    [25, mithrilShield, 1],
    [15, heroesCape, 1],
    [15, maceOfJustice, 1],
    [8, levelFourBossKey, 1],
];
