import styled from "@emotion/styled";
import { Box, Button, Card, CardActions, CardContent, IconButton, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { getAuthHeader } from "../../../utils/headers";
import Member, { MemberProp } from "../../team/members/member";
import CloseIcon from "@mui/icons-material/Close";
import Image from "@mui/icons-material/Image";

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

const TeamMembers: React.FC<{ teamId: string | string[] | undefined; params: any }> = ({ teamId, params }) => {
  const [data, setData] = useState<MemberProp[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchUsers = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios.get("/api/free-agency-market/list", { headers: headers, params }).then((res) => {
      const players: MemberProp[] = res.data.map((item: any) => ({
        name: `${item.username}`,
        id: item.user_id,
        image: "/images/teams/player.png",
        type: "bronze",
        tags: ["Games", "Won", "Elo"],
        elo: item?.elo_rating,
        won: item?.won,
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

  const OfferModal = () => {
    return (
      <Modal
        open={isModalOpen}
        style={{ position: 'absolute', top: '456px', left: '399px' }}
        onClose={(): void => {
          setIsModalOpen(false);
        }}
      >
      <Card sx={{ width: '641px', height: '498px', marginHorizontal: 30 }}>
      <CardContent>
        <CardContent>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography>
          Send offer to Recruite
        </Typography>
        <IconButton onClick={() => setIsModalOpen(false)}>
          <img src='/icons/close.svg' alt='icon'/>
        </IconButton>
        </Box>
        </CardContent>

      <CardContent>
      <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <img src="/images/team1.png" style={{ width: 50, height: 50, marginRight: 20, resize: 'both' }}/>
        <Box>
          <Typography>
            Legend Club
          </Typography>
      </Box>
      </Box>
      </CardContent>


      <CardContent>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography>
          Your message
        </Typography>
        <Typography color={'GrayText'}>
          Max 100 words
        </Typography>
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

      <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
        <Button
          variant="contained"
          style={{
            color: "white",
            padding: "10px 10px",
            width: "230px",
          }}
          onClick={(): any =>
            null
          }
        >
          Cancel Offer
        </Button>
        <Button
          style={{
            background: "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
            color: "white",
            padding: "10px 10px",
            width: "230px",
          }}
          onClick={(): void => {
            null
          }}
        >
          Send Offer
        </Button>
      </Box>
      </CardContent>
    </Card>
      </Modal>
    )
  }

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
                          addToWatchList(player.id);
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
