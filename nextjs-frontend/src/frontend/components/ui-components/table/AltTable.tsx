import styled from "@emotion/styled";
import { TableHead, TableCell, TableRow } from "@mui/material";

export const NoobTableCell = styled(TableCell)(() => ({
  border: " 1px solid rgba(255, 255, 255, 0.1)",
}));

export const NoobTableHead = styled(TableHead)(() => ({
  background: "#201146",
}));
export const NoobTableRow = styled(TableRow)(() => ({
  color: "white",
}));
