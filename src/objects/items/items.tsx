import { CombatItem, HealingItem, Item } from "../../types/itemTypes";

export const coin: Item = {
    name: "Coin",
    value: 1,
    stackable: true,
    clickOptions: ["Drop"],
};
export const levelOneBossKey: Item = {
    name: "Boss Key 1",
    value: 50,
    stackable: true,
    clickOptions: ["Drop"],
};

export const bronzeDagger: CombatItem = {
    name: "Bronze Dagger",
    value: 20,
    stackable: false,
    attBonus: 2,
    strBonus: 2,
    defBonus: 1,
    equipSlot: "Main-Hand",
    clickOptions: ["Equip", "Drop"],
};
export const bronzeSword: CombatItem = {
    name: "Bronze Sword",
    value: 100,
    stackable: false,
    attBonus: 5,
    strBonus: 3,
    defBonus: 2,
    equipSlot: "Main-Hand",
    clickOptions: ["Equip", "Drop"],
};
export const bronzeHelmat: CombatItem = {
    name: "Bronze Helmat",
    value: 80,
    stackable: false,
    attBonus: 1,
    strBonus: 1,
    defBonus: 3,
    equipSlot: "Helmat",
    clickOptions: ["Equip", "Drop"],
};
export const bronzeShield: CombatItem = {
    name: "Bronze Shield",
    value: 100,
    stackable: false,
    attBonus: 2,
    strBonus: 2,
    defBonus: 5,
    equipSlot: "Off-Hand",
    clickOptions: ["Equip", "Drop"],
};
export const bronzePlatelegs: CombatItem = {
    name: "Bronze Platelegs",
    value: 125,
    stackable: false,
    attBonus: 2,
    strBonus: 1,
    defBonus: 8,
    equipSlot: "Legs",
    clickOptions: ["Equip", "Drop"],
};
export const bronzePlatebody: CombatItem = {
    name: "Bronze Platebody",
    value: 150,
    stackable: false,
    attBonus: 3,
    strBonus: 3,
    defBonus: 10,
    equipSlot: "Legs",
    clickOptions: ["Equip", "Drop"],
};
export const giantsRing: CombatItem = {
    name: "Giants Ring",
    value: 150,
    stackable: false,
    attBonus: 5,
    strBonus: 5,
    defBonus: 5,
    equipSlot: "Ring",
    clickOptions: ["Equip", "Drop"],
};
export const warriorsCape: CombatItem = {
    name: "Warrior's Cape",
    value: 200,
    stackable: false,
    attBonus: 6,
    strBonus: 6,
    defBonus: 6,
    equipSlot: "Cape",
    clickOptions: ["Equip", "Drop"],
};
export const sapphireNecklace: CombatItem = {
    name: "Sapphire Necklace",
    value: 100,
    stackable: false,
    attBonus: 4,
    strBonus: 4,
    defBonus: 4,
    equipSlot: "Necklace",
    clickOptions: ["Equip", "Drop"],
};
export const leatherGloves: CombatItem = {
    name: "Leather Gloves",
    value: 100,
    stackable: false,
    attBonus: 3,
    strBonus: 2,
    defBonus: 3,
    equipSlot: "Gloves",
    clickOptions: ["Equip", "Drop"],
};
export const leatherBoots: CombatItem = {
    name: "Leather Boots",
    value: 75,
    stackable: false,
    attBonus: 2,
    strBonus: 2,
    defBonus: 2,
    equipSlot: "Boots",
    clickOptions: ["Equip", "Drop"],
};

export const bandage: HealingItem = {
    name: "Bandage",
    value: 20,
    stackable: true,
    pointsHealed: 6,
    clickOptions: ["Consume", "Drop"],
};
