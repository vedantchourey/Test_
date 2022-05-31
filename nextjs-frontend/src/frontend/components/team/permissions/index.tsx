import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Player } from "../members";

export const NoobCell = styled(TableCell)(() => ({
  border: "0px",
}));

export const NoobRow = styled(TableRow)(() => ({
  border: "1px solid rgba(255, 255, 255, 0.1)",
  // "& td:nth-child(1)":{
  //     borderRight:"1px solid #6932F9"
  // }
}));

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
  "&.delete": {
    background: "rgba(255, 0, 0, 0.2)",
  },
  "&.leave": {
    background: "rgba(196, 213, 2, 0.2)",
  },
}));

const roles = ["Team Owner", "Team Captain", "Team Member"]

interface PermissionProps{
  players: Player[];
}

const Permissions: React.FC<PermissionProps> = ({players}) => {
  return (
    <React.Fragment>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography color={"white"} variant={"h5"}>
            Team users
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display={"flex"}
          sx={{justifyContent:{sm:"flex-end",xs:"space-between",md:"flex-end"}}}
        >
          <NoobButton size="small" className="leave" variant="contained">
            Leave Team
          </NoobButton>
          <NoobButton
            size="small"
            className="delete"
            variant="contained"
            style={{ margin: "0px 10px" }}
          >
            Delete Team
          </NoobButton>
          <NoobButton size="small" variant="contained">
            Add Member
          </NoobButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {players.map((player) => {
                  return (
                    <NoobRow sx={{display:{sm:"flex",xs:"flex",md:"table-row"},flexDirection:{sm:"column",xs:"column"}}} key={player.user_id}>
                      <NoobCell>
                        <Box display="flex" alignItems={"center"}>
                          <Avatar src={"/icons/PersonIcon.svg"}></Avatar>
                          <Typography marginLeft={2}>{player.firstName} {player.lastName}</Typography>
                        </Box>
                      </NoobCell>
                      <NoobCell>
                        <Box
                          display="flex"
                          alignItems={"center"}
                          minHeight={"33px"}
                        >
                          {" "}
                          <Divider
                            style={{ borderColor: "#6932F9" }}
                            orientation="vertical"
                            flexItem
                          />
                          <Typography
                            marginLeft={2}
                            color={"white"}
                            variant="body2"
                          >
                            {roles.join(" ")}
                          </Typography>
                        </Box>
                      </NoobCell>
                      <NoobCell>
                        <Box display={"flex"} justifyContent="space-between" alignContent={"center"}>
                        <CloseIcon color="warning" />{" "}
                        </Box>
                      </NoobCell>
                    </NoobRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Permissions;
