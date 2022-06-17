import {
  Button, Grid, Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import NoobPage from "../page/noob-page";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobTable, { NoobColumnConf } from "../ui-components/table";
  
  const NewsPage: React.FC = () => { 
  const data: { title: string; subtitle: string; date: string;}[] = [
    {
      title: "test",
      subtitle: "tester",
      date: "15/06/2022 07:35 am",
    },
  ] 
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
        title: "Title",
        renderCell: (row): any => {
          return (row.title);
        },
        width: "10%",
      },
      {
        title: "Author Name",
        renderCell: (row): any => {
          return (row.subtitle);
        },
        width: "10%",
      },
      {
        title: "Date",
        renderCell: (row): any => {
          return (row.date);
        },
        width: "10%",
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
                            router.push("/news-page-form", undefined, { shallow: true })
                          }
                      >
                        Create News
                      </Button>
                    </Grid>
                  </Grid>
              </Grid>
              <Grid item md={12}>
                <NoobTable
                  title={"News Page"}
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
  
  export default NewsPage;
  