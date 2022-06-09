import { Button, Typography } from '@mui/material';
import React from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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

  const [leaderboardgamedata, setData] = React.useState<Gameinfo[]>([]);
  const getleaderboardgamedata = async (gameId: string): Promise<void> => {
  
  };

  React.useEffect(() => {
    getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257");
  }, []);

  const choose_game_items = [
    <Button className="item" key={1} data-value="1"><img src="" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257")} /></Button>,
    <Button className="item" key={2} data-value="2"><img src="/images/game2.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={3} data-value="3"><img src="/images/game3.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={4} data-value="4"><img src="/images/game4.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={5} data-value="5"><img src="/images/game5.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={6} data-value="6"><img src="/images/game6.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={7} data-value="7"><img src="/images/game7.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={8} data-value="8"><img src="/images/game8.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={9} data-value="9"><img src="/images/game9.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={10} data-value="10"><img src="/images/game10.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={11} data-value="11"><img src="/images/game11.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={12} data-value="12"><img src="/images/game12.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
    <Button className="item" key={13} data-value="13"><img src="/images/game1.png" onClick={() => getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")} /></Button>,
  ];

  return (
         <> <Typography >Choose Game</Typography>
          <AliceCarousel items={choose_game_items} responsive={responsive} /></>
  )
}

export default SliderComp;