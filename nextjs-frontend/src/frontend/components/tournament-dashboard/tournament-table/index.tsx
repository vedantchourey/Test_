import React from "react";
import NoobTable, { NoobColumnConf } from "../../ui-components/table";
import { Box, Button, Chip, Typography } from "@mui/material";
import moment from "moment";
import CardLayout from "../../ui-components/card-layout";
import { TournamentType } from "../../tournament-master";
import axios from "axios";
import { useRouter } from "next/router";
import { IGameResponse } from "../../../service-clients/messages/i-game-response";
import { useAppDispatch, useAppSelector } from "../../../redux-store/redux-store";
import { allGamesSelector, gamesFetchStatusSelector } from "../../../redux-store/games/game-selectors";
import { fetchAllGamesThunk } from "../../../redux-store/games/game-slice";

const TournamentDashboardTable: React.FC = () => {
  const [data, setData] = React.useState<TournamentType[]>([]);
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true)
    axios
      .get("/api/tournaments/list")
      .then((res) => {
        if(res.data.data && res.data.data.tournaments){
          setData(res.data.data.tournaments);
        }
        setLoading(false)
        
      })
      .catch((err) => {
        console.error(err);
        setData([]);
        setLoading(false);
      });
  }, []);

  const [gameMap,setGameMap] = React.useState<{[key:string]:IGameResponse}>({});
  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);
  

  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  React.useEffect(()=>{
    const map = games.reduce((obj,game)=>{
      obj[game.id] = game;
      return obj;
    },{} as {[key:string]:IGameResponse})
    setGameMap(map);
  },[games])

  const conf: NoobColumnConf<TournamentType>[] = [
    {
      title: "Game Title",
      renderCell: (row): string => {
        return gameMap[row.game]?.displayName || '-';
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
      renderCell: (row): number => {
        return (row.playerList||[]).length;
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
      renderCell: (row): JSX.Element => {
        return (
          <Chip
            label={"View"}
            onClick={():void=>{
              router.push("/tournament/update/[id]/[...slug]",`/tournament/update/${row.id}/create/setup/basic/`,{shallow:true})
            }}
            style={{
              textTransform: "capitalize",
              background: "#FBAF40",
              padding: "0px 10px",
              cursor:"pointer"
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
        loading={loading}
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
