import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { runGameButtonsProps } from "../types/componentTypes";
import { IPlayerState, playerState } from "../store";
import { Enemy } from "../objects/characters/npc";

function RunFightButtons({ runFight, currentEnemy }: runGameButtonsProps) {
    const options = ["Fight x1", "Fight x5", "Fight x10", "Fight till end"];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        if (selectedIndex == 0) {
            handleFight1();
        }
        if (selectedIndex == 1) {
            handleFight5();
        }
        if (selectedIndex == 2) {
            handleFight10();
        }
        if (selectedIndex == 3) {
            handleFightFull();
        }
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        if (index == 0) {
            handleFight1();
        }
        if (index == 1) {
            handleFight5();
        }
        if (index == 2) {
            handleFight10();
        }
        if (index == 3) {
            handleFightFull();
        }
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    function handleFight1() {
        runFight(playerState as IPlayerState, currentEnemy as Enemy, 1);
    }
    function handleFight5() {
        runFight(playerState as IPlayerState, currentEnemy as Enemy, 5);
    }
    function handleFight10() {
        runFight(playerState as IPlayerState, currentEnemy as Enemy, 10);
    }
    function handleFightFull() {
        runFight(playerState as IPlayerState, currentEnemy as Enemy, -1);
    }

    return (
        <>
            <ButtonGroup style={{ border: "2px solid black" }} variant="contained" ref={anchorRef} aria-label="split button" className="game-buttons-group">
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    style={{ border: "0px solid black", borderLeft: "2px solid black" }}
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default RunFightButtons;
