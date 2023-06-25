import React, { useEffect, useState } from "react";
import { playerAttackStyleProps } from "../types/componentTypes";

function PlayerAttackStyle({ attackStyle, handleAttackStyleChange }: playerAttackStyleProps) {
    const [isAccurate, setIsAccurate] = useState(false);
    const [isAggressive, setIsAggressive] = useState(false);
    const [isDefensive, setIsDefensive] = useState(false);
    useEffect(() => {
        if (attackStyle === "Accurate") {
            setIsAccurate(() => true);
            setIsAggressive(() => false);
            setIsDefensive(() => false);
        } else if (attackStyle === "Aggressive") {
            setIsAccurate(() => false);
            setIsAggressive(() => true);
            setIsDefensive(() => false);
        } else {
            setIsAccurate(() => false);
            setIsAggressive(() => false);
            setIsDefensive(() => true);
        }
    }, [attackStyle]);

    return (
        <div>
            <form onChange={(e) => handleAttackStyleChange(e)}>
                <ul className="list-unstyled">
                    <li>
                        <input className="mx-1" type="radio" name="attack-style" value="Accurate" checked={isAccurate} />
                        <label className="mx-1" htmlFor="Accurate">
                            Accurate
                        </label>
                    </li>
                    <li>
                        <input className="mx-1" type="radio" name="attack-style" value="Aggressive" checked={isAggressive} />
                        <label className="mx-1" htmlFor="Aggressive">
                            Aggressive
                        </label>
                    </li>
                    <li>
                        <input className="mx-1" type="radio" name="attack-style" value="Defensive" checked={isDefensive} />
                        <label className="mx-1" htmlFor="Defensive">
                            Defensive
                        </label>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default PlayerAttackStyle;
