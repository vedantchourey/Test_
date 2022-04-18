import React from "react";
import NoobTable, { NoobColumnConf } from "../table";
import { Box, Button, Chip, Typography } from "@mui/material";
import moment from "moment";
import CardLayout from "../card-layout";

// const useStyles = makeStyles(() =>
//   createStyles({
//     button: {
//       color: "rgba(229,229,229,0.5)",
//       width: "719px",
//       height: "25px",
//       background: "#21242F",
//       borderRadius: "10px",
//       marginTop: "4px",
//     },
//   }));

const tournamentObj = {
  title: "FIFA 2021",
  tournament: "Asia Esport Throphy",
  start: new Date(),
  end: new Date(),
  format: "1v1",
  assigned: "Admin",
  participant: 256,
  status: "active",
};

const TournamentDashboardTable:React.FC = () => {
  const data: any[] = [];

  for (let i = 0; i < 5; i++) {
    data.push({ ...tournamentObj, index: i + 1 });
  }

  const conf: NoobColumnConf[] = [
    {
      title: "",
      renderCell: (row):any => {
        return <Typography color="white">{row.index}</Typography>;
      },
      width: "10%",
    },
    {
      title: "Game Title",
      renderCell: (row):string => {
        return row.title;
      },
      width: "20%",
    },
    {
      title: "Tournament",
      renderCell: (row):string => {
        return row.tournament;
      },
      width: "20%",
    },
    {
      title: "Date",
      renderCell: (row): any => {
        return (
          <React.Fragment>
            <Typography>
            {moment(row.start).format("DD/MM/YYYY hh:mm a")}
          </Typography>
          <Typography>
            {moment(row.end).format("DD/MM/YYYY hh:mm a")}
          </Typography>
          </React.Fragment>
        );
      },
      width: "20%",
    },
    {
      title: "Participant",
      renderCell: (row):string=> {
        return row.participant;
      },
      width: "10%",
    },
    {
      title: "Status",
      renderCell: (row):any => {
        let color = "#28D89C";
        if(row.status === "deactive"){
          color="#D52D3E"
        }
        return <Chip label={row.status} style={{textTransform:"capitalize", background:color,padding:"0px 10px"}} />;
      },
      width: "10%",
    },
    {
      title: "Action",
      renderCell: ():any => {
        return <Chip label={"View"} style={{textTransform:"capitalize", background:"#FBAF40",padding:"0px 10px"}}/>;
      },
      width: "10%",
    },
  ];
  return (
    <React.Fragment>
      <NoobTable title={"Tournament Master"} colConf={conf} data={data} paginate={false} />
      <CardLayout styles={{padding:0,paddingBottom:"0!important"}}>
        <Box justifyContent={"center"} width="100%">
        <Button fullWidth>
          View all Tournament Masters
        </Button>
        </Box>
      </CardLayout>
    </React.Fragment>
  );
};

export default TournamentDashboardTable;
