import axios from "axios";
import { proxy, subscribe } from "valtio";
import { between, generateXPLevels } from "./functions/utils";
import { CombatItem, HealingItem, Item } from "./types/itemTypes";

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
    bonuses: {
        attackBonus: number;
        strengthBonus: number;
        defenseBonus: number;
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
    inventory: [number, Item | CombatItem | HealingItem | false][];
    equipment: [string, CombatItem | false][];
    location: number;
}
let importedData = await axios.get("https://thedungeonscapeproject-default-rtdb.firebaseio.com/Josh/playerState/.json").then((res) => res.data);
console.log(importedData);
let initalInvi: [number, Item | CombatItem | HealingItem | false][] = [];
for (let i = 0; i < 30; i++) {
    initalInvi.push([0, false]);
}
const equipmentTypes = ["Main-Hand", "Off-Hand", "Helmet", "Body", "Legs", "Boots", "Gloves", "Cape", "Necklace", "Ring"];
let initalEquipment: [string, CombatItem | false][] = [];
for (let i = 0; i < equipmentTypes.length; i++) {
    initalEquipment.push([equipmentTypes[i], false]);
}
export const playerState: IPlayerState = proxy({
    name: "Josh",
    npc: false,
    xp: { ...importedData.xp },
    bonuses: { ...importedData.bonuses },
    skills: { ...importedData.skills },
    combat: {
        setHP: function (newHP: number) {
            playerState.skills.currentHP = newHP;
        },
        getAttackRoll: function () {
            return (playerState.skills.attack + playerState.bonuses.attackBonus + 50) / 100;
        },
        getDefenseRoll: function () {
            return (playerState.skills.defense + playerState.bonuses.strengthBonus + 50) / 100;
        },
        getStrengthRoll: function () {
            return ((playerState.skills.strength + playerState.bonuses.defenseBonus + 50) * (between(90, 110) / 100)) / 175;
        },
    },
    // inventory: [...initalInvi],
    // equipment: [...initalEquipment],
    inventory: [...importedData.inventory],
    equipment: [...importedData.equipment],
    location: importedData.location,
});

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
subscribe(playerState.equipment, () => {
    let equipment = playerState.equipment;
    let aBonus = 0;
    let sBonus = 0;
    let dBonus = 0;
    equipment.map((slot) => {
        let item = slot[1];
        console.log(item);
        if (!item) {
            return;
        }
        aBonus = aBonus + item.attBonus;
        sBonus = sBonus + item.strBonus;
        dBonus = dBonus + item.defBonus;
    });
    playerState.bonuses.attackBonus = aBonus;
    playerState.bonuses.strengthBonus = sBonus;
    playerState.bonuses.defenseBonus = dBonus;
});

//generate fresh empty inventory
// let initalInvi: [number, Item | CombatItem | HealingItem | null][] = [];
// for (let i = 0; i < 30; i++) {
//     initalInvi.push([0, null]);
// }
// const equipmentTypes = ["Main-Hand", "Off-Hand", "Helmat", "Body", "Legs", "Boots", "Gloves", "Cape", "Necklace", "Ring"];
// let initalEquipment: [string, CombatItem | null][] = [];
// for (let i = 0; i < equipmentTypes.length; i++) {
//     initalEquipment.push([equipmentTypes[i], null]);
// }

// const [playerInventory, setPlayerInventory] = useState(initalInvi);
// const [playerEquipment, setPlayerEquipment] = useState(initalEquipment);

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
