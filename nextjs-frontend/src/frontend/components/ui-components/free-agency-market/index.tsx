import styled from "@emotion/styled";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Modal,
  Card,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
// import { ReactComponent as UnplashIcon } from "../../../../../public/icons/Unplashicon.svg";
import CloseIcon from "@mui/icons-material/Close";
import Member from "../../team/members/member";
import GameDropDown from "../../drop-downs/game-drop-down";
import PlatformDropDown from "../../drop-downs/platform-drop-down";
import axios from "axios";
import { getAuthHeader } from "../../../utils/headers";
import { useAppSelector } from "../../../../../src/frontend/redux-store/redux-store";
import { isDeviceTypeSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../../../../src/frontend/redux-store/layout/device-types';
import { useRouter } from "next/router";
import { avatarListWithUrl } from "../../../utils/config/default-avatars";

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
  "&.delete": {
    background: "rgba(255, 0, 0, 0.2)",
  },
  "&.leave": {
    background: "rgba(196, 213, 2, 0.2)",
  },
}));

const CardDesktop: React.FC<any> = ({ setOpen }) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid
        item
        mt={11}
        md={4}
        lg={9}
        display={"flex"}
        flexDirection={"column"}
      >
        {/* <Typography color={"white"} textAlign="left" component="h4">
          {" "}
          Free Agency Market{" "}
        </Typography>
        <Typography mt={2} color={"white"} textAlign="left" variant="caption">
          <Box>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem
          </Box>
          <Box> Ipsum has been the industry&apos;s standard dummy </Box>
          <Box> text ever since the 1500s</Box>
        </Typography> */}
      </Grid>
      <Grid
        item
        md={4}
        lg={2}
        alignContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div style={{height: 140}}>

        </div>
        {/* <UnplashIcon width={230} /> */}
        <Button
          style={{
            background: "green",
            // color: "white",
            padding: "10px 10px",
            marginTop: 20,
            width: "230px",
          }}
          variant={"contained"}
          onClick={(): void => {
            setOpen(true);
          }}
        >
          Enter Free Agency
        </Button>
      </Grid>
    </Grid>
  );
};

const CardMobile: React.FC<any> = ({ setOpen }) => {
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  return (
    <Grid container style={{ display: "flex", flexDirection: "column" }}>
      <Grid item xs={12} display={"flex"}>
        <img src="/images/FAB_BG.png" style={{ width: "100%", height: 70, marginTop: 20 }} />
        {/* <Box>
          <Typography color={"white"} textAlign="left" component="h4">
            {" "}
            Free Agency Market{" "}
          </Typography>
          <br />
          <Typography color={"white"} textAlign="left" variant="caption">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem
            <br />
            Ipsum has been the industry&apos;s standard dummy <br />
            text ever since the 1500s
          </Typography>
        </Box> */}
      </Grid>
      <Grid
        item
        md={4}
        mt={2}
        lg={2}
        alignContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* <UnplashIcon width={230} /> */}
        <Button
          style={{
            background: "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
            color: "white",
            padding: "10px 10px",
            marginTop: 20,
            width: !isDesktop ? "100%" : "230px",
          }}
          onClick={(): void => {
            setOpen(true);
          }}
        >
          Enter Free Agency
        </Button>
      </Grid>
    </Grid>
  );
};

const FreeAgencyMarketCard: React.FC = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [selectGame, setSelectGame] = useState("");
  const [platform, setPlatform] = useState("");
  const [loader, setLoader] = useState(false);

  const onSubmit = async (): Promise<void> => {
    setLoader(true);
    const data = {
      game_id: selectGame,
      platform_id: platform,
    };
    const headers = await getAuthHeader();
    axios
      .post("/api/free-agency-market", data, { headers: headers })
      .then((res) => {
        if (res.status === 200) setOpen(false);
      })
      .catch(() => alert("You are already have team with same game and platform"))
      .finally(() => setLoader(false));
  };

  return (
    <Box sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      <Box
        marginBottom={2}
        sx={{ padding: { sm: "10px", xs: "10px", md: "20px" } }}
        style={
          !isMobile
            ? {
                backgroundImage: "url('/images/FAB_BG.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }
            : {}
        }
      >
        {!isMobile ? (
          <CardDesktop setOpen={setOpen} />
        ) : (
          <CardMobile setOpen={setOpen} />
        )}
      </Box>
      {children}
      <Modal
        open={open}
        onClose={(): void => {
          setOpen(false);
        }}
        style={{ height: "100%", overflow: "scroll" }}
      >
        <Grid
          container
          alignContent={"center"}
          justifyContent={"center"}
          marginTop={isMobile ? 5 : 10}
        >
          <Grid sm={11} lg={6} md={6} xs={10}>
            <Card>
              <Box
                alignItems={"flex-start"}
                p={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>
                  Join the Noobstorm Free Agency Market and get scouted by the
                  best esports teams in India.
                </Typography>
                <Button
                  onClick={(): void => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon />
                </Button>
              </Box>
              <Divider />
              <Box>
                <Box
                  alignItems={"flex-start"}
                  p={2}
                  // display={"flex"}
                  // justifyContent={"space-between"}
                  style={
                    isMobile
                      ? { flexDirection: "column" }
                      : {
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }
                  }
                >
                  <Box flex={1}>
                    <GameDropDown
                      label="Game"
                      id="game"
                      name="game"
                      placeholder="Select Game"
                      onChange={(id): void => {
                        setSelectGame(id || "");
                      }}
                      value={selectGame}
                    />
                  </Box>

                  <Box flex={1}>
                    <PlatformDropDown
                      label="Platform"
                      allowAll={true}
                      placeholder="Select Platform"
                      disabled={false}
                      onChange={(id): void => {
                        setPlatform(id || "");
                      }}
                      value={platform}
                    />
                  </Box>
                </Box>

                <Grid container spacing={2} p={2}>
                  <Grid sm={12} md={5} lg={5} p={2}>
                    <Member
                      image=""
                      profileImage={avatarListWithUrl[2].url || ""}
                      type="bronze"
                      name="Neel"
                      tags={["asd"]}
                      elo={"2000"}
                      games={"5"}
                      won={"2"}
                      username={"Noobstorm User"}
                    />
                  </Grid>
                  <Grid sm={12} md={7} lg={7} p={2}>
                    <Typography textAlign="left" variant="caption">
                      Click the Enter Free Agency Button and get listed on the
                      Free Agency Market. Select your game and platform and
                      we’ll take care of the rest. Once you get listed, let our
                      market do its magic. Teams from all across India can now
                      send you offers to join their teams. You can view the
                      Offers Received by simply clicking on the Offers Received
                      Tab once you have listed yourself on the Free Agency
                      Market. Once you receive an Invite to Join a Team you can
                      choose to either accept or decline the invitation. To
                      learn more visit{" "}
                      <Button
                        variant="text"
                        style={{ fontSize: 13, textTransform: "capitalize" }}
                        onClick={(): any => {
                          router.push("/how-it-works");
                        }}
                      >
                        How it works
                      </Button>
                    </Typography>
                    <Box mt={5}>
                      <Button
                        disabled={loader || !(selectGame && platform)}
                        onClick={(): void => {
                          onSubmit();
                        }}
                        variant="outlined"
                      >
                        Enter Free Agency Market
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
};

export default FreeAgencyMarketCard;
