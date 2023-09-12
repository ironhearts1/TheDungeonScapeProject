import { levelOneATable, levelOneBTable, levelOneBossTable, levelOneCTable } from "../objects/loot tables/levelOneLoots";
import { IPlayerState, playerState } from "../store";
import { character } from "../types/characterTypes";
import { between, isThereAnOpenInventorySlot } from "./utils";
import * as NPC from "../objects/characters/npc";
import { levelTwoATable, levelTwoBTable, levelTwoBossTable, levelTwoCTable } from "../objects/loot tables/levelTwoLoots";
import { Item, CombatItem, HealingItem } from "../types/itemTypes";
import { levelThreeATable, levelThreeBTable, levelThreeBossTable, levelThreeCTable } from "../objects/loot tables/levelThreeLoots";

export function rollPlayerAttack(attacker: IPlayerState, defender: character, updateConsole: Function, setEnemyCurrHP: Function) {
    let attackerAttRoll: number = Math.random() * 10 * attacker.combat.getAttackRoll();
    let defenderDefRoll: number = Math.random() * 10 * defender.getDefenseRoll();
    if (defenderDefRoll >= attackerAttRoll) {
        updateConsole(`${attacker.name} missed on ${defender.name}!`);
    }
    if (attackerAttRoll > defenderDefRoll) {
        let attackerStrRoll: number = Math.floor(Math.random() * 10 * attacker.combat.getStrengthRoll());
        updateEnemyHealth(defender, attackerStrRoll, setEnemyCurrHP);
        updateConsole(`${attacker.name} dealt ${attackerStrRoll} damage to ${defender.name}!`);
    }
}

export function rollEnemyAttack(attacker: character, defender: IPlayerState, updateConsole: Function) {
    let attackerAttRoll: number = Math.random() * 10 * attacker.getAttackRoll();
    let defenderDefRoll: number = Math.random() * 10 * defender.combat.getDefenseRoll();
    if (defenderDefRoll >= attackerAttRoll) {
        updateConsole(`${attacker.name} missed on ${defender.name}!`);
    }
    if (attackerAttRoll > defenderDefRoll) {
        let attackerStrRoll: number = Math.floor(Math.random() * 10 * attacker.getStrengthRoll());
        updatePlayerHealth(attackerStrRoll);
        updateConsole(`${attacker.name} dealt ${attackerStrRoll} damage to ${defender.name}!`);
    }
}
export function updatePlayerHealth(damage: number) {
    let newHealth = playerState.skills.currentHP - damage;
    if (newHealth < 0) {
        newHealth = 0;
    }
    playerState.combat.setHP(newHealth);
}
export function updateEnemyHealth(enemy: character, damage: number, setEnemyCurrHP: Function) {
    let newHealth = enemy.currentHP - damage;
    if (newHealth < 0) {
        newHealth = 0;
    }
    enemy.setHP(newHealth);
    setEnemyCurrHP(() => newHealth);
}

export function generateEnemyList(): character[] {
    let dungeonLevel = playerState.location;
    let tempList: character[] = [];
    for (let i = 0; i < 5; i++) {
        let randomNum = between(1, 6);
        if (dungeonLevel == 1) {
            switch (randomNum) {
                case 1:
                    let newGoblin = new NPC.Enemy("Goblin", 5, 3, 1, 3, levelOneBTable);
                    tempList.push(newGoblin);
                    break;
                case 2:
                    let newRat = new NPC.Enemy("Rat", 3, 1, 1, 1, levelOneATable);
                    tempList.push(newRat);
                    break;
                case 3:
                    let newBlindMan = new NPC.Enemy("Blind Man", 10, 1, 5, 5, levelOneCTable);
                    tempList.push(newBlindMan);
                    break;
                case 4:
                    let newCow = new NPC.Enemy("Cow", 15, 1, 1, 5, levelOneBTable);
                    tempList.push(newCow);
                    break;
                case 5:
                    let newOgre = new NPC.Enemy("Ogre", 7, 8, 5, 2, levelOneCTable);
                    tempList.push(newOgre);
                    break;
                default:
                    break;
            }
        } else if (dungeonLevel == 2) {
            switch (randomNum) {
                case 1:
                    let newIceMage = new NPC.Enemy("Ice Mage", 12, 12, 10, 2, levelTwoATable);
                    tempList.push(newIceMage);
                    break;
                case 2:
                    let newFireSprite = new NPC.Enemy("Fire Sprite", 15, 10, 10, 7, levelTwoBTable);
                    tempList.push(newFireSprite);
                    break;
                case 3:
                    let newCursedWitch = new NPC.Enemy("Cursed Witch", 10, 10, 15, 5, levelTwoBTable);
                    tempList.push(newCursedWitch);
                    break;
                case 4:
                    let newSwampTroll = new NPC.Enemy("Swamp Troll", 22, 8, 10, 15, levelTwoCTable);
                    tempList.push(newSwampTroll);
                    break;
                case 5:
                    let newSerpent = new NPC.Enemy("Serpent", 20, 10, 15, 10, levelTwoCTable);
                    tempList.push(newSerpent);
                    break;
                default:
                    break;
            }
        } else if (dungeonLevel == 3) {
            switch (randomNum) {
                case 1:
                    let newCursedBanshee = new NPC.Enemy("Cursed Banshee", 25, 15, 15, 22, levelThreeATable);
                    tempList.push(newCursedBanshee);
                    break;
                case 2:
                    let newHexedEnchantress = new NPC.Enemy("Hexed Enchantress", 25, 20, 25, 20, levelThreeBTable);
                    tempList.push(newHexedEnchantress);
                    break;
                case 3:
                    let newBogSlime = new NPC.Enemy("Bog Slime", 30, 20, 20, 30, levelThreeBTable);
                    tempList.push(newBogSlime);
                    break;
                case 4:
                    let newDwarvenWarrior = new NPC.Enemy("Dwarven Warrior", 28, 30, 25, 25, levelThreeCTable);
                    tempList.push(newDwarvenWarrior);
                    break;
                case 5:
                    let newDwarvenBerzerker = new NPC.Enemy("Dwarven Berzerker", 25, 35, 35, 20, levelThreeCTable);
                    tempList.push(newDwarvenBerzerker);
                    break;
                default:
                    break;
            }
        }
    }
    return tempList;
}
export function generateBossFight(): character[] {
    let dungeonLevel = playerState.location;
    let tempList: character[] = [];
    switch (dungeonLevel) {
        //lvl 1 boss spawn
        case 1:
            let newLvl1Boss = new NPC.Enemy("Giant", 35, 12, 20, 20, levelOneBossTable, true);
            tempList.push(newLvl1Boss);
            break;
        case 2:
            let newLvl2Boss = new NPC.Enemy("Troll Mother", 50, 22, 25, 35, levelTwoBossTable, true);
            tempList.push(newLvl2Boss);
            break;
        case 3:
            let newLvl3Boss = new NPC.Enemy("Dragonkin Priest", 70, 40, 50, 50, levelThreeBossTable, true);
            tempList.push(newLvl3Boss);
            break;
        default:
            break;
    }
    return tempList;
}

export function experienceGained(currentEnemy: character, attackStyle: string) {
    let enemy = currentEnemy;
    if (enemy) {
        let experience = enemy.maxHP * 1.5;
        if (attackStyle === "Defensive") {
            playerState.xp.hpXP += (1 / 4) * experience;
            playerState.xp.defenseXP += experience;
        } else if (attackStyle === "Aggressive") {
            playerState.xp.hpXP += (1 / 4) * experience;
            playerState.xp.strengthXP += experience;
        } else {
            playerState.xp.hpXP += (1 / 4) * experience;
            playerState.xp.attackXP += experience;
        }
    }
}

export function addDropToInventory(drop: [Item | CombatItem | HealingItem | false, number], updateConsole: Function) {
    // DROP IS [ITEM, AMOUNT]
    // INVENTORY IS [[AMOUNT, ITEM],[AMOUNT, ITEM], ECT]
    if (drop[0] === false) {
        updateConsole("Looted nothing from the corpse");
        return;
    }
    let inventory = [...playerState.inventory];
    let stackable = drop[0]["stackable"];
    let openSlot = isThereAnOpenInventorySlot();
    if (openSlot === -1 && stackable === false) {
        updateConsole(`You drop fell on the floor because you have no space!`);
        return;
    }
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i][1] === false) {
            updateConsole(`You looted ${drop[1]} ${drop[0]["name"]}`);
            inventory[i][1] = drop[0];
            inventory[i][0] = drop[1];
            playerState.inventory = inventory;
            return;
        }
        if (stackable === true) {
            //@ts-ignore
            if (inventory[i][1]["name"] === drop[0]["name"]) {
                updateConsole(`You looted ${drop[1]} ${drop[0]["name"]}`);
                inventory[i][0] += drop[1];
                playerState.inventory = inventory;
                return;
            }
        }
    }
}
