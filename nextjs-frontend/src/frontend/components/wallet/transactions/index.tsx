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
import moment from "moment";
import _ from "lodash";

const Transactions = (): any => {
  const { transaction } = useAppSelector(walletDetaislSelector);
  const [currentState, setCurrentState] = React.useState(0);

  return (
    <React.Fragment>
      <Card>
        <Box display={"flex"} justifyContent={"space-between"} margin={2}>
          <Typography color={"white"} variant="h5">
            Transactions
          </Typography>
          <Box display={"flex"} justifyContent="flex-end">
            <Button
              disabled={_.chunk(transaction, 15).length - 1 === currentState}
              onClick={(): any => setCurrentState(currentState + 1)}
            >
              Older
            </Button>
            <Button
              disabled={currentState === 0}
              onClick={(): any => setCurrentState(currentState - 1)}
            >
              Previous
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
                {(
                  _.chunk(
                    transaction
                      .filter(
                        (i: any) =>
                          i.created_at && (i.debit > 0 || i.credit > 0)
                      )
                      .sort(function (a: any, b: any) {
                        const dateA = new Date(a.created_at).getTime();
                        const dateB = new Date(b.created_at).getTime();
                        return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
                      }),
                    15
                  )[currentState] || []
                ).map((row: any): any => (
                  <TableRow key={row.action}>
                    <TableCell width={"33%"}>{row.type}</TableCell>
                    <TableCell width={"33%"}>
                      {Number(row.credit) !== 0
                        ? `+${row.credit}`
                        : `-${row.debit}`}
                    </TableCell>
                    <TableCell width={"33%"}>
                      {moment(row.created_at).format("DD/MM/YYYY hh:mm A")}
                    </TableCell>
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
