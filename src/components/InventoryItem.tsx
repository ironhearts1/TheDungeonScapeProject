import React, { useRef, useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import { inventoryItemProps } from "../types/componentTypes";

function InventoryItem({ elm, index, inventory, setInventory, equipment, setEquipment }: inventoryItemProps) {
    function handleDrop(index: number) {
        let newInvi = [...inventory];
        //@ts-ignore
        setInventory([...newInvi.toSpliced(index, 1), [0, null]]);
    }
    function handleEquip() {}
    function handleConsume() {}
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(() => e.currentTarget);
        console.log("clicked");
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
                              return <MenuItem onClick={() => handleEquip}>{option}</MenuItem>;
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
