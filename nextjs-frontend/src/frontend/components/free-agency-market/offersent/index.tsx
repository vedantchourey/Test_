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

const WatchTeamMembers: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MemberProp[] | []>([]);

  const fetchUsers = async (): Promise<void> => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/teams/list-sent-invitations", { headers: headers })
      .then((res) => {
        const players: MemberProp[] = res.data.result.map((item: any) => ({
          name: `${item.player.firstName} ${item.player.lastName}`,
          id: item.secret,
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

  const removeToWatchList = async (invite_key: string): Promise<void> => {
    setLoading(true);
    const headers = await getAuthHeader();
    axios
      .get(`/api/teams/reject-invite?invite_key=${invite_key}`, {
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
                          Cancel
                        </NoobButton>
                      </Box>
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
