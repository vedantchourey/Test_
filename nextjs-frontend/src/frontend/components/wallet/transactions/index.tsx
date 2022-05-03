import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

function createData(action: string, amount: string, date: string):{action: string, amount: string, date: string} {
  return { action, amount, date };
}

const dateFormate = "DD.MM.YYYY";

const rows = [
  createData(
    "Withdraw fee",
    "-$56.99",
    moment("1/4/2021", "D/M/YYYY").format(dateFormate)
  ),
  createData(
    "Tournament earn",
    "+$56.99",
    moment("5/3/2022", "D/M/YYYY").format(dateFormate)
  ),
  createData(
    "Entry fee",
    "-$56.99",
    moment("8/3/2022", "D/M/YYYY").format(dateFormate)
  ),
  createData(
    "Withdraw fee",
    "-$25",
    moment("12/3/2022", "D/M/YYYY").format(dateFormate)
  ),
  createData(
    "Tournament earn",
    "+$55",
    moment("5/3/2022", "D/M/YYYY").format(dateFormate)
  ),
  createData(
    "Entry fee",
    "-$10",
    moment("5/3/2022", "D/M/YYYY").format(dateFormate)
  ),
];

const Transactions:React.FC = () => {
  return (
    <React.Fragment>
      <Card >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          margin={2}
        >
          <Typography color={"white"} variant="h5">
            Transactions
          </Typography>
          <Box display={"flex"} justifyContent="flex-end">
            <Button
            fullWidth
              style={{color: "rgba(255, 255, 255, 1)" }}
            >
              {" "}
              Older{" "}
            </Button>
            <Button style={{ color: "rgba(255, 255, 255, 0.2)" }} fullWidth>
              {" "}
              Previous{" "}
            </Button>
          </Box>
        </Box>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#201146" }}>
                  <TableCell width={"33%"}>Action</TableCell>
                  <TableCell width={"33%"}>Amount</TableCell>
                  <TableCell width={"33%"}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.action}>
                    <TableCell width={"33%"}>{row.action}</TableCell>
                    <TableCell width={"33%"}>{row.amount}</TableCell>
                    <TableCell width={"33%"}>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </React.Fragment>
  );
};

export default Transactions;
