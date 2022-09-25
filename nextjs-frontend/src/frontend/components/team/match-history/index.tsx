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
import { useRouter } from "next/router";

const MatchHistory: React.FC<{ data: IMatchHubData[]; teamId: string }> = (
  props
) => {
  const router = useRouter();

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <TableContainer>
          <Table>
            <NoobTableHead>
              <NoobTableRow style={{ color: "#201146" }}>
                <NoobTableCell>Opponent Teams</NoobTableCell>
                <NoobTableCell>Status</NoobTableCell>
                <NoobTableCell>Tournament Name</NoobTableCell>
              </NoobTableRow>
            </NoobTableHead>
            <TableBody>
              {props.data.map((row, idx) => {
                const status =
                  row.opponent1.team_id !== props.teamId
                    ? row.opponent2.result
                      ? row.opponent2.result
                      : "Pending"
                    : row.opponent1.result
                    ? row.opponent1.result
                    : "Pending";

                const opp_team_name =
                  row.opponent1.team_id === props.teamId
                    ? row.opponent2.name
                    : row.opponent1.name;

                if (!opp_team_name) return <></>;

                const opp_team_data: any =
                  row.opponent1.team_id === props.teamId
                    ? row.opponent2
                    : row.opponent1;

                return (
                  <NoobTableRow key={idx}>
                    <NoobTableCell
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={(): any =>
                        router.push(
                          `/team/view/${opp_team_data.team_id}/members?user_id=${opp_team_data.players?.[0]?.id}`
                        )
                      }
                    >
                      <Typography>
                        {row.opponent1.team_id === props.teamId
                          ? row.opponent2.name
                          : row.opponent1.name}
                      </Typography>
                    </NoobTableCell>
                    <NoobTableCell>
                      <Typography
                        style={{
                          color:
                            status === "win"
                              ? "#19D873"
                              : status === "loss"
                              ? "#FF0000"
                              : "orange",
                        }}
                      >
                        {status ? status.toUpperCase() : "-"}
                      </Typography>
                    </NoobTableCell>
                    <NoobTableCell
                      onClick={(): void => {
                        router.push(
                          `/view-tournament/${row.tournament_id}/details`
                        );
                      }}
                    >
                      <Typography>{row.tournament_name}</Typography>
                    </NoobTableCell>
                  </NoobTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default MatchHistory;
