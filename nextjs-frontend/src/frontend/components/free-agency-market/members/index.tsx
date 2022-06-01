import styled from "@emotion/styled";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAuthHeader } from "../../../utils/headers";
import Member, { MemberProp } from "../../team/members/member";

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

const settings: Settings = {
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

const TeamMembers: React.FC = () => {
  const [data, setData] = useState<MemberProp[] | []>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () =>{
    const headers = await getAuthHeader();
    axios.get("/api/free-agency-market/list",{headers:headers}).then((res)=>{
      const players: MemberProp[] = res.data.map((item: any) => ({
        name: `${item.firstName} ${item.lastName}`,
        id: item.user_id,
        image: "/images/teams/player.png",
        type: "bronze",
        tags: ["Games", "Won", "Elo"],
        elo: "10",
        won: "6",
        games: 12,
      }));
      setData(players);
    })
  }

  const addToWatchList = async (playerId: string) => {
    setLoading(true);
    const data = {
      playerId
    }
    const headers = await getAuthHeader();
    axios
      .post("/api/free-agency-market/add-to-watchlist", data, { headers: headers })
      .then((res) => {
        console.log('res -> ', res)
      })
      .catch((err) => {
        alert("Player already added in Watch list")
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <React.Fragment>
      <Box>
        <Typography color={"white"} variant={"h5"} mt={8}>
          Team Members
        </Typography>
        <Box marginY={2}>
          <Slider {...settings}>
            {data.map((player: any) => {
              return (
                <Member key={player.firstName} {...player}>
                  <Box textAlign="center" mt={2}>
                    <NoobButton
                      variant="contained"
                      style={{ backgroundColor: "#6932F9", margin: 5 }}
                      disabled={loading}
                      onClick={() => addToWatchList(player.id)}
                    >
                      + Add to Watch List
                    </NoobButton>
                    <NoobButton
                      variant="contained"
                      disabled={loading}
                      style={{ backgroundColor: "#F09633", margin: 5 }}
                    >
                      Send Offer to Recurit
                    </NoobButton>
                  </Box>
                </Member>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TeamMembers;
