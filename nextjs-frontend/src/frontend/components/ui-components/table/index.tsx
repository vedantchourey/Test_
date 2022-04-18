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

// const useStyles = makeStyles(() =>
//   createStyles({
//     tableContainerRoot: {
//       background: "none",
//     },
//   }));

export interface NoobColumnConf {
  title: string;
  renderCell: (row: any, index: number) => string | JSX.Element | null;
  width: string | number;
}

export interface NoobTableProp {
  colConf: NoobColumnConf[];
  data: any[];
  paginate?: boolean;
  title?:string
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

const NoobTable: React.FC<NoobTableProp> = ({
  colConf = [],
  data = [],
  paginate = true,
  title
}) => {
  const [page, setPage] = React.useState(1);
  const handlePageChange:any = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const renderHeader = (): JSX.Element => {
    const heads = colConf.map((conf) => {
      return <NoobTableCell key={conf.title} width={conf.width}>{conf.title}</NoobTableCell>;
    });
    return <NoobTableHead>{heads}</NoobTableHead>;
  };

  const renderRow = (): JSX.Element[] => {
    const rows = [...data]
      .slice((page - 1) * 10, page * 10)
      .map((item, index) => {
        const row = colConf.map((conf) => {
          return <NoobTableCell key={item.index}>{conf.renderCell(item, index)}</NoobTableCell>;
        });

        return <NoobTableRow key={item.index}>{row}</NoobTableRow>;
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
            count={data.length / 10}
            page={page}
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
