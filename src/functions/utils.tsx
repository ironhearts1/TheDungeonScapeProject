import { CombatItem, HealingItem, Item } from "../types/itemTypes";
import { LootDropIdentifier } from "../types/miscTypes";

export async function sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
export function between(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function generateXPLevels() {
    let total = 0;
    let lvls: number[] = [0];
    for (let i = 1; i <= 98; i++) {
        total += Math.floor(i + (300 * Math.pow(2, i / 7.0)) / 4);
        lvls.push(total);
    }

    return lvls;
}
export function calculateLootDrop(dropTable: LootDropIdentifier[]) {
    let totalWeight = 0;
    let count = 0;
    let dropID = 1000;
    for (let i = 0; i < dropTable.length; i++) {
        totalWeight += dropTable[i][0];
    }
    let randomNum = between(1, totalWeight + 1);
    for (let j = 0; j < dropTable.length; j++) {
        count += dropTable[j][0];
        if (count >= randomNum) {
            dropID = j;
            break;
        }
    }
    let drop: [Item | CombatItem | HealingItem | null, number] = [dropTable[dropID][1], dropTable[dropID][2]];
    return drop;
}
