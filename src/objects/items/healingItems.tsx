import { HealingItem } from "../../types/itemTypes";

export const bandage: HealingItem = {
    name: "Bandage",
    value: 20,
    stackable: true,
    pointsHealed: 6,
    clickOptions: ["Consume", "Drop"],
};
export const ointment: HealingItem = {
    name: "Ointment",
    value: 70,
    stackable: true,
    pointsHealed: 11,
    clickOptions: ["Consume", "Drop"],
};
