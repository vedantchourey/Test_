import React from "react";
import { ReactComponent as DashHomeIcon } from "../../../../../public/icons/DashHomeIcon.svg";
import { ReactComponent as GameIcon } from "../../../../../public/icons/GameIcon.svg";
import { ReactComponent as PersonIcon } from "../../../../../public/icons/PersonIcon.svg";
import { ReactComponent as LogIcon } from "../../../../../public/icons/LogIcon.svg";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      background: "#21242F",
      borderRadius: "15px",
      padding: 0,
      margin: 0,
      "& .MuiCardContent-root": {
        padding: 0,
        margin: 0,
      },
    },
    avatar: {
      height: "20px",
      width: "20px",
    },
    button: {
      height: "33px",
      color: "#E5E5E5",
      background: "#7265F1",
      borderRadius: "15px",
      display: "flex",
      justifyContent: "flex-start",
      padding: 20,
    },
    altButton: {
      height: "33px",
      color: "white",
      display: "flex",
      justifyContent: "flex-start",
      padding: 20,
    },
  }));

const DashboardSideBar: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <React.Fragment>
      <Grid container rowSpacing={2} direction={"column"}>
        <Grid item marginX={2}>
          <Button
            variant="contained"
            component={"a"}
            fullWidth
            classes={{ root: classes.button }}
            startIcon={<DashHomeIcon />}
            onClick={(): Promise<boolean> =>
              router.push("/tournament-dashboard", undefined, { shallow: true })
            }
          >
            Dashboard
          </Button>
        </Grid>
        <Grid item marginX={2}>
          <Button
            variant="contained"
            component={"a"}
            fullWidth
            onClick={(): Promise<boolean> =>
              router.push("/tournament-master", undefined, { shallow: true })
            }
            classes={{ root: classes.button }}
            startIcon={<GameIcon />}
          >
            Tournaments
          </Button>
        </Grid>
        <Grid item marginX={2}>
          <Card className={classes.card}>
            <CardContent>
              <Button
                component={"a"}
                fullWidth
                classes={{ root: classes.altButton }}
                startIcon={<DashHomeIcon />}
                onClick={(): Promise<boolean> =>
                  router.push("/tournament/new/create/setup/basic", undefined, {
                    shallow: true,
                  })
                }
              >
                Create New
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item marginX={2}>
          <Card className={classes.card}>
            <CardContent>
              <Button
                component={"a"}
                fullWidth
                classes={{ root: classes.altButton }}
                startIcon={<Avatar className={classes.avatar} />}
              >
                Asia Cup
              </Button>
              <Button
                component={"a"}
                fullWidth
                classes={{ root: classes.altButton }}
                startIcon={<Avatar className={classes.avatar} />}
              >
                Europian Cup
              </Button>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item marginX={2}>
          <Button
            variant="contained"
            component={"a"}
            fullWidth
            classes={{ root: classes.button }}
            startIcon={<PersonIcon />}
          >
            Reported Users
          </Button>
        </Grid>
        <Grid item marginX={2}>
          <Button
            variant="contained"
            component={"a"}
            fullWidth
            classes={{ root: classes.button }}
            startIcon={<LogIcon />}
          >
            Refunds log
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardSideBar;
