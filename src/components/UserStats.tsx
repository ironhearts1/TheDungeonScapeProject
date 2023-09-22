import React from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../store";

function UserStats() {
    const playerSnap = useSnapshot(playerState, { sync: true });
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
                {playerSnap.currentQuest.length === 1 ? playerState.currentQuest : `Kill ${playerState.currentQuest[1]} ${playerState.currentQuest[0]} || ${playerState.currentQuest[2]} left`}
            </p>
        </div>
    );
}

export default UserStats;
