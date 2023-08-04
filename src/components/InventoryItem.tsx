import React, { useRef, useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import { equipmentItemProps, inventoryItemProps } from "../types/componentTypes";
import { CombatItem, HealingItem } from "../types/itemTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";

function InventoryItem({ elm, index }: inventoryItemProps) {
    console.log(playerState.inventory);
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleDrop() {
        let _newInvi = [...playerState.inventory];
        //@ts-ignore
        let newInvi = [..._newInvi.toSpliced(index, 1), [0, false]];
        playerState.inventory = newInvi;
    }
    function handleEquip() {
        console.log(elm);
        if (elm[1]) {
            let equippingItem = elm[1] as CombatItem;
            let equiptype = equippingItem.equipSlot;
            console.log(playerState.inventory);
            console.log(playerState.equipment);
            playerState.equipment.map((slot, i) => {
                if (slot[0] === equiptype) {
                    console.log("type found", slot[0], equiptype);
                    if (slot[1] === false) {
                        playerState.equipment[i][1] = equippingItem;
                        console.log("equipped");
                        if ((equippingItem.stackable = false)) {
                            handleDrop();
                            console.log("dropped");
                        } else {
                            playerState.inventory[index][0] -= 1;
                        }
                    } else {
                        let swappingItem = playerState.equipment[i][1];
                        playerState.equipment[i][1] = equippingItem;
                        playerState.inventory[index][1] = swappingItem;
                    }
                }
            });
        }
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
        <div onClick={(e) => handleClick(e)}>
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
                              return <MenuItem onClick={() => handleDrop()}>{option}</MenuItem>;
                          } else if (option === "Equip") {
                              //@ts-ignore
                              return <MenuItem onClick={() => handleEquip()}>{option}</MenuItem>;
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
