import styled from "@emotion/styled";
import {
  Box,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import GameDropDown from "../../../drop-downs/game-drop-down";
import PlatformDropDown from "../../../drop-downs/platform-drop-down";
import styles from "../../../tournaments/tournament-details-form.module.css";
import { isDeviceTypeSelector } from "../../../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../../../../../src/frontend/redux-store/layout/device-types';
import { useAppSelector } from "../../../../../../src/frontend/redux-store/redux-store";

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
}));

const MemberButton = ({ setParam }: any): JSX.Element => {
  const [gameId, setGameId] = useState<string | undefined>("");
  const [platformId, setPlatformId] = useState<string | undefined>("");
  const [level, setLevel] = useState<string>("all");

  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

  useEffect(() => {
    // setParam
    if (gameId || platformId || level && setParam) {
      setParam({
        gameId,
        platformId,
        level,
      });
    }
  }, [gameId, platformId, level]);
  return (
    <>
        <>
          <Box width={isDesktop ? 500 : "auto"} display="flex" flexDirection={isDesktop ? "row" : "column"}>
            <Box sx={isDesktop ? { mr: 2, width: "100%" } : { ml: 0.8, width: "96%" }}>
              <GameDropDown
                label="Game"
                placeholder="Search by Games"
                onChange={(d: string | undefined): void => setGameId(d)}
                value={gameId}
                inputClassName={styles.inputItem}
                autoCompleteClassName={styles.inputItem}
              />
            </Box>

            <Box sx={isDesktop ? { mr: 2, width: "100%" } : { ml: 0.8, width: "96%" }}>
              <PlatformDropDown
                label="Platform"
                placeholder="Select Platform"
                allowAll
                onChange={(id: any): void => setPlatformId(id)}
                inputClassName={styles.inputItem}
                autoCompleteClassName={styles.inputItem}
                value={platformId}
              />
            </Box>

            <Box sx={isDesktop ? { ml: 2, width: "100%" } : { ml: 0.8, width: "96%" }}>
              <Select
                id="team-select"
                style={{ width: "100%" }}
                onChange={(d): void => setLevel(d.target.value)}
                value={level}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="bronze">Bronze</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
                <MenuItem value="ruby">Ruby</MenuItem>
              </Select>
            </Box>
          </Box>
        </>
    </>
  );
};

export default MemberButton;
