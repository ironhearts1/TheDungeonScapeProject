import { gameButtonsProps } from "../types/componentTypes";

import RunFightButton from "./RunFightButton";

function GameButtons({ runFight, currentEnemy, enterDungeon, clearConsole, handleOpenStoreModal, handleTravelModalOpen, gameDisabled }: gameButtonsProps) {
    return (
        <>
            <div className="button-groupings">
                <button className="btn btn-warning px-1 mx-1" onClick={() => enterDungeon()} disabled={gameDisabled}>
                    Enter Dungeon
                </button>
                <RunFightButton runFight={runFight} currentEnemy={currentEnemy} />
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
        </>
    );
}

export default GameButtons;
