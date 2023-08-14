import { levelOneATable, levelOneBTable, levelOneBossTable, levelOneCTable } from "../objects/loot tables/levelOneLoots";
import { IPlayerState, playerState } from "../store";
import { character } from "../types/characterTypes";
import { between } from "./utils";
import * as NPC from "../objects/characters/npc";

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

export function generateEnemyList(lvl: number): character[] {
    let tempList: character[] = [];
    for (let i = 0; i < 5; i++) {
        let randomNum = between(1, 6);
        if (lvl == 1) {
            switch (randomNum) {
                //goblin spawn
                case 1:
                    let newGoblin = new NPC.Enemy("Goblin", 5, 3, 1, 3, levelOneBTable);
                    tempList.push(newGoblin);
                    break;
                //rat spawn
                case 2:
                    let newRat = new NPC.Enemy("Rat", 3, 1, 1, 1, levelOneATable);
                    tempList.push(newRat);
                    break;
                //blind man Spawn
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
        }
    }
    return tempList;
}
export function generateBossFight(lvl: number): character[] {
    let tempList: character[] = [];
    switch (lvl) {
        //lvl 1 boss spawn
        case 1:
            let newLvl1Boss = new NPC.Enemy("Giant", 35, 12, 20, 20, levelOneBossTable);
            tempList.push(newLvl1Boss);
            break;

        default:
            break;
    }
    return tempList;
}
