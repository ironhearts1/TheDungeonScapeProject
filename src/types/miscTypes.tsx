import { CombatItem, HealingItem, Item } from "./itemTypes";

export type LootDropIdentifier = [number, Item | CombatItem | HealingItem | false, number];
export type Quest = [string, number];
export type CurrentQuest = [string, number, number];
