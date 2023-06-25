import axios from "axios";
import { proxy, subscribe } from "valtio";
import { generateXPLevels } from "./functions/utils";

let experienceLevels = generateXPLevels();

export interface IPlayerState {
    name: string;
    npc: boolean;
    xp: {
        attackXP: number;
        strengthXP: number;
        defenseXP: number;
        hpXP: number;
    };
    skills: {
        maxHP: number;
        currentHP: number;
        attack: number;
        strength: number;
        defense: number;
    };
    combat: {
        setHP(newHP: number): void;
        getAttackRoll(): number;
        getDefenseRoll(): number;
        getStrengthRoll(): number;
    };
}
let importedData = await axios.get("https://thedungeonscapeproject-default-rtdb.firebaseio.com/playerState/.json").then((res) => res.data);
console.log(importedData);

export const playerState: IPlayerState = await proxy({
    name: "Josh",
    npc: false,
    xp: { ...importedData.xp },
    skills: { ...importedData.skills },
    combat: {
        setHP: function (newHP: number) {
            playerState.skills.currentHP = newHP;
        },
        getAttackRoll: function () {
            return (playerState.skills.attack + 50) / 100;
        },
        getDefenseRoll: function () {
            return (playerState.skills.defense + 50) / 100;
        },
        getStrengthRoll: function () {
            return (playerState.skills.strength + 50) / 200;
        },
    },
});

console.log(experienceLevels);

subscribe(playerState.xp, () => {
    for (let stat in playerState.xp) {
        //@ts-ignore
        let experience = playerState.xp[stat];
        if (stat === "attackXP") {
            let attackLvl = playerState.skills.attack;
            if (experience >= experienceLevels[attackLvl]) {
                console.log("Attack Leveled Up!");
                playerState.skills.attack += 1;
            }
        } else if (stat === "defenseXP") {
            let defenseLvl = playerState.skills.defense;
            if (experience >= experienceLevels[defenseLvl]) {
                console.log("Defense Leveled Up!");
                playerState.skills.defense += 1;
            }
        } else if (stat === "hpXP") {
            let maxHPLvl = playerState.skills.maxHP - 9;
            if (experience >= experienceLevels[maxHPLvl]) {
                console.log("HP Leveled Up!");
                playerState.skills.maxHP += 1;
            }
        } else if (stat === "strengthXP") {
            let strengthLvl = playerState.skills.strength;
            if (experience >= experienceLevels[strengthLvl]) {
                console.log("Attack Leveled Up!");
                playerState.skills.strength += 1;
            }
        }
    }
});

// {
//     name: "Josh",
//     npc: false,
//     xp: { ...importedData.xp },
//     skills: { ...importedData.skills },
//     combat: {
//         setHP: function (newHP: number) {
//             playerState.skills.currentHP = newHP;
//         },
//         getAttackRoll: function () {
//             return (playerState.skills.attack + 50) / 100;
//         },
//         getDefenseRoll: function () {
//             return (playerState.skills.defense + 50) / 100;
//         },
//         getStrengthRoll: function () {
//             return (playerState.skills.strength + 50) / 200;
//         },
//     },
// }

// {
//     name: "Josh",
//     npc: false,
//     xp: {
//         attackXP: 0,
//         strengthXP: 0,
//         defenseXP: 0,
//         hpXP: 0,
//     },
//     skills: {
//         maxHP: 10,
//         currentHP: 10,
//         attack: 20,
//         strength: 20,
//         defense: 20,
//     },
//     combat: {
//         setHP: function (newHP: number) {
//             playerState.skills.currentHP = newHP;
//         },
//         getAttackRoll: function () {
//             return (playerState.skills.attack + 50) / 100;
//         },
//         getDefenseRoll: function () {
//             return (playerState.skills.defense + 50) / 100;
//         },
//         getStrengthRoll: function () {
//             return (playerState.skills.strength + 50) / 200;
//         },
//     },
// }
