import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import NoobPage from "../page/noob-page";
import DashboardCard from "../ui-components/dashboard-card";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TournamentDashboardTable from "./tournament-table";

const TournamentDashboard: React.FC = () => {
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
        <Grid item md={6} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item md={8}>
              <DashboardCard
                leftChild={
                  <Box
                    display="flex"
                    justifyContent={"flex-start"}
                    flexDirection="column"
                  >
                    <Box marginY={0.5} display={"flex"} alignItems={"center"}>
                      <Typography marginRight={1} textAlign={"left"}>
                        Welcome
                      </Typography>
                      <CelebrationIcon />
                    </Box>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      marginY={1}
                      textAlign={"left"}
                    >
                      Sahan Doe
                    </Typography>
                    <Box marginY={0.5} display={"flex"} alignItems={"center"}>
                      <Image
                        src="/icons/location.svg"
                        height={15}
                        width={15}
                      ></Image>
                      <Typography marginLeft={1} textAlign={"left"}>
                        220 N Crescent Wayy, Anaheim, California
                      </Typography>
                    </Box>
                    <Box marginY={0.5}>
                      <Button
                        style={{ borderRadius: "90px", padding: "3px 20px" }}
                        variant="contained"
                        size="small"
                      >
                        View Profile
                      </Button>
                    </Box>
                  </Box>
                }
                rightChild={
                  <Box
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    height={"100%"}
                  >
                    <Avatar sx={{ width: 75, height: 75 }} />
                  </Box>
                }
              />
            </Grid>
            <Grid item md={4}>
              <DashboardCard
                leftChild={
                  <Box
                    display="flex"
                    justifyContent={"flex-start"}
                    flexDirection="column"
                  >
                    <Typography marginY={0.5} variant={"h4"} textAlign={"left"}>
                      27
                    </Typography>
                    <Typography marginTop={0.5} textAlign={"left"}>
                      Upcoming
                    </Typography>
                    <Typography marginBottom={1} textAlign={"left"}>
                      Event
                    </Typography>
                    <Box marginY={0.5}>
                      <Button
                        style={{ borderRadius: "90px", padding: "3px 20px" }}
                        variant="contained"
                        size="small"
                      >
                        View All
                      </Button>
                    </Box>
                  </Box>
                }
                rightChild={
                  <Box
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    height={"100%"}
                  >
                    <Avatar sx={{ width: 60, height: 60 }} />
                  </Box>
                }
              />
            </Grid>
          </Grid>
          <Grid item md={12} lg={12}>
            <TournamentDashboardTable />
          </Grid>
          <Grid item md={12}>
            <Grid container columnSpacing={2}>
              <Grid item md={4}>
                <DashboardCard
                  rightChild={
                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      flexDirection="column"
                      marginLeft={2}
                    >
                      <Typography
                        marginY={0.5}
                        variant={"h4"}
                        textAlign={"left"}
                      >
                        15
                      </Typography>
                      <Typography marginY={0.5} textAlign={"left"}>
                        Disputed Matches
                      </Typography>
                      <Box marginY={0.5}>
                        <Button
                          style={{
                            borderRadius: "90px",
                            padding: "3px 20px",
                            background: "rgba(229, 229, 229, 0.5)",
                          }}
                          variant="contained"
                          size="small"
                        >
                          View All
                        </Button>
                      </Box>
                    </Box>
                  }
                  leftChild={
                    <Box
                      display="flex"
                      justifyContent={"center"}
                      alignItems="center"
                      height={"100%"}
                    >
                      <Avatar sx={{ width: 60, height: 60 }} />
                    </Box>
                  }
                  isReverse
                />
              </Grid>
              <Grid item md={4}>
                <DashboardCard
                  rightChild={
                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      flexDirection="column"
                      marginLeft={2}
                    >
                      <Typography
                        marginY={0.5}
                        variant={"h4"}
                        textAlign={"left"}
                      >
                        27
                      </Typography>
                      <Typography marginY={0.5} textAlign={"left"}>
                        Reported Users
                      </Typography>
                      <Box marginY={0.5}>
                        <Button
                          style={{
                            borderRadius: "90px",
                            padding: "3px 20px",
                            background: "rgba(229, 229, 229, 0.5)",
                          }}
                          variant="contained"
                          size="small"
                        >
                          View All
                        </Button>
                      </Box>
                    </Box>
                  }
                  leftChild={
                    <Box
                      display="flex"
                      justifyContent={"center"}
                      alignItems="center"
                      height={"100%"}
                    >
                      <Avatar sx={{ width: 60, height: 60 }} />
                    </Box>
                  }
                  isReverse
                />
              </Grid>
              <Grid item md={4}>
                <DashboardCard
                  rightChild={
                    <Box
                      display="flex"
                      justifyContent={"flex-start"}
                      flexDirection="column"
                      marginLeft={2}
                    >
                      <Typography
                        marginY={0.5}
                        variant={"h4"}
                        textAlign={"left"}
                      >
                        $200
                      </Typography>
                      <Typography marginY={0.5} textAlign={"left"}>
                        Refund Requested
                      </Typography>
                      <Box marginY={0.5}>
                        <Button
                          style={{
                            borderRadius: "90px",
                            padding: "3px 20px",
                            background: "rgba(229, 229, 229, 0.5)",
                          }}
                          variant="contained"
                          size="small"
                        >
                          View All
                        </Button>
                      </Box>
                    </Box>
                  }
                  leftChild={
                    <Box
                      display="flex"
                      justifyContent={"center"}
                      alignItems="center"
                      height={"100%"}
                    >
                      <Avatar sx={{ width: 60, height: 60 }} />
                    </Box>
                  }
                  isReverse
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NoobPage>
  );
};

export default TournamentDashboard;
