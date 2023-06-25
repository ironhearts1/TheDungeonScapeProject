import { CombatItem, HealingItem, Item } from "./itemTypes";

export type LootDropIdentifier = [number, Item | CombatItem | HealingItem | null, number];
