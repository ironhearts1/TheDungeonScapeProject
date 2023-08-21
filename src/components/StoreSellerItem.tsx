import React, { useRef, useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import { equipmentItemProps, inventoryItemProps } from "../types/componentTypes";
import { CombatItem, HealingItem } from "../types/itemTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";

function StoreSellerItem({ elm, index }: inventoryItemProps) {
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
    function handleBuy() {}

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
