import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {
  allGamesSelector, gamesFetchStatusSelector
} from "../../redux-store/games/game-selectors";
import {
  fetchAllGamesThunk
} from "../../redux-store/games/game-slice";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";
import { getAuthHeader } from "../../utils/headers";
import { TournamentData } from "../tournament";
import ButtonComp from './buttons';
import CardComp from './card';


const createData = (
  rank: HTMLParagraphElement,
  img: ImageData,
  name: string,
  rating: string,
) => {
  return { rank, img, name, rating };
}

const imagedata = {
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

const SliderComp: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // const settings: Settings = {
  //   dots: true,
  //   slidesToShow: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         centerMode: false,
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: true,
  //       },
  //     },
  //   ],
  // };

  const [tournamentsData, setData] = React.useState<TournamentData[]>([]);
  const setTournamentsData = async (game_id: string): Promise<void> => {
    try {
      const endpoint = "/api/tournaments/list";
      const headers = await getAuthHeader();
      axios.get(endpoint, {
        params: {
          game: game_id
        }, headers: headers
      }).then((res) => {
        setData(res.data.data.tournaments);
        // console.log(res.data.data.tournaments);
      }).catch(function (error) {
        setData([]);
        alert(error);
      });
    } catch (err) {
      alert(err);
    }
  };
  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);

  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
    // setTournamentsData(games[0].id)
  }, [appDispatch, gamesFetchStatus]);

  const responsive = {
    0: { items: 5 },
    1024: { items: 3 },
    1366: { items: 10 },
  };

  let items: JSX.Element[] = [];
  {
    games.map((data) => {
      return (
        items.push(
          <Button key={1} data-value="1"><img src={imagedata[data.code]} onClick={() => setTournamentsData(data.id)} role="presentation" /></Button>
        )
      )
    })
  }
  return (
    <>
      <Typography textAlign={"left"}>Choose Game</Typography>
      {isMobile ?
        (
          <Grid mt={5} sx={{ width: 1, maxWidth: 'sm' }}>
            <AliceCarousel items={items} autoWidth disableDotsControls mouseTracking responsive={responsive} />
          </Grid>
        ) : (
          <Grid mt={5} sx={{ width: 1, maxWidth: 'lg'}}>
            <AliceCarousel items={items} autoWidth disableDotsControls mouseTracking responsive={responsive} />
          </Grid>
        )
      }
      <ButtonComp />
      <Grid container columnSpacing={2} mt={5}>
        {tournamentsData.map((data) => {
          console.log(data)
          return (
            <CardComp tournament_name={data.name} tournament_type={data.name} platform={data.name} total_slots={50} left_slots={12} start_date={data.name} credits={data.name} participants={data.name} />
          )
        })}
      </Grid>
    </>
  )
}

export default SliderComp;