import React from "react";

import { Menu, MenuItem } from "@mui/material";
import { inventoryItemProps, storeSellerItemProps } from "../types/componentTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";
import { dropItemFromInventory, findItemByName, isThereAnOpenInventorySlot } from "../functions/utils";

function StoreSellerItem({ elm, index }: storeSellerItemProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    //@ts-ignore
    const itemName = elm["name"];
    //@ts-ignore
    const itemValue = elm["value"];
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(() => e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(() => null);
    };
    function handleBuy() {
        let hasCoins = findItemByName("Coin");
        let hasFreeSlot = isThereAnOpenInventorySlot();
        let itemTest = findItemByName(itemName);
        let isBuyingStackableItemTheyHave = () => {
            let stackableTest = elm.stackable;
            if (itemTest > -1 && stackableTest === true) {
                return true;
            } else {
                return false;
            }
        };
        if (hasCoins === -1 || playerState.inventory[hasCoins][0] < itemValue) {
            alert("You don't have enough gold to purchase this item");
            return;
        } else if (isBuyingStackableItemTheyHave()) {
            playerState.inventory[itemTest][0] += 1;
            playerState.inventory[hasCoins][0] -= itemValue;
        } else if (hasFreeSlot < 0) {
            alert("You don't have a free inventory slot for this item");
            return;
        } else {
            playerState.inventory[hasFreeSlot][0] += 1;
            playerState.inventory[hasFreeSlot][1] = elm;
            playerState.inventory[hasCoins][0] -= itemValue;
        }
        if (playerState.inventory[hasCoins][0] <= 0) {
            dropItemFromInventory(hasCoins);
        }
    }

    return (
        //@ts-ignore
        <div onClick={(e) => handleClick(e)}>
            <div className="inventory-space">
                {itemName}
                <br />

                {itemValue}
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleBuy()}>Buy</MenuItem>
            </Menu>
        </div>
    );
}

export default StoreSellerItem;
