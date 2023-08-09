import { CombatItem, HealingItem, Item } from "../../types/itemTypes";

export const coin: Item = {
    name: "Coin",
    value: 1,
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
    equipSlot: "Main-Hand",
    clickOptions: ["Equip", "Drop"],
};
export const bronzeShield: CombatItem = {
    name: "Bronze Shield",
    value: 100,
    stackable: false,
    attBonus: 2,
    strBonus: 2,
    defBonus: 5,
    equipSlot: "Main-Hand",
    clickOptions: ["Equip", "Drop"],
};

export const bandage: HealingItem = {
    name: "Bandage",
    value: 20,
    stackable: true,
    pointsHealed: 6,
    clickOptions: ["Consume", "Drop"],
};
