import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  allFormatsSelector,
  allGamesSelector,
  formatsFetchStatusSelector,
  gamesFetchStatusSelector,
} from "../../redux-store/games/game-selectors";
import {
  fetchAllFormats,
  fetchAllGamesThunk,
} from "../../redux-store/games/game-slice";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";
import { TournamentData } from "../tournament";
import Loader from "../ui-components/loader";
import ButtonComp from "./buttons";
import CardComp from "./card";
import styles from "./slider.module.css";
import { isDeviceTypeSelector } from "../../redux-store/layout/layout-selectors";
import { deviceTypes } from "../../redux-store/layout/device-types";

const imagedata: any = {
  FIFA_22: "/images/games/Fifa.png",
  BGMI: "/images/games/BGMI.png",
  CSG_O2: "/images/games/COUNTER STRIKE.png",
  CALL_OF_DUTY: "/images/games/CALL OF DUTY.png",
  F1_2021: "/images/games/F1 22.png",
  VALORANT: "/images/games/VALORANT.png",
  OVERWATCH: "/images/games/OVERWATCH.png",
  DOTA_2: "/images/games/DOTA.png",
  MORTAL_KOMBAT_X: "/images/games/MORTAL KOMBAT.png",
  FORTNITE: "/images/games/FORTNITE.png",
  APEX_LEGENDS: "/images/games/APEX LEGENDS.png",
  ROCKET_LEAGUE: "/images/games/ROCKET LEAGUE.png",
};

const allstatus = ["complete", "ongoing", "upcomming"];
const allcredits = ["Free", "1-5", "6-10", "11-15", "16-20", "20+"];

const SliderComp: React.FC = (): JSX.Element => {
  const formats = useAppSelector(allFormatsSelector);
  const formatsFetchStatus = useAppSelector(formatsFetchStatusSelector);
  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [credits, setCredits] = useState("");
  const [loading, setLoading] = useState(false);

  const [tournamentsData, setData] = React.useState<TournamentData[]>([]);

  const setTournamentsData = async (
    game_id: string,
    first = false
  ): Promise<void> => {
    try {
      setLoading(true);
  
      const endpoint = "/api/tournaments/list";
      axios
        .get(endpoint, {
          params: {
            game: first ? "" : game_id,
            limit: 50,
            format,
            status: "published",
            sortType: status,
            amount: credits,
          }
        })
        .then((res) => {
          setData(res.data.data.tournaments.filter((i: any) => i !== null));
          // console.log(res.data.data.tournaments);
        })
        .catch(function (error) {
          setData([]);
          alert(error);
        })
        .finally((): void => {
          setLoading(false);
        });
    } catch (err) {
      alert(err);
    }
  };
  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);

  const [selectedGame, setSelectedGame] = React.useState<string>(
    games.length > 0 ? games[0].id : ""
  );

  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  React.useEffect(() => {
    if (formatsFetchStatus !== "idle") return;
    appDispatch(fetchAllFormats());
  }, [appDispatch, formatsFetchStatus]);

  React.useEffect(() => {
    if (games?.[0]?.id) {
      setTournamentsData(games[0].id, true);
    }
  }, [games, format, status, credits]);

  return (
    <>
      <Loader loading={loading} />
      <Typography textAlign={"left"} className={styles.choose_Game}>
        Choose your Game
      </Typography>
      {/* {isMobile ? (
        <Grid mt={5} sx={{ maxWidth: "sm" }}>
          <AliceCarousel
            items={items}
            autoWidth
            disableDotsControls
            mouseTracking
            responsive={responsive}
          />
        </Grid>
      ) : (
        <Grid mt={5} sx={{ maxWidth: "lg" }}>
          <AliceCarousel
            items={items}
            autoWidth
            disableDotsControls
            mouseTracking
            responsive={responsive}
          />
        </Grid>
      )} */}
      <Box
        mt={2}
        mr={0}
        sx={{ width: isDesktop ? "80vw" : "90vw" }}
        display={"flex"}
        flexWrap={"nowrap"}
        overflow={"scroll"}
        className="hide-scrollbar"
      >
        {games.map((data) => (
            <img
              key={data.code}
              data-value="1"
              src={imagedata[data.code]}
              className={styles.image}
              onClick={(): any => {
                setTournamentsData(data.id)
                setSelectedGame(data.id);
              }}
              role="presentation"
              style={{
                borderWidth: data.id === selectedGame ? 3 : 0,
                borderColor: "#6932F9",
                borderStyle: "solid",
              }}
            />
        ))}
      </Box>

      <ButtonComp
        formats={formats}
        setFormat={setFormat}
        format={format}
        allstatus={allstatus}
        status={status}
        setStatus={setStatus}
        allcredits={allcredits}
        credits={credits}
        setCredits={setCredits}
      />
      <Grid container columnSpacing={2} mt={5}>
        {tournamentsData
          .sort((a: any, b: any) => {
            const aTime: any = moment(a.startDate).format("x");
            const bTime: any = moment(b.startDate).format("x");
            return bTime - aTime;
          })
          .map((data: any) => {
            const startDateTime =
              moment(data.startDate).format("D MMM YYYY ") +
              moment(data.startTime, "HH:mm:ss").format("LT");
            const totalSlots = data?.bracketsMetadata?.playersLimit || 0;
            const currentSlot = (data?.playerList || []).length;
            const isCompleted: boolean =
              data?.brackets?.match?.filter(
                (i: any) => !i.opponent1.result && !i.opponent2.result
              ).length === 0;

            return (
              <>
                <CardComp
                  id={data.id}
                  isCompleted={isCompleted}
                  tournament_name={data.name}
                  banner={data.banner}
                  tournament_type={data.settings?.tournamentFormat}
                  platform={data.settings?.platform}
                  total_slots={totalSlots}
                  left_slots={currentSlot}
                  start_date={startDateTime}
                  credits={
                    data?.settings?.entryType === "credit"
                      ? data.settings?.entryFeeAmount || 0
                      : 0
                  }
                  isDesktop={isDesktop}
                  participants={`${currentSlot} out of ${totalSlots}`}
                />
              </>
            );
          })}
      </Grid>
    </>
  );
};

export default SliderComp;
