import { Grid, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import moment from "moment";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import {
  NoobTableCell,
  NoobTableHead,
  NoobTableRow,
} from "../../ui-components/table/AltTable";

function createData(
  team1: string,
  team2: string,
  date: string,
  status: string
):any {
  return {team1, team2, date, status };
}

const rows = [
  createData(
    " Old Legends",
    "Best Legends",
    moment().format("DD.MM.YYYY"),
    "win"
  ),
  createData(
    "Old Legends",
    "Best Legends",
    moment().format("DD.MM.YYYY"),
    "win"
  ),
];

const MatchHistory:React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <TableContainer>
          <Table>
            <NoobTableHead>
              <NoobTableRow style={{ color: "#201146" }}>
                <NoobTableCell>Teams</NoobTableCell>
                <NoobTableCell>Date</NoobTableCell>
                <NoobTableCell>Status</NoobTableCell>
              </NoobTableRow>
            </NoobTableHead>
            <TableBody>
              {rows.map((row) => (
                <NoobTableRow key={row.status}>
                  <NoobTableCell
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{row.team1}</Typography>
                    <Typography color={"#F09633"}>VS</Typography>
                    <Typography>{row.team2}</Typography>
                  </NoobTableCell>
                  <NoobTableCell>{row.date}</NoobTableCell>
                  <NoobTableCell>{row.status}</NoobTableCell>
                </NoobTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    
    </Grid>
  );
};

export default MatchHistory;
