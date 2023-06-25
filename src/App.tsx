import { useEffect, useState } from "react";
import "./styles/css/styles.min.css";
import { character } from "./types/characterTypes";
import { playerState, IPlayerState } from "./store";
import { useSnapshot } from "valtio";
import * as NPC from "./objects/characters/npc";
import { sleep, between, calculateLootDrop } from "./functions/utils";
import HealthBar from "./components/HealthBar";
import axios from "axios";
import PlayerMenu from "./components/PlayerMenu";
import { levelOneATable, levelOneBTable, levelOneCTable } from "./objects/loot tables/levelOneLoots";
import { LootDropIdentifier } from "./types/miscTypes";
import { CombatItem, HealingItem, Item } from "./types/itemTypes";
import { rollEnemyAttack, rollPlayerAttack } from "./functions/fightFuncs";

export function App() {
    const playerSnap = useSnapshot(playerState, { sync: true });
    const [isLoading, setIsLoading] = useState(false);
    const [consoleMessages, setConsoleMessages] = useState<string[]>([]);
    const [currentEnemy, setCurrentEnemy] = useState<character | null>(null);
    const [enemyCurrHP, setEnemyCurrHP] = useState(0);
    const [enemyMaxHP, setEnemyMaxHP] = useState(0);
    const [dungeonEnemyList, setDungeonEnemyList] = useState<character[]>([]);
    const [attackStyle, setAttackStyle] = useState("Accurate");
    const [gameDisabled, setGameDisabled] = useState(false);

    let initalInvi: [number, Item | CombatItem | HealingItem | null][] = [];
    for (let i = 0; i < 30; i++) {
        initalInvi.push([0, null]);
    }
    const equipmentTypes = ["Main-Hand", "Off-Hand", "Helmat", "Body", "Legs", "Boots", "Gloves", "Cape", "Necklace", "Ring"];
    let initalEquipment: [string, CombatItem | null][] = [];
    for (let i = 0; i < equipmentTypes.length; i++) {
        initalEquipment.push([equipmentTypes[i], null]);
    }

    const [playerInventory, setPlayerInventory] = useState(initalInvi);
    const [playerEquipment, setPlayerEquipment] = useState(initalEquipment);

    function updateConsole(message: string) {
        setIsLoading(true);
        setConsoleMessages((prev) => {
            let newArr = [...prev];
            newArr.push(message);
            return newArr;
        });
        setIsLoading(false);
    }
    function clearConsole() {
        setConsoleMessages([]);
    }

    async function runFight(player: IPlayerState, enemy: character) {
        if (currentEnemy === null) {
            updateConsole("You have no current enemy to fight! Enter a dungeon and get to work!");
            return;
        }
        setGameDisabled(true);
        console.log(`Fight Begin! player health ${player.skills.currentHP} || enemy health ${enemy.currentHP}`);
        updateConsole(`Fight Begin! player health ${player.skills.currentHP} || enemy health ${enemy.currentHP}`);
        while (enemy.currentHP > 0 && player.skills.currentHP > 0) {
            await sleep(0.15);
            //player attack phase

            rollPlayerAttack(player, enemy, updateConsole, setEnemyCurrHP);
            if (enemyCurrHP <= 0) {
                console.log("Enemy Defeated!");
                updateConsole("Enemy Defeated!");
                break;
            }

            //enemy attack phase
            await sleep(0.15);
            rollEnemyAttack(enemy, player, updateConsole);
            if (player.skills.currentHP <= 0) {
                console.log("Oh shit you died!");
                updateConsole("Oh shit you died!");
                player.combat.setHP(player.skills.maxHP);
                setGameDisabled(false);
                return;
            }
        }
        console.log(`The fights over! player health ${player.skills.currentHP} || enemy health ${enemy.currentHP}`);
        updateConsole(`The fights over! player health ${player.skills.currentHP} || enemy health ${enemy.currentHP}`);
        enemyKilled(enemy);
        setGameDisabled(false);
    }
    function enterDungeon() {
        let tempList: character[] = [];
        for (let i = 0; i < 5; i++) {
            let randomNum = between(1, 4);
            switch (randomNum) {
                //goblin spawn
                case 1:
                    let newGoblin = new NPC.Enemy("Goblin", 5, 1, 1, 3, levelOneBTable);
                    tempList.push(newGoblin);
                    break;
                //rat spawn
                case 2:
                    let newRat = new NPC.Enemy("Rat", 3, 1, 1, 1, levelOneATable);
                    tempList.push(newRat);
                    break;
                //blind man Spawn
                case 3:
                    let newBlindMan = new NPC.Enemy("Blind Man", 10, 1, 5, 5, levelOneCTable);
                    tempList.push(newBlindMan);
                    break;
                default:
                    break;
            }
        }
        updateCurrentEnemy(tempList);
    }

    function updateCurrentEnemy(newEnemyList: character[]) {
        if (newEnemyList.length === 0) {
            setDungeonEnemyList(() => []);
            setCurrentEnemy(() => null);

            setEnemyCurrHP(() => 0);
            setEnemyMaxHP(() => 0);
            return;
        }
        setDungeonEnemyList(() => newEnemyList);
        setCurrentEnemy(() => newEnemyList[0]);

        setEnemyCurrHP(() => newEnemyList[0].currentHP);
        setEnemyMaxHP(() => newEnemyList[0].maxHP);
    }
    async function enemyKilled(enemy: character) {
        experienceGained();
        let dropReturn: [Item | CombatItem | HealingItem | null, number] = calculateLootDrop(enemy.lootTable);
        addDropToInventory(dropReturn);
        if (dungeonEnemyList.length === 1) {
            updateConsole(`You have successfully cleared the Dungeon! Good job!`);
            let tempList = dungeonEnemyList;
            tempList.shift();
            updateCurrentEnemy(tempList);
            return;
        }
        updateConsole(`You continue to guide yourself through the dungeon, looking for more gold or glory`);
        await sleep(0.75);
        let tempList = dungeonEnemyList;
        tempList.shift();
        updateCurrentEnemy(tempList);
        return;
    }
    function experienceGained() {
        let enemy = currentEnemy;
        if (enemy) {
            let experience = enemy.maxHP * 1.5;
            if (attackStyle === "Defensive") {
                playerState.xp.hpXP += (1 / 4) * experience;
                playerState.xp.defenseXP += experience;
            } else if (attackStyle === "Aggressive") {
                playerState.xp.hpXP += (1 / 4) * experience;
                playerState.xp.strengthXP += experience;
            } else {
                playerState.xp.hpXP += (1 / 4) * experience;
                playerState.xp.attackXP += experience;
            }

            let _playerStateSerialized = { name: playerSnap.name, npc: false, xp: { ...playerState.xp }, skills: { ...playerState.skills } };
            console.log(_playerStateSerialized);
            let playerStateSerialized = JSON.stringify(_playerStateSerialized);
            axios.put("https://thedungeonscapeproject-default-rtdb.firebaseio.com/playerState/.json", playerStateSerialized);
        }
    }

    function addDropToInventory(drop: [Item | CombatItem | HealingItem | null, number]) {
        // DROP IS [ITEM, AMOUNT]
        // INVENTORY IS [[AMOUNT, ITEM],[AMOUNT, ITEM], ECT]
        if (drop[0] === null) {
            updateConsole("Looted nothing from the corpse");
            return;
        }
        let inventory = playerInventory;
        let stackable = drop[0]["stackable"];
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i][1] === null) {
                updateConsole(`You looted ${drop[1]} ${drop[0]["name"]}`);
                inventory[i][1] = drop[0];
                inventory[i][0] = drop[1];
                setPlayerInventory(inventory);
                return;
            }
            if (stackable === true) {
                //@ts-ignore
                if (inventory[i][1]["name"] === drop[0]["name"]) {
                    updateConsole(`You looted ${drop[1]} ${drop[0]["name"]}`);
                    inventory[i][0] += drop[1];
                    setPlayerInventory(inventory);
                    return;
                }
            }
        }
        updateConsole("You drop fell on the floor because you have no space!");
        return;
    }
    let playerBarWidth = (playerSnap.skills.currentHP / playerSnap.skills.maxHP) * 100;
    let enemyBarWidth = (enemyCurrHP / enemyMaxHP) * 100;
    //@ts-ignore
    function handleAttackStyleChange(e) {
        setAttackStyle(() => e.target.value);
    }

    useEffect(() => {
        playerBarWidth = (playerSnap.skills.currentHP / playerSnap.skills.maxHP) * 100;
        enemyBarWidth = (enemyCurrHP / enemyMaxHP) * 100;
    }, [playerSnap.skills.currentHP, enemyCurrHP]);
    useEffect(() => {
        if (currentEnemy) {
            setEnemyCurrHP(currentEnemy.maxHP);
            setEnemyMaxHP(currentEnemy.maxHP);
        }
    }, [currentEnemy]);

    return (
        <>
            <div className="container">
                <div>
                    <p>
                        attack: {playerSnap.skills.attack} xp: {playerSnap.xp.attackXP}
                    </p>
                    <p>
                        strength: {playerSnap.skills.strength} xp: {playerSnap.xp.strengthXP}
                    </p>
                    <p>
                        defense: {playerSnap.skills.defense} xp: {playerSnap.xp.defenseXP}
                    </p>
                    <p>
                        health: {playerSnap.skills.maxHP} xp: {playerSnap.xp.hpXP}
                    </p>
                </div>
                <div className="text-center pb-5 mb-5">
                    {dungeonEnemyList.map((el, index) => {
                        if (index == dungeonEnemyList.length - 1) {
                            return el.name;
                        }
                        return el.name + ", ";
                    })}
                </div>
                <div className="health-bar-container">
                    {" "}
                    <HealthBar barWidth={playerBarWidth} currHP={playerSnap.skills.currentHP} maxHP={playerSnap.skills.maxHP} name={playerSnap.name} />
                    {dungeonEnemyList[0] ? (
                        <HealthBar barWidth={enemyBarWidth} currHP={enemyCurrHP} maxHP={enemyMaxHP} name={dungeonEnemyList[0].name} />
                    ) : (
                        <HealthBar barWidth={enemyBarWidth} currHP={enemyCurrHP} maxHP={enemyMaxHP} />
                    )}
                </div>
                <div className="middle-grouping">
                    <div>
                        <PlayerMenu
                            attackStyle={attackStyle}
                            handleAttackStyleChange={handleAttackStyleChange}
                            inventory={playerInventory}
                            equipment={playerEquipment}
                            setInventory={setPlayerInventory}
                            setEquipment={setPlayerEquipment}
                        />
                    </div>
                    <div className="button-container">
                        <div className="button-groupings">
                            <button className="btn btn-warning px-2 mx-1" onClick={() => enterDungeon()} disabled={gameDisabled}>
                                Enter Dungeon
                            </button>
                            <button className="btn btn-warning px-2 mx-1" onClick={() => runFight(playerState as IPlayerState, currentEnemy as NPC.Enemy)} disabled={gameDisabled}>
                                start
                            </button>
                            <button className="btn btn-danger px-2 mx-1" onClick={() => clearConsole()} disabled={gameDisabled}>
                                clear
                            </button>
                        </div>

                        <div className="console" id="console">
                            {isLoading ? (
                                <h1>loading</h1>
                            ) : (
                                consoleMessages
                                    .slice(0)
                                    .reverse()
                                    .map((message, index) => {
                                        let messageArray = message.split(" ");
                                        let check = messageArray.indexOf("dealt");
                                        if (check > 0) {
                                            if (Number(messageArray[check + 1]) > 0) {
                                                return (
                                                    <p className="mx-3" key={index}>
                                                        <b>{message}</b>
                                                    </p>
                                                );
                                            }
                                        }
                                        return (
                                            <p className="mx-3" key={index}>
                                                {message}
                                            </p>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
