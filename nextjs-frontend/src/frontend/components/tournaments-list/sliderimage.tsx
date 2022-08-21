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
  FIFA_22: "/images/game1.svg",
  CSG_O2: "/images/game2.svg",
  CALL_OF_DUTY: "/images/game3.svg",
  PUBG: "/images/game4.svg",
  F1_2021: "/images/game5.svg",
  VALORANT: "/images/game6.svg",
  OVERWATCH: "/images/game7.svg",
  DOTA_2: "/images/game8.svg",
  MORTAL_KOMBAT_X: "/images/game9.svg",
  FORTNITE: "/images/game10.svg",
  APEX_LEGENDS: "/images/game11.svg",
  ROCKET_LEAGUE: "/images/game12.svg",
  lolp: "/images/game1.svg",
  corp: "/images/game2.svg",
};

const allstatus = ["complete", "ongoing", "pending"];
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
            status,
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
        mt={5}
        sx={{ maxWidth: isDesktop ? "1400px" : "300px" }}
        display={"flex"}
        flexWrap={"nowrap"}
        overflow={"scroll"}
        className="hide-scrollbar"
      >
        {games.map((data) => (
            <img
              key={1}
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
                  credits={data.settings?.entryFeeAmount || 0}
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
