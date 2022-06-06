import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
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
  slidesToShow: 4,
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

const TeamMembers: React.FC<{ teamId: string | string[] | undefined; params: any }> = ({ teamId, params }) => {
  const [data, setData] = useState<MemberProp[] | []>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios.get("/api/free-agency-market/list", { headers: headers, params }).then((res) => {
      const players: MemberProp[] = res.data.map((item: any) => ({
        name: `${item.firstName} ${item.lastName}`,
        id: item.user_id,
        image: "/images/teams/player.png",
        type: "bronze",
        tags: ["Games", "Won", "Elo"],
        elo: item?.elo_rating,
        won: item?.won,
        games: Number(item?.won) + Number(item?.lost),
      }));
      setData(players);
    });
  };

  const addToWatchList = async (playerId: string): Promise<void> => {
    setLoading(true);
    const data = {
      playerId,
    };
    const headers = await getAuthHeader();
    axios
      .post("/api/free-agency-market/add-to-watchlist", data, {
        headers: headers,
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
  }, [params]);

  return (
    <React.Fragment>
      <Box>
        <Box marginY={2} width={"70vw"}>
          <Slider {...settings}>
            {data.map((player: any) => {
              return (
                <Member key={player.firstName} {...player}>
                  <>
                    <Box textAlign="center" mt={6}>
                      <NoobButton
                        variant="contained"
                        disabled={loading}
                        style={{ backgroundColor: "#6932F9" }}
                        fullWidth={true}
                        onClick={(): void => {
                          addToWatchList(player.id);
                        }}
                      >
                        + Add to Watch List
                      </NoobButton>
                    </Box>
                    {teamId && (
                      <Box textAlign="center" mt={2} mb={12}>
                        <NoobButton
                          variant="contained"
                          disabled={loading}
                          style={{ backgroundColor: "#F09633" }}
                          fullWidth={true}
                          onClick={(): void => {
                            sendInvitation(player.id || "");
                          }}
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

export default TeamMembers;
