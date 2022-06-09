import { Button, Grid, Typography } from '@mui/material';
import axios from "axios";
import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { getAuthHeader } from "../../../frontend/utils/headers";
import {
  allGamesSelector, gamesFetchStatusSelector
} from "../../redux-store/games/game-selectors";
import {
  fetchAllGamesThunk
} from "../../redux-store/games/game-slice";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";

const createData = (
  rank: HTMLParagraphElement,
  img: ImageData,
  name: string,
  rating: string,
) => {
  return { rank, img, name, rating };
}

export interface Gameinfo {
  id: string;
  elo_rating: string;
  game_id: string;
  user_id: string;
  created_at: string;
}

const SliderComp: React.FC = (): JSX.Element => {
  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 12 },
  };

  const [tournaments_data, setData] = React.useState<Gameinfo[]>([]);
  const geTournamentsData = async (): Promise<void> => {
    try {
      const endpoint = "/api/tournaments/list";
      const headers = await getAuthHeader();
      axios.get(endpoint, { params: {
        limit: 10
      }, headers: headers }).then((res) => {
        setData(res.data.tournaments);
        console.log(res.data);
      }).catch(function (error) {
        setData([]);
      });
    } catch (err) {
      alert(err);
    }
  };

  React.useEffect(() => {
    geTournamentsData();
  }, []);

  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);


  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  console.log(games)


  const choose_game_items = [
    <Grid item lg={1} md={1}>
      <Button className="item" key={1} data-value="1"><img src="/images/game1.svg" onClick={() => geTournamentsData()} /></Button>,
      <Button className="item" key={2} data-value="2"><img src="/images/game2.svg" onClick={() => geTournamentsData()} /></Button>,
      <Button className="item" key={3} data-value="3"><img src="/images/game3.svg" onClick={() => geTournamentsData()} /></Button>,
      <Button className="item" key={4} data-value="4"><img src="/images/game4.svg" onClick={() => geTournamentsData()} /></Button>,
      <Button className="item" key={5} data-value="5"><img src="/images/game5.svg" onClick={() => geTournamentsData()} /></Button>,
    </Grid>
  ];

  
  
  return (
    <>
      <Typography >Choose Game</Typography>
      <AliceCarousel items={choose_game_items} responsive={responsive} />
    </>
  )
}

export default SliderComp;