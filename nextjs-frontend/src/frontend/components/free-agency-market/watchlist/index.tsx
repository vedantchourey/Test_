import styled from "@emotion/styled";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
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

const WatchTeamMembers: React.FC<{teamId: string | string[] | undefined}> = ({teamId}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MemberProp[] | []>([]);

  const fetchUsers = async () => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/free-agency-market/get-watchlist", { headers: headers })
      .then((res) => {
        const players: MemberProp[] = res.data.map((item: any) => ({
          name: `${item.firstName} ${item.lastName}`,
          id: item.id,
          image: "/images/teams/player.png",
          type: "bronze",
          tags: ["Games", "Won", "Elo"],
          elo: "10",
          won: "6",
          games: 12,
        }));
        setData(players);
      })
      .finally(() => setLoading(false));
  };

  const removeToWatchList = async (id: string) => {
    setLoading(true);
    const data = {
      id,
    };
    const headers = await getAuthHeader();
    axios
      .post("/api/free-agency-market/delete-watchlist", data, {
        headers: headers,
      })
      .then((res) => {
        fetchUsers();
      })
      .catch((err) => {
        alert("Player already added in Watch list");
      })
      .finally(() => setLoading(false));
  };

  const sendInvitation = async (playerId: string) => {
    setLoading(true);
    const data = {
      player_id: playerId,
      team_id: teamId,
    };
    const headers = await getAuthHeader();
    axios
      .post("/api/teams/send-invite", data, {
        headers: headers,
      })
      .then((res) => {
        // console.log('res -> ', res)
      })
      .catch((err) => {
        alert("Player already invited or already in the team");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Typography color={"white"} variant={"h5"} mt={8}>
          Team Members
        </Typography>
        <Box marginY={2}>
          {!data.length && !loading && (
            <Box mt={5} mb={5}>
              <Typography color={"white"}>No player added in watchlist</Typography>
            </Box>
          )}
          <Slider {...settings}>
            {data.map((player) => {
              return (
                <Member key={player.name} {...player}>
                  <>
                    <Box textAlign="center" mt={6}>
                      <NoobButton
                        variant="contained"
                        disabled={loading}
                        style={{ backgroundColor: "#6932F9" }}
                        fullWidth={true}
                        onClick={() => removeToWatchList(player.id || "")}
                      >
                        - Remove
                      </NoobButton>
                    </Box>
                    {teamId && (
                      <Box textAlign="center" mt={2} mb={12}>
                        <NoobButton
                          variant="contained"
                          disabled={loading}
                          style={{ backgroundColor: "#F09633" }}
                          fullWidth={true}
                          onClick={() => sendInvitation(player.id || "")}
                        >
                          Send Offer to Recurit
                        </NoobButton>
                      </Box>
                    )}
                  </>
                </Member>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default WatchTeamMembers;
