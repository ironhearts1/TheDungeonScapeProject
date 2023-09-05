import { useEffect, useState } from "react";
import "./styles/css/styles.min.css";
import { character } from "./types/characterTypes";
import { playerState, IPlayerState } from "./store";
import { useSnapshot } from "valtio";
import * as NPC from "./objects/characters/npc";
import { sleep, between, calculateLootDrop, isThereAnOpenInventorySlot, saveToDatabase } from "./functions/utils";
import HealthBar from "./components/HealthBar";
import PlayerMenu from "./components/PlayerMenu";
import { CombatItem, HealingItem, Item } from "./types/itemTypes";
import { generateBossFight, generateEnemyList, rollEnemyAttack, rollPlayerAttack } from "./functions/fightFuncs";
import StoreModal from "./components/StoreModal";
import TravelModal from "./components/TravelModal";

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
    const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
    const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);

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
    function handleOpenStoreModal() {
        setIsStoreModalOpen(() => true);
    }
    function handleCloseStoreModal() {
        setIsStoreModalOpen(() => false);
    }
    function handleTravelModalOpen() {
        setIsTravelModalOpen(() => true);
    }
    function handleTravelModalClose() {
        setIsTravelModalOpen(() => false);
    }
    async function runFight(player: IPlayerState, enemy: character) {
        console.log(currentEnemy);
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
        let tempList: character[] = generateEnemyList();
        updateCurrentEnemy(tempList);
    }
    function enterBossDungeon() {
        let inventory = playerState.inventory;

        inventory.map((slot) => {
            if (slot[1] === false) {
                return;
            } else {
                let itemName = slot[1].name.split(" ");
                if (itemName[0] === "Boss" && itemName[1] === "Key" && playerState.location == Number(itemName[2])) {
                    if (slot[0] === 1) {
                        slot[0]--;
                        slot[1] = false;
                        let tempList: character[] = generateBossFight();
                        updateCurrentEnemy(tempList);
                        return;
                    } else if (slot[0] > 1) {
                        console.log("good");
                        slot[0]--;
                        let tempList: character[] = generateBossFight();
                        updateCurrentEnemy(tempList);
                        return;
                    }
                } else if (itemName[0] === "Boss" && itemName[1] === "Key" && playerState.location != Number(itemName[2])) {
                    updateConsole("You are using the wrong boss key for this location");
                }
                return;
            }
        });
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
        let dropReturn: [Item | CombatItem | HealingItem | false, number] = calculateLootDrop(enemy.lootTable);
        addDropToInventory(dropReturn);
        if (currentEnemy) {
            if (currentEnemy.boss) {
                if (playerState.bossesKilled.indexOf(playerState.location) === -1) {
                    playerState.bossesKilled.push(playerState.location);
                }
            }
        }

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
        saveToDatabase();
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
        }
    }

    function addDropToInventory(drop: [Item | CombatItem | HealingItem | false, number]) {
        // DROP IS [ITEM, AMOUNT]
        // INVENTORY IS [[AMOUNT, ITEM],[AMOUNT, ITEM], ECT]
        if (drop[0] === false) {
            updateConsole("Looted nothing from the corpse");
            return;
        }
        let inventory = [...playerState.inventory];
        let stackable = drop[0]["stackable"];
        let openSlot = isThereAnOpenInventorySlot();
        if (openSlot === -1 && stackable === false) {
            updateConsole(`You drop fell on the floor because you have no space!`);
            return;
        }
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i][1] === false) {
                updateConsole(`You looted ${drop[1]} ${drop[0]["name"]}`);
                inventory[i][1] = drop[0];
                inventory[i][0] = drop[1];
                playerState.inventory = inventory;
                return;
            }
            if (stackable === true) {
                //@ts-ignore
                if (inventory[i][1]["name"] === drop[0]["name"]) {
                    updateConsole(`You looted ${drop[1]} ${drop[0]["name"]}`);
                    inventory[i][0] += drop[1];
                    playerState.inventory = inventory;
                    return;
                }
            }
        }
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
                <StoreModal isOpen={isStoreModalOpen} handleModalClose={handleCloseStoreModal} />
                <TravelModal isOpen={isTravelModalOpen} handleModalClose={handleTravelModalClose} />
                <div>
                    <p>
                        Attack: {playerSnap.skills.attack} XP: {playerSnap.xp.attackXP} Bonus: {playerSnap.bonuses.attackBonus}
                    </p>
                    <p>
                        Strength: {playerSnap.skills.strength} XP: {playerSnap.xp.strengthXP} Bonus: {playerSnap.bonuses.strengthBonus}
                    </p>
                    <p>
                        Defense: {playerSnap.skills.defense} XP: {playerSnap.xp.defenseXP} Bonus: {playerSnap.bonuses.defenseBonus}
                    </p>
                    <p>
                        Health: {playerSnap.skills.maxHP} XP: {playerSnap.xp.hpXP}
                    </p>
                    <p>Level: {playerSnap.location}</p>
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
                        <PlayerMenu attackStyle={attackStyle} handleAttackStyleChange={handleAttackStyleChange} updateConsole={updateConsole} />
                    </div>
                    <div className="console-container">
                        <div className="button-groupings">
                            <button className="btn btn-warning px-1 mx-1" onClick={() => enterDungeon()} disabled={gameDisabled}>
                                Enter Dungeon
                            </button>
                            <button className="btn btn-warning px-1 mx-1" onClick={() => runFight(playerState as IPlayerState, currentEnemy as NPC.Enemy)} disabled={gameDisabled}>
                                Start
                            </button>
                            <button className="btn btn-info px-1 mx-1" onClick={() => enterBossDungeon()} disabled={gameDisabled}>
                                Enter the Bosses Dungeon
                            </button>
                            <button className="btn btn-danger px-1 mx-1" onClick={() => clearConsole()} disabled={gameDisabled}>
                                Clear
                            </button>
                            <button className="btn btn-success px-1 mx-1" onClick={() => handleOpenStoreModal()} disabled={gameDisabled}>
                                The Store
                            </button>
                            <button className="btn btn-success px-1 mx-1" onClick={() => handleTravelModalOpen()} disabled={gameDisabled}>
                                Travel
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
                                        let damageCheck = messageArray.indexOf("dealt");
                                        let lootCheck = messageArray.indexOf("looted");
                                        if (damageCheck > 0 || lootCheck > 0) {
                                            if (Number(messageArray[damageCheck + 1]) > 0) {
                                                return (
                                                    <p className="mx-3" key={index}>
                                                        <b>{message}</b>
                                                    </p>
                                                );
                                            } else if (lootCheck > 0) {
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
