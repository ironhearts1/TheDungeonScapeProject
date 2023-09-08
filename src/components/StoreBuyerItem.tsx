import React from "react";

import { Menu, MenuItem } from "@mui/material";
import { inventoryItemProps } from "../types/componentTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";
import { dropItemFromInventory, findItemByName, isThereAnOpenInventorySlot } from "../functions/utils";
import { coin } from "../objects/items/items";

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
    function handleSell() {
        if (elm[1]) {
            const itemSellValue = Math.floor(elm[1].value * 0.65);
            let hasCoins = findItemByName("Coin");
            if (hasCoins === -1) {
                playerState.inventory[index][0] = itemSellValue;
                playerState.inventory[index][1] = coin;
                return;
            } else if (hasCoins >= 0) {
                playerState.inventory[hasCoins][0] += itemSellValue;
                dropItemFromInventory(index);
            }
        }
    }
    if (elm[1]) {
        if (elm[1].name === "Coin") {
            return;
        } else
            return (
                //@ts-ignore
                <div onClick={(e) => handleClick(e)}>
                    <div className="inventory-space">
                        {elm[0] + " "}
                        <br />
                        {elm[1] ? elm[1]["name"] : "null"}
                        <br />
                        {elm[1] ? "sell for " + Math.floor(elm[1]["value"] * 0.65) : "null"}
                    </div>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={() => handleSell()}>Sell</MenuItem>
                    </Menu>
                </div>
            );
    } else {
        return;
    }
}

export default StoreBuyerItem;
