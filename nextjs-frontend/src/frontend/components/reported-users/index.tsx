import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import NoobPage from "../page/noob-page";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobTable, { NoobColumnConf } from "../ui-components/table";
import axios from "axios";
import { getAuthHeader } from "../../utils/headers";

const ReportedUsers: React.FC = () => {
  const [data, setData] = React.useState([]);
  const router = useRouter();

  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/report-post/reportlist", { headers: headers })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

const deletreport = async (reportId: string): Promise<void> => {
  try {
    const endpoint = "/api/report-post/reportdelete";
    const headers = await getAuthHeader();
    axios
      .get(endpoint, {
        params: { reportId: reportId },
        headers: headers,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchData();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (err) {
    console.error(err);
  }
};

  // const router = useRouter();
  const conf: NoobColumnConf<any>[] = [
    {
      title: "",
      renderCell: (row, index): JSX.Element => {
        return <Typography color="white">{index + 1}</Typography>;
      },
      width: "2%",
    },
    {
      title: "Post",
      renderCell: (row): any => {
        return row.post_id;
      },
      width: "10%",
    },
    {
      title: "Reported By",
      renderCell: (row): any => {
        return row.username;
      },
      width: "10%",
    },
    {
      title: "Date",
      renderCell: (row): any => {
        return row.created_at;
      },
      width: "10%",
    },
    {
      title: "Action",
      renderCell: (row): any => {
        return (
          <>
            <Button onClick={(): any => router.push(`/social/${row.post_id}`)}>
              Visit
            </Button>
            <Button onClick={(): any => deletreport(row.id)}>
              Delete
            </Button>
          </>
        );
      },
      width: "5%",
    },
  ];

  return (
    <NoobPage
      title={"Report"}
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
              {/* <Grid container columnSpacing={1}>
                <Grid item md={9.6}></Grid>
                <Grid item md={2.4}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={(): Promise<boolean> =>
                      router.push("/news-page-form", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Create News
                  </Button>
                </Grid>
              </Grid> */}
            </Grid>
            <Grid item md={12}>
              <NoobTable
                title={"Report"}
                colConf={conf}
                data={data}
              ></NoobTable>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NoobPage>
  );
};

export default ReportedUsers;
