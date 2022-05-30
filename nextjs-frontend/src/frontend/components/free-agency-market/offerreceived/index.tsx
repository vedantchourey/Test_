import styled from "@emotion/styled";
import {
  Box,
  Button, Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React from "react";


export const NoobCell = styled(TableCell)(() => ({
  border: "0px",
}));

export const NoobRow = styled(TableRow)(() => ({
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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

const data: { username: string; teamname: string[]; date: string; }[] = [
  {
    username: "Shaig Exp",
    teamname: ["/icons/Rectangle.svg", "Legend Club"],
    date: "12.09.2021 21:56",
  },
  {
    username: "Shaig Exp",
    teamname: ["/icons/Rectangle.svg", "Legend Club"],
    date: "12.09.2021 21:56",
  },
  {
    username: "Shaig Exp",
    teamname: ["/icons/Rectangle.svg", "Legend Club"],
    date: "12.09.2021 21:56",
  },
  {
    username: "Shaig Exp",
    teamname: ["/icons/Rectangle.svg", "Legend Club"],
    date: "12.09.2021 21:56",
  },
];

const Permissions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <React.Fragment>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12} mt={8} mb={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {!isMobile ? (
                  <NoobRow>
                    <NoobCell>
                      <Box display="flex" alignItems={"center"}>
                        <Typography marginRight={12}>Username</Typography>
                        <Typography>Team Name</Typography>
                      </Box>
                    </NoobCell>
                    <NoobCell>
                      <Box display="flex" alignItems={"center"}>
                        <Typography>Date</Typography>
                      </Box>
                    </NoobCell>
                    <NoobCell>
                      <Typography></Typography>
                    </NoobCell>
                  </NoobRow>
                ) : null}
                {data.map((item) => {
                  return (
                    <NoobRow sx={{ display: { sm: "flex", xs: "flex", md: "table-row" }, flexDirection: { sm: "column", xs: "column" } }} key={item.username}>
                      <NoobCell>
                        <Box display="flex" alignItems={"center"}>
                          <Typography marginRight={12}>{item.username}</Typography>
                          <img src={item.teamname[0]} width={"65px"} height={"65px"} />
                          <Typography marginLeft={2}>{item.teamname[1]}</Typography>
                        </Box>
                      </NoobCell>
                      <NoobCell>
                        <Box display="flex" alignItems={"center"}>
                          <Typography>{item.date}</Typography>
                        </Box>
                      </NoobCell>
                      {isMobile ? (
                        <>
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#F09633" }}
                              variant="contained" size={"small"} fullWidth={true}
                            >
                              Accept Offer
                            </NoobButton>
                          </NoobCell>
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#6932F9" }}
                              variant="contained" size={"small"} fullWidth={true}
                            >
                              Decline Offer
                            </NoobButton>
                          </NoobCell>
                        </>
                      ) :
                        (
                          <NoobCell>
                            <NoobButton
                              style={{ backgroundColor: "#F09633" }}
                              variant="contained" size={"small"}
                            >
                              View offer details
                            </NoobButton>
                          </NoobCell>
                        )
                      }
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
