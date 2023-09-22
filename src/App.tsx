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
import { addDropToInventory, experienceGained, generateBossFight, generateEnemyList, rollEnemyAttack, rollPlayerAttack } from "./functions/fightFuncs";
import StoreModal from "./components/Modals/StoreModal";
import TravelModal from "./components/Modals/TravelModal";
import GameButtons from "./components/GameButtons";
import PlayerConsole from "./components/PlayerConsole";
import UserStats from "./components/UserStats";
import LocalChatModal from "./components/Modals/LocalChatModal";

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
    const [isLocalChatModalOpen, setIsLocalChatModalOpen] = useState(false);

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
    function handleLocalChatModalOpen() {
        setIsLocalChatModalOpen(() => true);
    }
    function handleLocalChatModalClose() {
        setIsLocalChatModalOpen(() => false);
    }
    async function runFight(player: IPlayerState, enemy: character, timesRun: number) {
        if (currentEnemy === null) {
            updateConsole("You have no current enemy to fight! Enter a dungeon and get to work!");
            return;
        }
        setGameDisabled(true);
        updateConsole(`Fight Begin! player health ${player.skills.currentHP} || enemy health ${enemy.currentHP}`);
        if (timesRun === -1) {
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
        } else {
            for (let i = 0; i < timesRun; i++) {
                await sleep(0.15);
                //player attack phase

                rollPlayerAttack(player, enemy, updateConsole, setEnemyCurrHP);
                if (currentEnemy.currentHP <= 0) {
                    updateConsole("Enemy Defeated!");
                    break;
                }

                //enemy attack phase
                await sleep(0.15);
                rollEnemyAttack(enemy, player, updateConsole);
                if (player.skills.currentHP <= 0) {
                    updateConsole("Oh shit you died!");
                    player.combat.setHP(player.skills.maxHP);
                    setGameDisabled(false);
                    return;
                }
                if (i === timesRun - 1) {
                    setGameDisabled(false);
                    return;
                }
            }
        }

        updateConsole(`The fights over! player health ${player.skills.currentHP} || enemy health ${enemy.currentHP}`);
        enemyKilled(enemy);
        setGameDisabled(false);
    }

    function enterDungeon() {
        let tempList: character[] = generateEnemyList();
        updateCurrentEnemy(tempList);
    }
    function enterBossDungeon(index: number) {
        let inventory = playerState.inventory;
        let slot = inventory[index];
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
        experienceGained(enemy, attackStyle);
        let dropReturn: [Item | CombatItem | HealingItem | false, number] = calculateLootDrop(enemy.lootTable);
        addDropToInventory(dropReturn, updateConsole);
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
                <LocalChatModal isOpen={isLocalChatModalOpen} handleModalClose={handleLocalChatModalClose} />
                <UserStats />
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
                        <PlayerMenu attackStyle={attackStyle} handleAttackStyleChange={handleAttackStyleChange} updateConsole={updateConsole} enterBossDungeon={enterBossDungeon} />
                    </div>
                    <div className="console-container">
                        <GameButtons
                            runFight={runFight}
                            currentEnemy={currentEnemy as NPC.Enemy}
                            enterDungeon={enterDungeon}
                            clearConsole={clearConsole}
                            handleOpenStoreModal={handleOpenStoreModal}
                            handleTravelModalOpen={handleTravelModalOpen}
                            gameDisabled={gameDisabled}
                            handleLocalChatModalOpen={handleLocalChatModalOpen}
                        />
                        <PlayerConsole isLoading={isLoading} consoleMessages={consoleMessages} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
