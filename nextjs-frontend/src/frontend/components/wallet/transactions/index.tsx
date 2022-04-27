import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

function createData(action: string, amount: string, date: string) {
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

const Transactions = () => {
  return (
    <React.Fragment>
      <Card >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={"34px"}
          marginBottom={"24px"}
          marginLeft={"30px"}
          marginRight="30px"
        >
          <Typography color={"white"} variant="h5">
            Transactions
          </Typography>
          <Box display={"flex"} justifyContent="flex-end">
            <Button
              style={{ marginRight: "1px", color: "rgba(255, 255, 255, 1)" }}
            >
              {" "}
              Older{" "}
            </Button>
            <Button style={{ color: "rgba(255, 255, 255, 0.2)" }}>
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
                  <TableCell>Action</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.action}>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.date}</TableCell>
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
