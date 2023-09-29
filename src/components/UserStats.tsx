import React from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../store";

function UserStats() {
    const playerSnap = useSnapshot(playerState, { sync: true });
    //@ts-ignore
    let killsDone = playerState.currentQuest.questGoal - playerState.currentQuest.killsLeft;
    return (
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
            <p>
                Current Quest:
                {playerSnap.currentQuest.questEnemy === "None"
                    ? " " + playerSnap.currentQuest.questEnemy
                    : ` Kill ${playerSnap.currentQuest.questEnemy} ${killsDone}/${playerSnap.currentQuest.questGoal}`}
            </p>
        </div>
    );
}

export default UserStats;
