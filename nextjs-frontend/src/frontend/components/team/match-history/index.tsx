import { Grid, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import {
  NoobTableCell,
  NoobTableHead,
  NoobTableRow,
} from "../../ui-components/table/AltTable";
import { IMatchHubData } from "../../../../../pages/match-hub";
import { userProfileSelector } from "../../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";

const MatchHistory: React.FC<{ data: IMatchHubData[] }> = (props) => {
  const user = useAppSelector(userProfileSelector);
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <TableContainer>
          <Table>
            <NoobTableHead>
              <NoobTableRow style={{ color: "#201146" }}>
                <NoobTableCell>Teams</NoobTableCell>
                <NoobTableCell>Status</NoobTableCell>
              </NoobTableRow>
            </NoobTableHead>
            <TableBody>
              {props.data.map((row, idx) => {
                const opponent1Name = row.opponent1.user_id
                ? `${row.opponent1.firstName} ${row.opponent1.lastName}`
                : row.opponent1.name || "N/A";
              const opponent2Name = row.opponent2.user_id
                ? `${row.opponent2.firstName} ${row.opponent2.lastName}`
                : row.opponent2.name || "N/A";
                const myPlayer =
                row.opponent1.user_id === user?.id
                  ? row.opponent1
                  : row.opponent2;
                return (
                  <NoobTableRow key={idx}>
                    <NoobTableCell
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{opponent1Name}</Typography>
                      <Typography color={"#F09633"}>VS</Typography>
                      <Typography>{opponent2Name}</Typography>
                    </NoobTableCell>
                    <NoobTableCell>
                      {myPlayer.result
                        ? myPlayer.result === "win"
                          ? "Win"
                          : "Loss"
                        : "-"}
                    </NoobTableCell>
                  </NoobTableRow>
                );})}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default MatchHistory;
