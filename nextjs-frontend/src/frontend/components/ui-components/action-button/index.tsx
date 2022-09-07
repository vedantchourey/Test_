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
import { TournamentData } from "../../tournament";

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
  disabled?: boolean;
  data?: TournamentData;
  userId?: string;
}

const ActionButton: React.FC<Props> = ({
  id,
  onClick,
  items = [],
  buttonOnly = false,
  error,
  disabled,
  data,
  userId,
}) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [backColor, setBackcolor] = React.useState<string>(
    "linear-gradient(180deg, #EF507E 0%, #F09633 100%)"
  );
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const [joinText, setJoinText] = React.useState<string>("Join Now");

  React.useEffect(() => {
    data?.playerList?.filter((i: any) => i.id === userId).length &&
      (setBackcolor("#006A3E"), setJoinText("Joined"));
  }, [data]);

  const handleButtonClick = (): void => {
    if (!data?.playerList?.filter((i: any) => i.id === userId).length) {
      if (onClick) {
        onClick();
      }
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
            background:
              backColor === "#006A3E"
                ? backColor
                : disabled
                ? "grey"
                : "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
            color: "white",
            padding: "16px 43px",
            width: "189px",
          }}
          aria-controls={open ? id : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleButtonClick}
          disabled={disabled}
        >
          {joinText}
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
          background: disabled
            ? "grey"
            : "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
          color: "white",
          padding: "16px 43px",
          width: "189px",
        }}
        aria-controls={open ? id : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={disabled}
        endIcon={
          <Image src={"/icons/Downarrow.svg"} height={"12px"} width={"12px"} />
        }
      >
        {joinText}
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
