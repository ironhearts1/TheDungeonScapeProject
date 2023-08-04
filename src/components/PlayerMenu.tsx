import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { playerMenuProps } from "../types/componentTypes";
import { useState } from "react";
import InventoryItem from "./InventoryItem";
import PlayerAttackStyle from "./PlayerAttackStyle";
import { playerState } from "../store";
import { useSnapshot } from "valtio";
import EquipmentItem from "./EquipmentItem";

export default function PlayerMenu({ handleAttackStyleChange, attackStyle }: playerMenuProps) {
    const playerSnap = useSnapshot(playerState, { sync: true });
    const [value, setValue] = useState("1");
    const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }} className="player-menu">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleMenuChange} aria-label="lab API tabs example">
                        <Tab label="Attack Style" value="1" />
                        <Tab label="Inventory" value="2" />
                        <Tab label="Equipment" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PlayerAttackStyle attackStyle={attackStyle} handleAttackStyleChange={handleAttackStyleChange} />
                </TabPanel>
                <TabPanel value="2">
                    <div className="player-inventory">
                        {playerSnap.inventory.map((elm, index) => {
                            //@ts-ignore
                            if (elm[1] === false) {
                                return;
                            }
                            //@ts-ignore
                            return <InventoryItem elm={elm} index={index} />;
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className="player-equipment">
                        {playerState.equipment.map((elm, index) => {
                            return <EquipmentItem elm={elm} index={index} />;
                        })}
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
