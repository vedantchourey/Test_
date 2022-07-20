import styled from "@emotion/styled";
import {
  Box,
  Button,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import GameDropDown from "../../../drop-downs/game-drop-down";
import PlatformDropDown from "../../../drop-downs/platform-drop-down";
import styles from "../../../tournaments/tournament-details-form.module.css";
export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
}));

const MemberButton = ({ setParam }: any): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [gameId, setGameId] = useState<string | undefined>("");
  const [platformId, setPlatformId] = useState<string | undefined>("");
  const [level, setLevel] = useState<string>("all");
  useEffect(() => {
    // setParam
    if (gameId || platformId) {
      setParam({
        gameId,
        platformId,
        level,
      });
    }
  }, [gameId, platformId, level]);
  return (
    <>
      {isMobile ? (
        <>
          <Box sx={{ m: 1 }}>
            <GameDropDown
              label="Game"
              placeholder="Search by  Games"
              onChange={(d: string | undefined): void => setGameId(d)}
              value={gameId}
              inputClassName={styles.inputItem}
              autoCompleteClassName={styles.inputItem}
            />
          </Box>

          <Box sx={{ m: 1 }}>
            <PlatformDropDown
              label="Platform"
              placeholder="Select Platform"
              allowAll
              onChange={(id: any): void => setPlatformId(id)}
              inputClassName={styles.inputItem}
              autoCompleteClassName={styles.inputItem}
              value={platformId}
            />
            <Box>
              <Select
                // displayEmpty
                id="team-select"
                style={{ width: 250 }}
                // onChange={(e): any => setSelectedTeam(e.target.value)}
                // value={selectedTeam}
                defaultValue={""}
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
      ) : (
        <>
          <Box width={500} display="flex">
            <Box sx={{ mr: 2, width: "100%" }}>
              <GameDropDown
                label="Game"
                placeholder="Search by  Games"
                onChange={(d: string | undefined): void => setGameId(d)}
                value={gameId}
                inputClassName={styles.inputItem}
                autoCompleteClassName={styles.inputItem}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
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
            <Box sx={{ ml: 2, width: "100%" }}>
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
      )}
    </>
  );
};

export default MemberButton;
