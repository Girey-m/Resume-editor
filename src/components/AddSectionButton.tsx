import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { SectionType } from "../interfaces/SectionType";

interface AddSectionButtonProps {
  onSelect: (section: SectionType) => void;
}

const sections: SectionType[] = [
  "Опыт",
  "Образование",
  "Навыки",
  "Сертификаты",
  "О себе",
];

const AddSectionButton: React.FC<AddSectionButtonProps> = ({ onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (section?: SectionType) => {
    setAnchorEl(null);
    if (section) {
      onSelect(section);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Добавить секцию
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
        {sections.map((section) => (
          <MenuItem
            key={section}
            sx={{ width: "100%" }}
            onClick={() => handleClose(section)}
          >
            {section}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AddSectionButton;
