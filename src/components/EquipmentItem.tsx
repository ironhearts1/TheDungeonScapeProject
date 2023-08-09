import React from "react";
import { useSnapshot } from "valtio";
import { playerState } from "../store";
import { equipmentItemProps } from "../types/componentTypes";
import { Menu, MenuItem } from "@mui/material";

function EquipmentItem({ elm, index, updateConsole }: equipmentItemProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleUnequip() {
        if (elm[1]) {
            let unEquippingItem = elm[1];
            let unEquipType = unEquippingItem.equipSlot;
            let slot = playerState.equipment[index];
            if (slot[0] === unEquipType) {
                let freeSpace;
                for (let i = 0; i < playerState.inventory.length; i++) {
                    if (playerState.inventory[i][1] == false) {
                        freeSpace = playerState.inventory[i];
                        console.log(freeSpace, i);
                        break;
                    }
                }

                if (!freeSpace) {
                    updateConsole("There is no space for you to unequip that!");
                    return;
                }

                freeSpace[1] = unEquippingItem;
                freeSpace[0]++;
                slot[1] = false;
            }
        }
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(() => e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(() => null);
    };
    return (
        //@ts-ignore
        <div onClick={(e) => handleClick(e)} className="equipment-slot">
            <p>{playerSnap.equipment[index][0]}</p>

            {
                //@ts-ignore
                playerSnap.equipment[index][1] ? <p>{playerSnap.equipment[index][1].name}</p> : null
            }
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {elm[1]
                    ? elm[1].clickOptions.map((option: string) => {
                          if (option === "Equip") {
                              //@ts-ignore
                              return <MenuItem onClick={() => handleUnequip()}>Unequip</MenuItem>;
                          } else {
                              return;
                          }
                      })
                    : null}
            </Menu>
        </div>
    );
}

export default EquipmentItem;
