import { between } from "../../functions/utils";
import { LootDropIdentifier } from "../../types/miscTypes";

export class Enemy {
    name: string;
    maxHP: number;
    currentHP: number;
    attack: number;
    strength: number;
    defense: number;
    lootTable: LootDropIdentifier[];
    constructor(_name: string, _maxHP: number, _attack: number, _strength: number, _defense: number, _lootTable: LootDropIdentifier[]) {
        this.name = _name;
        this.maxHP = _maxHP;
        this.currentHP = _maxHP;
        this.attack = _attack;
        this.strength = _strength;
        this.defense = _defense;
        this.lootTable = _lootTable;
    }
    npc = true;
    setHP(newHP: number) {
        this.currentHP = newHP;
    }
    getAttackRoll() {
        return (this.attack + 50) / 100;
    }
    getDefenseRoll() {
        return (this.defense + 50) / 100;
    }
    getStrengthRoll() {
        return ((this.strength + 50) * (between(90, 110) / 100)) / 175;
    }
}
