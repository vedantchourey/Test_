import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import NoobPage from "../page/noob-page";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import { ReactComponent as GameIcon } from "../../../../public/icons/GameIcon.svg";
import CardLayout from "../ui-components/card-layout";
import NoobTable, { NoobColumnConf } from "../ui-components/table";
import moment from "moment";
import { TournamentData } from "../tournament";
import { BasicData } from "../setup/basic";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";
import {
  allGamesSelector,
  gamesFetchStatusSelector,
  allFormatsSelector,
  formatsFetchStatusSelector,
} from "../../redux-store/games/game-selectors";
import {
  fetchAllGamesThunk,
  fetchAllFormats,
} from "../../redux-store/games/game-slice";
import { IGameResponse } from "../../service-clients/messages/i-game-response";

export interface TournamentType
  extends Omit<TournamentData, "basic">,
    BasicData {}

const TournamentMaster: React.FC = () => {
  const [data, setData] = React.useState<TournamentType[]>([]);
  const recordsPerPage = 10;
  const [page, setPage] = React.useState<number>(1);
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [filter, setFilter] = React.useState<{
    status: string;
    game: string;
    format: string;
    assgined: string;
  }>({
    status: "",
    game: "",
    format: "",
    assgined: "",
  });

  const router = useRouter();

  const [gameMap, setGameMap] = React.useState<{
    [key: string]: IGameResponse;
  }>({});
  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);

  const formats = useAppSelector(allFormatsSelector);
  const formatsFetchStatus = useAppSelector(formatsFetchStatusSelector);

  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  React.useEffect(() => {
    if (formatsFetchStatus !== "idle") return;
    appDispatch(fetchAllFormats());
  }, [appDispatch, formatsFetchStatus]);

  React.useEffect(() => {
    const map = (games || []).reduce((obj, game) => {
      obj[game.id] = game;
      return obj;
    }, {} as { [key: string]: IGameResponse });
    setGameMap(map);
  }, [games]);

  // React.useEffect(() => {

  //   // const map = games.reduce((obj, game) => {
  //   //   obj[game.id] = game;
  //   //   return obj;
  //   // }, {} as { [key: string]: IGameResponse });
  //   // setGameMap(map);
  // }, [formats]);

  const fetchTournaments = (): void => {
    axios
      .get(`/api/tournaments/list`, {
        params: {
          page: page,
          limit: recordsPerPage,
          ...filter,
        },
      })
      .then((res) => {
        if (res.data.data && res.data.data.tournaments) {
          setData(res.data.data.tournaments);
          setTotalRecords(parseInt(res.data.data.total));
        }
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  };

  React.useEffect(() => {
    fetchTournaments();
  }, [page, filter]);

  const conf: NoobColumnConf<TournamentType>[] = [
    {
      title: "",
      renderCell: (row, index): JSX.Element => {
        return <Typography color="white">{index + 1}</Typography>;
      },
      width: "10%",
    },
    {
      title: "Game Title",
      renderCell: (row): string => {
        return row.name;
      },
      width: "10%",
    },
    {
      title: "Tournament",
      renderCell: (row): string => {
        return gameMap[row.game]?.displayName || "-";
      },
      width: "10%",
    },
    {
      title: "Start",
      renderCell: (row): any => {
        return (
          <Typography textAlign={"left"}>
            {moment(row.startDate).format("DD/MM/YYYY")}{" "}
            {moment(row.startTime, "hh:mm:ss").format("hh:mm a")}
          </Typography>
        );
      },
      width: "10%",
    },
    {
      title: "End",
      renderCell: (row): any => {
        return (
          <Typography textAlign={"left"}>
            {moment(row.startDate).format("DD/MM/YYYY")}{" "}
            {moment(row.startTime, "hh:mm:ss").format("hh:mm a")}
          </Typography>
        );
      },
      width: "10%",
    },
    {
      title: "Tournament Format",
      renderCell: (row): string => {
        return row.settings?.tournamentFormat || "-";
      },
      width: "10%",
    },
    {
      title: "Assigned Admin",
      renderCell: (): string => {
        return "Admin";
      },
      width: "10%",
    },
    {
      title: "Participant",
      renderCell: (row): number => {
        return (row.playerList || []).length;
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
      width: "10%",
    },
    {
      title: "Action",
      renderCell: (row): JSX.Element => {
        return (
          <Chip
            label={"View"}
            onClick={(): void => {
              router.push(
                "/tournament/update/[id]/[...slug]",
                `/tournament/update/${row.id}/create/setup/basic/`,
                { shallow: true }
              );
            }}
            style={{
              textTransform: "capitalize",
              background: "#FBAF40",
              padding: "0px 10px",
              cursor: "pointer",
            }}
          />
        );
      },
      width: "10%",
    },
  ];

  const onFilterChangeHandler = (propKey: string, value: string): void => {
    setFilter({ ...filter, [propKey]: value });
  };

  const onSearch = (): void => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchTournaments();
    }
  };

  return (
    <NoobPage
      title=" "
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item md={3} lg={2}>
          <DashboardSideBar />
        </Grid>
        <Grid item md={9} lg={10} paddingRight={2}>
          <Grid container columnSpacing={2}>
            <Grid item md={12}>
              <CardLayout>
                <Box
                  display={"flex"}
                  justifyContent="flex-start"
                  alignItems={"center"}
                >
                  <GameIcon />
                  <Typography
                    marginLeft={1}
                    textAlign={"left"}
                    color={"#E5E5E5"}
                  >
                    Tournament Master
                  </Typography>{" "}
                </Box>
              </CardLayout>
            </Grid>
            <Grid item md={12}>
              <CardLayout>
                <Grid container columnSpacing={1}>
                  <Grid item md={2.4}>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={filter.game}
                        onChange={(e): void =>
                          onFilterChangeHandler("game", e.target.value)
                        }
                      >
                        <MenuItem value="">Select Game</MenuItem>
                        {games &&
                          games.map((game, i: number) => {
                            return (
                              <MenuItem value={game.id} key={i}>
                                {game.displayName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2.4}>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={filter.status}
                        onChange={(e): void =>
                          onFilterChangeHandler("status", e.target.value)
                        }
                      >
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="PUBLISHED">Published</MenuItem>
                        <MenuItem value="DRAFT">Draft</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2.4}>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={filter.format}
                        onChange={(e): void =>
                          onFilterChangeHandler("format", e.target.value)
                        }
                      >
                        <MenuItem value="">Select Tournament Format</MenuItem>
                        {(formats || []).map((format, i) => {
                          return (
                            <MenuItem value={format} key={i}>
                              {format}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2.4}>
                    <FormControl fullWidth>
                      <Select value={"ADMIN"}>
                        <MenuItem value="">Select Assigned Admin</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2.4}>
                    <Button
                      fullWidth
                      sx={{ height: 56 }}
                      size="large"
                      variant="contained"
                      onClick={onSearch}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </CardLayout>
            </Grid>
            <Grid item md={12}>
              <NoobTable
                colConf={conf}
                data={data}
                totalRecords={totalRecords}
                paginate={{
                  currentPage: page,
                  onPageChange: setPage,
                  recordsPerPage,
                }}
              ></NoobTable>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NoobPage>
  );
};

export default TournamentMaster;
