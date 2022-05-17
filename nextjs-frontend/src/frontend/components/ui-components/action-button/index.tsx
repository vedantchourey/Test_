import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      background: "#6932F9",
      width: "189px",
      "& .MuiMenuItem-root": {
        "&:hover": {
          background: "#F08743",
        },
      },
    },
  }));

export interface ActionItem {
  title: string;
  onClick?: () => void;
}

export interface Props {
  onClick?: () => void;
  id: string;
  items: ActionItem[][];
  buttonOnly?: boolean;
  error?: string;
}

const ActionButton: React.FC<Props> = ({
  id,
  onClick,
  items = [],
  buttonOnly = false,
  error,
}) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleButtonClick = ():void => {
    if (onClick) {
      onClick();
    }
  };

  const handleClose = (callBack?: () => void): void => {
    setAnchorEl(null);
    if (callBack !== undefined && typeof callBack === "function") {
      callBack();
    }
  };

  if (buttonOnly) {
    return (
      <Box>
        <Button
          style={{
            background: "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
            color: "white",
            padding: "16px 43px",
            width: "189px",
          }}
          aria-controls={open ? id : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleButtonClick}
        >
          Join Now
        </Button>
        {error && (
          <Typography color={"red"} textAlign={"left"} marginTop={1}>
            {error}
          </Typography>
        )}
      </Box>
    );
  }

  const renderItem = (): JSX.Element[] => {
    const itemMap: JSX.Element[] = [];

    items.forEach((itemList, index) => {
      itemList.forEach(({ title, onClick }) => {
        itemMap.push(
          <MenuItem onClick={(): void => handleClose(onClick)}>
            {title}
          </MenuItem>
        );
      });
      if (index < itemList.length) {
        itemMap.push(<Divider sx={{ my: 0.5 }} />);
      }
    });

    return itemMap;
  };

  return (
    <Box display="flex" flexDirection={"column"}>
      <Button
        style={{
          background: "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
          color: "white",
          padding: "16px 43px",
          width: "189px",
        }}
        aria-controls={open ? id : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={
          <Image src={"/icons/Downarrow.svg"} height={"12px"} width={"12px"} />
        }
      >
        Join Now
      </Button>
      {error && (
          <Typography color={"red"} textAlign={"left"} marginTop={1}>
            {error}
          </Typography>
        )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={(): void => handleClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{ paper: styles.paper }}
        disableScrollLock={true}
        id={id}
      >
        {renderItem()}
      </Menu>
    </Box>
  );
};

export default ActionButton;
