import styled from "@emotion/styled";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import CardLayout from "../card-layout";

export interface NoobColumnConf<Type> {
  title: string;
  renderCell: (row: Type, index: number) => string | JSX.Element | null;
  width: string | number;
}

export interface PageProps{
  recordsPerPage:number
  currentPage:number
  onPageChange:(newPage:number)=>void
}

export interface NoobTableProp<Type> {
  colConf: NoobColumnConf<Type>[];
  data: Type[];
  totalRecords?:number;
  paginate?: PageProps;
  title?:string;
  loading?:boolean
}

const NoobTableCell = styled(TableCell)(() => ({
  borderBottom: 0,
}));

const NoobTableHead = styled(TableHead)(() => ({
  background:
    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  "& th:first-child": {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "& th:last-child": {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
}));
const NoobTableRow = styled(TableRow)(() => ({
  background:
    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  color: "white",
  "& td:first-child": {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "& td:last-child": {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
}));

const NoobTable: <Type>(props:NoobTableProp<Type>)=>JSX.Element = ({
  colConf = [],
  data = [],
  paginate,
  title,
  totalRecords = data?.length,
  loading=false
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ):void => {
    if(paginate){
      paginate.onPageChange(value);
    }
    
  };

  const renderHeader = (): JSX.Element => {
    const heads = colConf.map((conf) => {
      return <NoobTableCell key={conf.title} width={conf.width}>{conf.title}</NoobTableCell>;
    });
    return <NoobTableHead>{heads}</NoobTableHead>;
  };

  const renderRow = (): JSX.Element[] | JSX.Element => {
    if(loading){
      return <NoobTableRow><NoobTableCell colSpan={colConf.length} style={{textAlign:"center"}}>Loading..</NoobTableCell></NoobTableRow>;
    }
    const rows = data?.map((item, index) => {
      let rowIndex = index;
      if(paginate){
        rowIndex = paginate.currentPage*paginate.recordsPerPage+index;
      }
        const row = colConf.map((conf, colIndex) => {
          const key = `${conf.title}-${rowIndex}-${colIndex}`;
          return <NoobTableCell key={key}>{conf.renderCell(item, index)}</NoobTableCell>;
        });
        return <NoobTableRow key={rowIndex}>{row}</NoobTableRow>;
      });

    return rows;
  };
  const renderTitle = ():JSX.Element|null =>{
    if(title){
      return (
        <Typography variant={"h5"} color={"white"}>
          {title}
        </Typography>
      )
    }
    return null;
  }
  return (
    <React.Fragment>
      {renderTitle()}
      <TableContainer>
        <Table style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
          {renderHeader()}
          {renderRow()}
        </Table>
      </TableContainer>
      {paginate ? (
        <CardLayout>
          <Box display={"flex"} justifyContent="center">
          <Pagination
            count={Math.ceil(totalRecords / paginate.recordsPerPage)}
            page={paginate.currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
          </Box>
        </CardLayout>
      ) : null}
    </React.Fragment>
  );
};

export default NoobTable;
