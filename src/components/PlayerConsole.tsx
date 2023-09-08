import React, { useEffect } from "react";
import { playerConsoleProps } from "../types/componentTypes";

function PlayerConsole({ isLoading, consoleMessages }: playerConsoleProps) {
    useEffect(() => {
        if (consoleMessages.length > 150) {
            console.log("deleted");
            consoleMessages.splice(0, 50);
        }
    }, [consoleMessages]);

    return (
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
    );
}

export default PlayerConsole;
