import styled from "@emotion/styled";
import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableRow,
    Typography
} from "@mui/material";
import React from "react";

export const HeadCell = styled(TableCell)(() => ({
  borderTop: "1px solid #ffffff1a",
  borderBottom: "none"
}));

export const NoobCell = styled(TableCell)(() => ({
  border: "1px solid #ffffff1a",
  alignItems: "center"
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center"
}));

const data: {teamname: string; gamename: string; image: string;}[] = [
  {
    teamname: "Legend Club",
    gamename: "Game",
    image: "/icons/Rectangle.svg",
  },
  {
    teamname: "Legend Club",
    gamename: "Game",
    image: "/icons/Rectangle.svg",
  },
];

const TeamListData: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container rowSpacing={2} mt={4}>
        <Grid item xs={12} sm={12} md={12} mb={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {data.map((item) => {
                  return (
                    <NoobRow sx={{ display: { sm: "flex", xs: "flex", md: "table-row" }, flexDirection: { sm: "column", xs: "column" } }} key={item.teamname}>
                      <NoobCell>
                        <Box alignItems="center" display="center">
                          <img src={item.image} width={"65px"} height={"65px"} />
                          <Typography marginLeft={2} marginRight={2}>{item.teamname}</Typography>
                          <Typography marginLeft={2} marginRight={2}>{item.gamename}</Typography>
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

export default TeamListData;
