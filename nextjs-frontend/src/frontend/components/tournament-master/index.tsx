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

const tournamentObj = {
  title: "FIFA 2021",
  tournament: "Asia Esport Throphy",
  start: new Date(),
  end: new Date(),
  format: "1v1",
  assigned: "Admin",
  participant: 256,
  status: "active",
};

const TournamentMaster:React.FC = () => {
  const data: any[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({ ...tournamentObj,index:i+1 });
  }

  const conf:NoobColumnConf[] = [{
      title:"",
      renderCell:(row):any=>{
        return <Typography color="white">{row.index}</Typography>
      },
      width:"10%"
  },{
    title:"Game Title",
    renderCell:(row):string=>{
      return row.title
    },
    width:"10%"
},{
    title:"Tournament",
    renderCell:(row):string=>{
      return row.tournament
    },
    width:"10%"
},{
    title:"Start",
    renderCell:(row):any=>{
      return moment(row.start).format("DD/MM/YYYY hh:mm a")
    },
    width:"10%"
},{
    title:"End",
    renderCell:(row):any=>{
      return moment(row.end).format("DD/MM/YYYY hh:mm a")
    },
    width:"10%"
},{
    title:"Tournament Format",
    renderCell:(row):string=>{
      return row.format;
    },
    width:"10%"
},{
    title:"Assigned Admin",
    renderCell:(row):string=>{
      return row.assigned;
    },
    width:"10%"
},{
    title:"Participant",
    renderCell:(row):string=>{
      return row.participant;
    },
    width:"10%"
},{
    title:"Status",
    renderCell:(row):any=>{
      let color = "#28D89C";
        if(row.status === "deactive"){
          color="#D52D3E"
        }
        return <Chip label={row.status} style={{textTransform:"capitalize", background:color,padding:"0px 10px"}} />;
    },
    width:"10%"
},{
    title:"Action",
    renderCell:():any=>{
      return <Chip label={"View"} style={{textTransform:"capitalize", background:"#FBAF40",padding:"0px 10px"}}/>;
    },
    width:"10%"
}]

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
          <Grid container columnSpacing={2} >
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
                      <Select displayEmpty value={""}>
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="FIFA 2021">FIFA 2021</MenuItem>
                        <MenuItem value="FIFA 2022">FIFA 2022</MenuItem>
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
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </CardLayout>
            </Grid>
            <Grid item md={12}>
                <NoobTable colConf={conf} data={data}></NoobTable>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NoobPage>
  );
};

export default TournamentMaster;
