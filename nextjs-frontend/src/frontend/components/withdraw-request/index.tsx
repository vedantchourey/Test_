import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import NoobPage from "../page/noob-page";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobTable, { NoobColumnConf } from "../ui-components/table";
import axios from "axios";
import { getAuthHeader } from "../../utils/headers";
import moment from "moment";

const WithdrawRequest: React.FC = () => {
  const [data, setData] = React.useState([]);
  
  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/withdraw", { headers: headers })
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const resolve = async (id: string): Promise<void> => {
    try {
      const endpoint = "/api/withdraw";
      const headers = await getAuthHeader();
      axios
        .patch(endpoint, { id: id }, { headers: headers })
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
        return (
          <div>
            <Typography>{`${row.firstName} ${row.lastName}`}</Typography>
            <Typography fontSize={12} color={"rgba(255,255,255,0.5)"}>
              Account Number: {row.kycDetails.account_no}
            </Typography>
            <Typography fontSize={12} color={"rgba(255,255,255,0.5)"}>
              IFSC: {row.kycDetails.ifsc}
            </Typography>
            <Typography fontSize={12} color={"rgba(255,255,255,0.5)"}>
              Account Name: {row.kycDetails.name}
            </Typography>
          </div>
        );
      },
      width: "30%",
    },
    {
      title: "Amount",
      renderCell: (row): any => {
        return `${row.withdrawAmount} INR`;
      },
      width: "10%",
    },
    {
      title: "Status",
      renderCell: (row): any => {
        return row.status;
      },
      width: "30%",
    },
    {
      title: "Date",
      renderCell: (row): any => {
        return moment(row.created_at).format("DD / MM / YYYY");
      },
      width: "20%",
    },
    {
      title: "Action",
      renderCell: (row): any => {
        return <Button onClick={(): any => resolve(row.id)}>Resolve</Button>;
      },
      width: "10%",
    },
  ];

  return (
    <NoobPage
      title={"Withdraw Request"}
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item md={3}>
          <DashboardSideBar />
        </Grid>
        <Grid item md={9} paddingRight={2}>
          <Grid container columnSpacing={2}>
            <Grid item md={12}>
              <NoobTable
                title={"Withdraw Request"}
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

export default WithdrawRequest;
