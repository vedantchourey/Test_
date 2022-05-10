import { Grid, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import moment from "moment";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Doughnut } from "react-chartjs-2";
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

const chartOptions = {
  legend: {
    display: true,
    position: "bottom",
  },
  elements: {
    arc: {
      borderWidth: 2,
      // spacing:2,
    },
  },
};

const chartData = {
  labels: ["Top Match", "Loose", "Win"],
  datasets: [
    {
      data: [8, 4],
      backgroundColor: ["rgba(227, 35, 255, 1)", "rgba(138, 255, 108, 1)"],
      borderColor: ["rgba(227, 35, 255, 1)", "rgba(138, 255, 108, 1)"],
      spacing: 2,
      borderWidth: 1,
      weight: 1,
    },
    {
      data: [],
      weight: 1,
    },
    {
      data: [12],
      backgroundColor: ["rgba(255, 212, 34, 1)"],
      borderColor: ["rgba(255, 212, 34, 1)"],
      borderWidth: 1,
      weight: 1,
    },
  ],
};

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
      <Grid item xs={12} sm={12} md={4}>
        <Box
          style={{ background: "#08001C", borderRadius: "10px" }}
          flexDirection="column"
          display={"flex"}
          alignItems="center"
        >
          <Box width={"50%"} height={"100%"} marginBottom={2}>
            <Doughnut data={chartData} options={chartOptions} />
          </Box>
          <Typography color={"white"}>Total Earning</Typography>
          <Typography color={"white"}> $12,875 </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MatchHistory;
