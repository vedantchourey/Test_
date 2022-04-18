import React from "react";
import NoobTable, { NoobColumnConf } from "../../ui-components/table";
import { Box, Button, Chip, Typography } from "@mui/material";
import moment from "moment";
import CardLayout from "../../ui-components/card-layout";
import { TournamentType } from "../../tournament-master";
import axios from "axios";
import { useRouter } from "next/router";

const TournamentDashboardTable: React.FC = () => {
  const [data, setData] = React.useState<TournamentType[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    axios
      .get("/api/tournaments/list")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  }, []);

  const conf: NoobColumnConf<TournamentType>[] = [
    {
      title: "Game Title",
      renderCell: (row): string => {
        return row.game;
      },
      width: "20%",
    },
    {
      title: "Tournament",
      renderCell: (row): string => {
        return row.name;
      },
      width: "20%",
    },
    {
      title: "Date",
      renderCell: (row): JSX.Element => {
        return (
          <React.Fragment>
            <Typography textAlign={"left"}>
              {moment(row.startDate).format("DD/MM/YYYY")}{" "}
              {moment(row.startTime, "hh:mm:ss").format("hh:mm a")}
            </Typography>
            {/* <Typography>
            {moment(row.startTime).format("DD/MM/YYYY hh:mm a")}
          </Typography> */}
          </React.Fragment>
        );
      },
      width: "20%",
    },
    {
      title: "Participant",
      renderCell: (): string => {
        return "150";
      },
      width: "10%",
    },
    {
      title: "Status",
      renderCell: (row): any => {
        let color = "#28D89C";
        if (row.status === "DRAFTED") {
          color = "#D52D3E";
        }
        return (
          <Chip
            label={row.status}
            style={{
              textTransform: "capitalize",
              background: color,
              padding: "0px 10px",
            }}
          />
        );
      },
      width: "15%",
    },
    {
      title: "Action",
      renderCell: (): any => {
        return (
          <Chip
            label={"View"}
            style={{
              textTransform: "capitalize",
              background: "#FBAF40",
              padding: "0px 10px",
            }}
          />
        );
      },
      width: "15%",
    },
  ];
  const viewAllHandler = ():void =>{
    router.push("/tournament-master",undefined,{shallow:true})
  }
  return (
    <React.Fragment>
      <NoobTable
        title={"Tournament Master"}
        colConf={conf}
        data={data}
      />
      <CardLayout styles={{ padding: 0, paddingBottom: "0!important" }}>
        <Box justifyContent={"center"} width="100%">
          <Button fullWidth onClick={viewAllHandler}>View all Tournament Masters</Button>
        </Box>
      </CardLayout>
    </React.Fragment>
  );
};

export default TournamentDashboardTable;
