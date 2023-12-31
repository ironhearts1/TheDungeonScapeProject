import { Item } from "../../types/itemTypes";

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
    clickOptions: ["Drop", "Use Key"],
};
export const levelTwoBossKey: Item = {
    name: "Boss Key 2",
    value: 100,
    stackable: true,
    clickOptions: ["Drop", "Use Key"],
};
export const levelThreeBossKey: Item = {
    name: "Boss Key 3",
    value: 150,
    stackable: true,
    clickOptions: ["Drop", "Use Key"],
};
export const levelFourBossKey: Item = {
    name: "Boss Key 4",
    value: 200,
    stackable: true,
    clickOptions: ["Drop", "Use Key"],
};
