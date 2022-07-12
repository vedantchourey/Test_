import { Box, Chip, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { ReactComponent as GameIcon } from "../../../../public/icons/GameIcon.svg";
import NoobPage from "../page/noob-page";
import CardLayout from "../ui-components/card-layout";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobTable, { NoobColumnConf } from "../ui-components/table";

const SupportList: React.FC = () => {
  const [data, setData] = React.useState([]);
  const recordsPerPage = 10;
  const [page, setPage] = React.useState<number>(1);
  const [totalRecords, setTotalRecords] = React.useState<number>(0);

  const fetchTournaments = (): void => {
    axios
      .get(`/api/support/supportlist`, {
        params: {
          page: page,
          limit: recordsPerPage,
        },
      })
      .then((res) => {
        if (res.data.list) {
          setData(res.data.list);
          setTotalRecords(parseInt(res.data.count));
        }
      })
      .catch((err) => {
        console.error(err);
        setData([]);
      });
  };

  React.useEffect(() => {
    fetchTournaments();
  }, [page]);

  async function onClickResolveTicket(
    id: string,
    status: string
  ): Promise<void> {
    try {
      const endpoint = "/api/support/editsupport";
      axios
        .post(endpoint, {
          id,
          status,
        })
        .then((res) => {
          if (res.status === 200) {
            fetchTournaments()
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  const conf: NoobColumnConf<any>[] = [
    {
      title: "",
      renderCell: (row, index): JSX.Element => {
        return <Typography color="white">{index + 1}</Typography>;
      },
      width: "10%",
    },
    {
      title: "Ticket ID",
      renderCell: (row): string => {
        return row.id;
      },
      width: "10%",
    },
    {
      title: "Title",
      renderCell: (row): any => {
        return row.subject;
      },
      width: "10%",
    },
    {
      title: "Type",
      renderCell: (row): any => {
        return row.type;
      },
      width: "10%",
    },
    {
      title: "Message",
      renderCell: (row): string => {
        return row.message;
      },
      width: "10%",
    },
    {
      title: "User Name",
      renderCell: (): string => {
        return "Admin";
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
            label={"Resolve"}
            onClick={(): void => {
              onClickResolveTicket(row.id, row.status);
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
                    Support Tickets
                  </Typography>{" "}
                </Box>
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

export default SupportList;
