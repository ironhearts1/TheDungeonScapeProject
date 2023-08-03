import React, { useRef, useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import { inventoryItemProps } from "../types/componentTypes";
import { CombatItem, HealingItem } from "../types/itemTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";

function InventoryItem({ elm, index }: inventoryItemProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleDrop(index: number) {
        console.log(playerSnap);
        console.log("dropped");
        let newInvi = [...playerState.inventory];
        //@ts-ignore
        let test = [...newInvi.toSpliced(index, 1), [0, false]];
        playerState.inventory = test;
    }
    function handleEquip(item: [number, CombatItem]) {
        console.log(item);
    }
    function handleConsume() {}
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(() => e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(() => null);
    };

    return (
        //@ts-ignore
        <div onClick={(e) => handleClick(e)} className="test">
            <div className="inventory-space">
                {index + 1}
                <br />
                {elm[0] + " "}
                {elm[1] ? elm[1]["name"] : "null"}
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {elm[1]
                    ? elm[1].clickOptions.map((option: string) => {
                          if (option === "Drop") {
                              return <MenuItem onClick={() => handleDrop(index)}>{option}</MenuItem>;
                          } else if (option === "Equip") {
                              //@ts-ignore
                              return <MenuItem onClick={() => handleEquip(elm)}>{option}</MenuItem>;
                          } else if (option === "Consume") {
                              return <MenuItem onClick={() => handleConsume}>{option}</MenuItem>;
                          } else {
                              return;
                          }
                      })
                    : null}
            </Menu>
        </div>
    );
}

export default InventoryItem;
// <InventoryItemMenu
//     inventoryItem={elm}
//     index={index}
//     currentItemMenuOpen={currentItemMenuOpen}
//     setCurrentItemMenuOpen={setCurrentItemMenuOpen}
//     handleDrop={handleDrop}
//     handleEquip={handleEquip}
//     handleConsume={handleConsume}
//     isOpen={isOpen}
//     setIsOpen={setIsOpen}
// />
