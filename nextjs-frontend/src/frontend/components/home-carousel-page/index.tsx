import { Button, Grid, Typography } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useRouter } from "next/router";
import React from "react";
import NoobPage from "../page/noob-page";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobTable, { NoobColumnConf } from "../ui-components/table";
import axios from "axios";
import { getAuthHeader } from "../../utils/headers";

const HomeCarouselPage: React.FC = () => {
  const [data, setData] = React.useState([]);

  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/news/newslist", { headers: headers })
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

const deletnews = async (newsId: string): Promise<void> => {
  try {
    const endpoint = "/api/news/deleteNews";
    const headers = await getAuthHeader();
    axios
      .get(endpoint, {
        params: { newsId: newsId },
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

  const router = useRouter();
  const conf: NoobColumnConf<any>[] = [
    {
      title: "",
      renderCell: (row, index): JSX.Element => {
        return <Typography color="white">{index + 1}</Typography>;
      },
      width: "10%",
    },
    {
      title: "Name",
      renderCell: (row): any => {
        return row.title;
      },
      width: "10%",
    },
    {
      title: "Subtitle",
      renderCell: (row): any => {
        return row.author;
      },
      width: "10%",
    },
    {
      title: "Navigation",
      renderCell: (row): any => {
        return row.created_at;
      },
      width: "10%",
    },
    {
      title: "Action",
      renderCell: (row): any => {
        return <DeleteOutlinedIcon onClick={(): any => deletnews(row.id)}/>;
      },
      width: "5%",
    },
  ];

  return (
    <NoobPage
      title={"News Page"}
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
              <Grid container columnSpacing={1}>
                <Grid item md={9.6}></Grid>
                <Grid item md={2.4}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={(): Promise<boolean> =>
                      router.push("/home-carousel-page-form", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <NoobTable
                title={"Home Carousel Page"}
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

export default HomeCarouselPage;
