import axios from "axios";
import { playerState } from "../store";
import { CombatItem, HealingItem, Item } from "../types/itemTypes";
import { LootDropIdentifier } from "../types/miscTypes";
import { character } from "../types/characterTypes";

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
    let drop: [Item | CombatItem | HealingItem | false, number] = [dropTable[dropID][1], dropTable[dropID][2]];
    return drop;
}

export function isThereAnOpenInventorySlot() {
    let openSlot = -1;
    for (let i = 0; i < playerState.inventory.length; i++) {
        if (playerState.inventory[i][1] === false) {
            openSlot = i;
            break;
        }
    }
    return openSlot;
}
export function dropItemFromInventory(index: number) {
    let _newInvi = [...playerState.inventory];
    //@ts-ignore
    let newInvi = [..._newInvi.toSpliced(index, 1), [0, false]];
    //@ts-ignore
    playerState.inventory = newInvi;
}
export function findItemByName(name: string) {
    let itemSlot = -1;
    for (let i = 0; i < playerState.inventory.length; i++) {
        //@ts-ignore
        if (playerState.inventory[i][1].name === name) {
            itemSlot = i;
            break;
        }
    }
    return itemSlot;
}

export function saveToDatabase() {
    let _playerStateSerialized = {
        name: playerState.name,
        npc: false,
        xp: { ...playerState.xp },
        bonuses: { ...playerState.bonuses },
        skills: { ...playerState.skills },
        inventory: [...playerState.inventory],
        equipment: [...playerState.equipment],
        location: playerState.location,
        bossesKilled: playerState.bossesKilled,
        currentQuest: { ...playerState.currentQuest },
    };
    let playerStateSerialized = JSON.stringify(_playerStateSerialized);
    axios.put(`https://thedungeonscapeproject-default-rtdb.firebaseio.com/${playerState.name}/playerState/.json`, playerStateSerialized);
}

export function updateQuest(enemy: character) {
    if (playerState.currentQuest.questEnemy === "None") {
        return;
    }
    let name = enemy.name;
    if (playerState.currentQuest.questEnemy !== name) {
        return;
    }
    //@ts-ignore
    if (playerState.currentQuest.killsLeft && playerState.currentQuest.killsLeft > 0) {
        //@ts-ignore
        playerState.currentQuest.killsLeft -= 1;
        return;
    }
    return;
}

export function resetQuest() {
    playerState.currentQuest.questEnemy = "None";
    playerState.currentQuest.questGoal = 0;
    playerState.currentQuest.questLevel = 0;
    playerState.currentQuest.killsLeft = 0;
}
