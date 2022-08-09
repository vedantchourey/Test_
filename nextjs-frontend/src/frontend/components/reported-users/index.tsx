import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import NoobPage from "../page/noob-page";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobTable, { NoobColumnConf } from "../ui-components/table";
import axios from "axios";
import { getAuthHeader } from "../../utils/headers";
import { frontendSupabase } from "../../services/supabase-frontend-service";

const ReportedUsers: React.FC = () => {
  const [data, setData] = React.useState([]);

  const fetchUsers = async (): Promise<void> => {
    const messages: any = await frontendSupabase
      .from("profiles")
      .select("*")

      const Data: any = []
      if(messages.data?.length){
        messages.data.filter((_doc: any) => {
          if(_doc.isBlocked || new Date(_doc.suspended) > new Date()){
            Data.push(_doc)
          }
        })
      }
      setData(Data as any);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);


const blockreport = async (Id: string, isBlocked: boolean ): Promise<void> => {
  try {
    const endpoint = "/api/user/block";
    const headers = await getAuthHeader();
    axios
      .patch(`${endpoint}?user_id=${Id}&value=${isBlocked ? "false" : "true" }`, {
        headers: headers,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchUsers();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (err) {
    console.error(err);
  }
};

const suspendreport = async (Id: string, isSuspended: boolean): Promise<void> => {
  try {
    const endpoint = "/api/user/suspended";
    const headers = await getAuthHeader();
    axios
      .patch(`${endpoint}?user_id=${Id}${isSuspended ? "&unsuspend=true" : ""}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchUsers();
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
      title: "Name",
      renderCell: (row): any => {
        return row.username;
      },
      width: "40%",
    },
    {
      title: "Action",
      renderCell: (row): any => {
        return (
          <>
            <Button onClick={(): any => blockreport(row.id,row.isBlocked)}>
              {row.isBlocked? "UnBlock" : "Block"}
            </Button>
            <Button onClick={(): any => suspendreport(row.id, new Date(row.suspended) > new Date())}>
              {new Date(row.suspended) > new Date() ? "Unsuspend" : "Suspend"}
            </Button>
          </>
        );
      },
      width: "40%",
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
