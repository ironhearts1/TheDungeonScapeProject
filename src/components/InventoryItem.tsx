import React, { useRef, useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import { equipmentItemProps, inventoryItemProps } from "../types/componentTypes";
import { CombatItem, HealingItem } from "../types/itemTypes";
import { playerState } from "../store";
import { useSnapshot } from "valtio";

function InventoryItem({ elm, index }: inventoryItemProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    function handleDrop() {
        let _newInvi = [...playerState.inventory];
        //@ts-ignore
        let newInvi = [..._newInvi.toSpliced(index, 1), [0, false]];
        playerState.inventory = newInvi;
    }
    function handleEquip() {
        if (elm[1]) {
            let equippingItem = elm[1] as CombatItem;
            let equiptype = equippingItem.equipSlot;
            playerState.equipment.map((slot, i) => {
                if (slot[0] === equiptype) {
                    console.log("type found", slot[0], equiptype, equippingItem);
                    if (slot[1] === false) {
                        playerState.equipment[i][1] = equippingItem;
                        console.log("equipped");
                        if (equippingItem.stackable === false) {
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
    function handleConsume() {
        console.log("consumed");
        let itemCount = elm[0];
        let item = elm[1] as HealingItem;
        let healAmount = item.pointsHealed;
        let hpMissing = playerState.skills.maxHP - playerState.skills.currentHP;
        console.log(playerState.skills);
        //the healing
        if (hpMissing <= healAmount) {
            playerState.skills.currentHP = playerState.skills.maxHP;
        } else {
            playerState.skills.currentHP = playerState.skills.currentHP + healAmount;
        }
        //amount manipulation
        if (itemCount === 1) {
            handleDrop();
            return;
        } else {
            playerState.inventory[index][0] = playerState.inventory[index][0] - 1;
        }
    }
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
                              return <MenuItem onClick={() => handleConsume()}>{option}</MenuItem>;
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
