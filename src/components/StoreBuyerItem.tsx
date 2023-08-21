import React, { useRef, useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import { equipmentItemProps, inventoryItemProps } from "../types/componentTypes";
import { CombatItem, HealingItem } from "../types/itemTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";

function StoreBuyerItem({ elm, index }: inventoryItemProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(() => e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(() => null);
    };
    function handleSell() {}
    if (elm[1]) {
        if (elm[1].name === "Coin") {
            return;
        } else
            return (
                //@ts-ignore
                <div onClick={(e) => handleClick(e)}>
                    <div className="inventory-space">
                        {elm[0] + " "}
                        {elm[1] ? elm[1]["name"] : "null"}
                    </div>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={() => handleSell()}>Sell</MenuItem>;
                    </Menu>
                </div>
            );
    } else {
        return;
    }
}

export default StoreBuyerItem;
