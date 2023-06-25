import { IPlayerState, playerState } from "../store";
import { character } from "../types/characterTypes";

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
