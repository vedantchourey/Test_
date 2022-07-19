import styled from "@emotion/styled";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MemberProp[] | []>([]);

  const fetchUsers = async (): Promise<void> => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/free-agency-market/get-watchlist", { headers: headers })
      .then((res) => {
        const players: MemberProp[] = res.data.map((item: any) => ({
          name: `${item.firstName} ${item.lastName}`,
          username:`${item.username}`,
          id: item.id,
          image: "/images/teams/player.png",
          type: "bronze",
          tags: ["Games", "Won", "Elo"],
          elo: item?.elo_rating,
          won: item?.won,
          games: Number(item?.won)+Number(item?.lost),
          profileImage: item.avatarUrl
          ? frontendSupabase.storage
              .from("public-files")
              .getPublicUrl(item.avatarUrl).publicURL
          : undefined,
        }));
        setData(players);
      })
      .finally(() => setLoading(false));
  };

  const removeToWatchList = async (id: string): Promise<void> => {
    setLoading(true);
    const data = {
      id,
    };
    const headers = await getAuthHeader();
    axios
      .post("/api/free-agency-market/delete-watchlist", data, {
        headers: headers,
      })
      .then(() => {
        fetchUsers();
      })
      .catch(() => {
        alert("Player already added in Watch list");
      })
      .finally(() => setLoading(false));
  };

  const sendInvitation = async (playerId: string): Promise<void> => {
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
      .then(() => {
        // console.log('res -> ', res)
      })
      .catch(() => {
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
        <Box marginY={2}>
          {!data.length && !loading && (
            <Box mt={5} mb={5}>
              <Typography color={"white"}>No player added in watchlist</Typography>
            </Box>
          )}
          <Box marginY={2} width={"70vw"}>
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
                          onClick={(): void => {removeToWatchList(player.id || "")}}
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
                            onClick={(): void => {sendInvitation(player.id || "")}}
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
      </Box>
    </React.Fragment>
  );
};

export default WatchTeamMembers;
