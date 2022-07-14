import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, IconButton, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
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

const TeamMembers: React.FC<{ teamId: string | string[] | undefined; params: any }> = ({ params }) => {
  const [data, setData] = useState<MemberProp[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [team, setTeam] = React.useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>("")
  const [selectedPlayer, setSelectedPlayer] = useState<any>(undefined)

  const fetchUsers = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios.get("/api/free-agency-market/list", { headers: headers, params }).then((res) => {
      const players: MemberProp[] = res.data.map((item: any) => ({
        name: `${item.username}`,
        username:`${item.username}`,
        id: item.user_id,
        image: "/images/teams/player.png",
        type: "bronze",
        tags: ["Games", "Won", "Elo"],
        elo: item?.elo_rating,
        won: item?.won,
        platformId: item?.platform_id,
        gameId: item.game_id,
        games: Number(item?.won) + Number(item?.lost),
        profileImage: item.avatarUrl
          ? frontendSupabase.storage
              .from("public-files")
              .getPublicUrl(item.avatarUrl).publicURL
          : undefined,
      }));
      setData(players);
    });
  };

  const OfferModal = (): JSX.Element => {
    const filtedTeamList =
      isModalOpen && selectedPlayer
        ? team.filter((i) => i.gameId === selectedPlayer.gameId && i.platformId === selectedPlayer.platformId)
        : team;

    return (
      <Modal
        open={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false);
          setSelectedTeam("");
          setSelectedPlayer(undefined);
        }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Card sx={{ width: "641px", height: "auto", marginHorizontal: 30 }}>
          {filtedTeamList.length === 0 ? (
            <CardContent>
              <Typography textAlign={"center"}>
                You don&apost have team to invite this player
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <CardContent>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography>Send offer to Recruite</Typography>
                  <IconButton
                    onClick={(): any => {
                      setIsModalOpen(false);
                      setSelectedTeam("");
                      setSelectedPlayer(undefined);
                    }}
                  >
                    <img src="/icons/close.svg" alt="icon" />
                  </IconButton>
                </Box>
              </CardContent>

              <CardContent>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Image src="/images/team1.png" height={50} width={50} />
                  <Box ml={2}>
                    <Select
                      displayEmpty
                      id="team-select"
                      style={{ width: 250 }}
                      onChange={(e): any => setSelectedTeam(e.target.value)}
                      value={selectedTeam}
                      defaultValue={""}
                    >
                      <MenuItem value="">Select Team</MenuItem>
                      {filtedTeamList.map((i: any, idx: number) => (
                        <MenuItem value={i.id} key={idx}>
                          {i.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <Typography>Legend Club</Typography> */}
                  </Box>
                </Box>
              </CardContent>

              <CardContent>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography>Your message</Typography>
                  <Typography color={"GrayText"}>Max 100 words</Typography>
                </Box>

                <Box>
                  <TextField
                    placeholder="Type here..."
                    fullWidth={true}
                    multiline={true}
                    rows={7}
                  />
                </Box>
              </CardContent>

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    padding: "10px 10px",
                    width: "230px",
                  }}
                  onClick={(): any => {
                    setIsModalOpen(false);
                    setSelectedTeam("");
                    setSelectedPlayer(undefined);
                  }}
                >
                  Cancel Offer
                </Button>
                <Button
                  style={{
                    background: !selectedTeam
                      ? "rgba(255, 255, 255, 0.4)"
                      : "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
                    color: "white",
                    padding: "10px 10px",
                    width: "230px",
                  }}
                  disabled={!selectedTeam}
                  onClick={(): void => {
                    sendInvitation(selectedPlayer.id);
                  }}
                >
                  Send Offer
                </Button>
              </Box>
            </CardContent>
          )}
        </Card>
      </Modal>
    );
  };

  const addToWatchList = async (playerId: string, gameId: string): Promise<void> => {
    setLoading(true);
    const data = {
      playerId,
      gameId
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
      team_id: selectedTeam,
    };
    const headers = await getAuthHeader();
    axios
      .post("/api/teams/send-invite", data, {
        headers: headers,
      })
      .then(() => {
        alert("Player invited");
        setIsModalOpen(false);
        setSelectedTeam("");
        setSelectedPlayer(undefined);
      })
      .catch(() => {
        alert("Player already invited or already in the team");
      })
      .finally(() => setLoading(false));
  };

  const fetchTeam = async (): Promise<void> => {
      const headers = await getAuthHeader();
      setLoading(true);
      axios
        .get("/api/teams", { headers: headers })
        .then((res) => {
          if (res.data.result && res.data.result.length > 0) {
            setTeam(res.data.result);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }

  console.warn(sendInvitation);

  useEffect(() => {
    fetchUsers();
    fetchTeam();
  }, [params]);

  return (
    <React.Fragment>
      <OfferModal/>
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
                          addToWatchList(player.id, player.gameId);
                        }}
                      >
                        + Add to Watch List
                      </NoobButton>
                    </Box>
                    {(
                      <Box textAlign="center" mt={2} mb={12}>
                        <NoobButton
                          variant="contained"
                          disabled={loading}
                          style={{ backgroundColor: "#F09633" }}
                          fullWidth={true}
                          onClick={(): void => {
                            setIsModalOpen(true);
                            setSelectedPlayer(player);
                          }}
                        >
                          Send Offer to Recruit
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
