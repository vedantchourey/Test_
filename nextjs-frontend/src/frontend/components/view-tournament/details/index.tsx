import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";
import { createStyles, makeStyles } from "@mui/styles";
import { TournamentData } from "../../tournament";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux-store/redux-store";
import {
  getAllPlatformsSelector,
  getAllPlatformsStatusSelector,
} from "../../../redux-store/platforms/platform-selectors";
import { IPlatformResponse } from "../../../service-clients/messages/i-platform-response";
import { fetchAllPlatformsThunk } from "../../../redux-store/platforms/platform-slice";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles(() =>
  createStyles({
    description: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "12px",

      color: "rgba(255,255,255,1)",
    },
    title: {
      color: "rgba(181, 181, 181, 1)",
    },
    subTitle: {
      color: "rgba(255, 255, 255, 1)",
    },
  }));

interface DetailsProps {
  data: TournamentData;
}

const Details: React.FC<DetailsProps> = ({ data }) => {
  const classes = useStyles();
  const appDispatch = useAppDispatch();
  const platforms = useAppSelector(getAllPlatformsSelector);
  const platformsFetchStatus = useAppSelector(getAllPlatformsStatusSelector);
  const [selectedPlatform, setSelectedPlatform] =
    React.useState<IPlatformResponse | null>(null);

  React.useEffect(() => {
    if (platformsFetchStatus !== "idle") return;
    appDispatch(fetchAllPlatformsThunk());
  }, [appDispatch, platformsFetchStatus]);

  React.useEffect(() => {
    const matchingPlatform = platforms.filter(
      (x) => x.id === data.settings?.platform
    )[0];
    setSelectedPlatform(matchingPlatform || null);
  }, [platforms]);

  const contactOn = ():void=>{
    if(data.info?.contactUrl){
      window.open(data.info?.contactUrl,"_blank");
    }
  }

  const totalSlots =data?.bracketsMetadata?.playersLimit || 0;
  const currentSlot = (data?.playerList || []).length;

  return (
    <React.Fragment>
      <ViewCard title="About the tournament">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <div style={{ fontFamily: "Inter" }}>
                {ReactHtmlParser(data.basic?.about || "")}
              </div>
              {data.info?.contactOption?(
                <Box display={"flex"} alignItems="center">
                <Typography component={"span"} variant={"body2"} color={"rgba(105,50,249,1)"}>{data.info?.contactOption} :</Typography>
                <Button style={{textTransform:"lowercase"}} onClick={contactOn}>{data.info?.contactUrl || "-"}</Button>
              </Box>
              ):null}
              <Divider style={{ marginBottom: "30px", marginTop: "30px" }} />
              <Grid container rowSpacing={1} columnSpacing={5}>
                <Grid item md={3}>
                <Grid item md={12} display="flex" justifyContent={"flex-start"} mb={2}>
                  <Typography marginRight={1}>
                    Tournament Entry Status:
                  </Typography>
                  <Typography color="secondary"> Open </Typography>
                </Grid>
                  <Box marginTop={1}>
                    <LinearProgress
                      variant="determinate"
                      color={"secondary"}
                      value={(currentSlot*100) / parseInt(totalSlots.toString())}
                    />
                  </Box>
                  <Box
                    display="flex"
                    marginTop={1}
                    alignItems={"center"}
                    justifyContent="space-between"
                  >
                    <Box width={"45%"} display="flex">
                      <Typography marginRight={1}>{parseInt(totalSlots.toString())}</Typography>
                      <Typography
                        color={"#5A5A5A"}
                        fontWeight={600}
                        letterSpacing={"-0.011em"}
                        textTransform={"uppercase"}
                      >
                        Total Slots
                      </Typography>
                    </Box>
                    <Box width={"45%"} display="flex">
                      <Typography marginRight={1}>{parseInt(totalSlots.toString()) - currentSlot}</Typography>
                      <Typography
                        color={"#5A5A5A"}
                        fontWeight={600}
                        letterSpacing={"-0.011em"}
                        textTransform={"uppercase"}
                      >
                        Left Slots
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={3}>
                  <Typography className={classes.title}>
                    {" "}
                    Tournament Type
                  </Typography>
                  <Typography
                    className={classes.subTitle}
                    textTransform={"capitalize"}
                  >
                    {" "}
                    {data?.bracketsMetadata?.type
                      ? `${data?.bracketsMetadata?.type} Elimination`
                      : "-"}{" "}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.title}> Prize Pool</Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    {data?.pricingDetails?.pricePool} Credits
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.title}> Current Prize Pool</Typography>
                  <Typography className={classes.subTitle}>
                    {data?.pricingDetails?.currentPricePool} Credits
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.title}> Platform </Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    {selectedPlatform?.displayName || "-"}{" "}
                  </Typography>
                </Grid>
                
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </ViewCard>
    </React.Fragment>
  );
};

export default Details;
