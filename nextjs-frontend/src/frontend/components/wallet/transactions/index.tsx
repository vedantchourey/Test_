import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { walletDetaislSelector } from "../../../redux-store/wallet/wallet-selector";
import { useAppSelector } from "../../../redux-store/redux-store";

const Transactions = (): any => {
  const { transaction } = useAppSelector(walletDetaislSelector);
  return (
    <React.Fragment>
      <Card>
        <Box display={"flex"} justifyContent={"space-between"} margin={2}>
          <Typography color={"white"} variant="h5">
            Transactions
          </Typography>
          <Box display={"flex"} justifyContent="flex-end">
            <Button fullWidth style={{ color: "rgba(255, 255, 255, 1)" }}>
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
                {(transaction || []).map((row: any): any => (
                  <TableRow key={row.action}>
                    <TableCell width={"33%"}>{row.type}</TableCell>
                    <TableCell width={"33%"}>
                      {Number(row.credit) !== 0 ? `+${row.credit}` : `-${row.debit}`}
                    </TableCell>
                    <TableCell width={"33%"}>{row.created_at}</TableCell>
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
