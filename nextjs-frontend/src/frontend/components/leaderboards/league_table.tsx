import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { borderBottom } from "@mui/system";
import React from "react";

export const HeadCell = styled(TableCell)(() => ({
  borderTop: "1px solid #ffffff1a",
  borderBottom:"none"
}));

export const NoobCell = styled(TableCell)(() => ({
  border: "1px solid #ffffff1a",
  alignItems: "center"
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center"
}));

const data: { rank: string; subtext: string; teams: string[]; nextfixture: string[]; points: string; wins: string; losses: string; top: boolean; }[] = [
  {
    rank: "1",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club","/icons/Winner.svg"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: true,
  },
  {
    rank: "2",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "3",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "4",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "5",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "6",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "7",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "8",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "9",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
  {
    rank: "10",
    subtext: "th",
    teams: ["/icons/Rectangle.svg", "Legend Club"],
    nextfixture: ["/icons/Rectangle.svg", "Legend Club"],
    points: "16",
    wins: "16",
    losses: "16",
    top: false,
  },
];

const LeagueTableData: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container rowSpacing={2} mt={4}>
        <Grid item xs={12} sm={12} md={12} mb={12}>
          <TableContainer>
            <Table>
              <TableBody>
                <NoobRow>
                  <NoobCell>
                    <Typography color="#6932F9">Rank</Typography>
                  </NoobCell>
                  <HeadCell>
                    <Typography align="left" color="#6932F9">Teams</Typography>
                  </HeadCell>
                   <HeadCell> <Typography color="#6932F9">Next fixture</Typography>
                  </HeadCell>
                  <HeadCell>
                    <Typography color="#6932F9">Points</Typography>
                  </HeadCell>
                  <HeadCell>
                    <Typography color="#6932F9">Wins</Typography>
                  </HeadCell>
                  <HeadCell sx={{ borderRight: 1, borderColor: '#ffffff1a', borderRadius: 1 }}>
                    <Typography color="#6932F9">Losses</Typography></HeadCell>
                </NoobRow>
                {data.map((item) => {
                  return (
                    <NoobRow sx={{ display: { sm: "flex", xs: "flex", md: "table-row" }, flexDirection: { sm: "column", xs: "column" } }} key={item.rank}>
                      <NoobCell>
                        <Typography>{item.rank}<sup>{item.subtext}</sup></Typography>
                        
                      </NoobCell>
                      <NoobCell>
                        <Box alignItems="center" display="center">
                          <img src={item.teams[0]} width={"65px"} height={"65px"} />
                          <Typography marginLeft={2} marginRight={2}>{item.teams[1]}</Typography>
                          {item.top ? <img src={item.teams[2]} /> : <></>}
                        </Box>
                      </NoobCell>
                      <NoobCell>
                        <Box alignItems="center" justifyContent="center" display="center">
                          <img src={item.nextfixture[0]} width={"65px"} height={"65px"} />
                          <Typography marginLeft={2}>{item.nextfixture[1]}</Typography>
                        </Box>
                      </NoobCell>
                      <NoobCell>
                        <Typography>{item.points}</Typography>
                      </NoobCell>
                      <NoobCell>
                        <Typography>{item.wins}</Typography>
                      </NoobCell>
                      <NoobCell>
                        <Typography>{item.losses}</Typography>
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

export default LeagueTableData;
