import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = [
  "New group",
  "New community",
  "Starred messages",
  "Select chats",
  "Settings",
  "Log out",
];

const ITEM_HEIGHT = 48;

export default function Menuz({
  open,
  anchorEl,
  setAnchorEl,
  handleClick,
  handleClose,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 6.5,
          width: "20ch",
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {options.map((option) => (
        <MenuItem
          key={option}
          selected={option === "Pyxis"}
          onClick={handleClose}
        >
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
}
