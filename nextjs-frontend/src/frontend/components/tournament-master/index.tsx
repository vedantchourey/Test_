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

export interface TournamentType
  extends Omit<TournamentData, "basic">,
    BasicData {}

const TournamentMaster: React.FC = () => {
  const [data, setData] = React.useState<TournamentType[]>([]);
  const recordsPerPage = 10;
  const [page, setPage] = React.useState<number>(1);
  const [filter, setFilter] = React.useState<{ status: string }>({
    status: "",
  });

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
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  };

  React.useEffect(() => {
    fetchTournaments();
  }, [page]);

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
        return row.game;
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
      width: "10%",
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
                      <Select displayEmpty value={""}>
                        <MenuItem value="">Select Game</MenuItem>
                        <MenuItem value="FIFA 2021">FIFA 2021</MenuItem>
                        <MenuItem value="FIFA 2022">FIFA 2022</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2.4}>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={filter.status}
                        onChange={(e):void =>
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
                      <Select displayEmpty value={""}>
                        <MenuItem value="">Select Tournament Format</MenuItem>
                        <MenuItem value="FIFA 2021">FIFA 2021</MenuItem>
                        <MenuItem value="FIFA 2022">FIFA 2022</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2.4}>
                    <FormControl fullWidth>
                      <Select displayEmpty value={""}>
                        <MenuItem value="">Select Assigned Admin</MenuItem>
                        <MenuItem value="FIFA 2021">FIFA 2021</MenuItem>
                        <MenuItem value="FIFA 2022">FIFA 2022</MenuItem>
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
