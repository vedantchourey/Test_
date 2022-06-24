import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

import { Line } from "react-chartjs-2";
import moment from "moment";
import Member, { MemberProp } from "./member";
import Slider, { Settings } from "react-slick";
import Modal from "@mui/material/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import axios from "axios";
import { getAuthHeader } from "../../../utils/headers";
import { useRouter } from "next/router";
import { frontendSupabase } from "../../../services/supabase-frontend-service";

export const options = {
  responsive: true,
  elements: {
    line: {
      tension: 1, // disables bezier curves
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      //   text: "Chart.js Line Chart",
    },
  },
  showLine: true,
  spanGaps: true,
  bezierCurve: true,
  scales: {
    y: {
      ticks: {
        color: "white",
      },
    },
    x: {
      ticks: {
        color: "white",
      },
    },
  },
};

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

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface Player {
  balance: number;
  firstName: string;
  lastName: string;
  user_id: string;
  elo_rating: string;
  won?: string;
  lost?: string;
  avatarUrl?: string;
}

interface TeamMembersProps {
  teamId: string;
  players: Player[];
  team: any;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ teamId, players, team }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const [playerList, setPlayerList] = React.useState<MemberProp[]>([]);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    setEmail(undefined);
    setError(undefined);
  };
  const [email, setEmail] = React.useState<string | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);

  async function gotoFreeAgencyMarketPage(): Promise<void> {
    await router.push({
      pathname: "/free-agency-market/view/members",
      query: { teamId },
    });
  }

  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: team?.eloHistory?.map((i: any) => ({
          x: moment(i.created_at).format("DD/MM/YYYY"),
          y: parseInt(i.elo_rating),
        })),
        borderColor: "rgb(105, 49, 249)",
        backgroundColor: "rgb(105, 49, 249)",
      },
    ],
  };

  React.useEffect(() => {
    const newList: any[] = players.map((player) => {
      return {
        image: "/images/teams/player.png",
        type: "silver",
        tags: ["Games", "Won", "Elo"],
        name: `${player.firstName} ${player.lastName}`,
        games: Number(player.won) + Number(player.lost),
        won: player.won,
        elo: player.elo_rating || "0",
        profileImage: player.avatarUrl
          ? frontendSupabase.storage
              .from("public-files")
              .getPublicUrl(player.avatarUrl).publicURL
          : undefined,
      };
    });
    setPlayerList(newList);
  }, [players]);
  const invitePlayer = async (): Promise<void> => {
    const payLoad = { email: email, team_id: teamId };
    const headers = await getAuthHeader();
    axios
      .post("/api/teams/send-invite", payLoad, { headers: headers })
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 500 && err.response.data.errors) {
          setError(err.response.data.errors[0]);
        }
      });
  };
  return (
    <React.Fragment>
      <Box>
        <Typography color={"white"} variant={"h5"}>
          Team Members
        </Typography>

        <Box marginY={2} width={"70vw"}>
          <Slider {...settings}>
            {playerList.map((player) => {
              return <Member key={player.name} {...player} />;
            })}
            <Box>
              <Box
                onClick={handleOpen}
                border={"4px solid #6931F9"}
                borderRadius={"10px"}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.09)",
                  cursor: "pointer",
                }}
                height={"18.5vw"}
                display="flex"
                alignContent={"center"}
                flexDirection="column"
                component={"div"}
                justifyContent="center"
              >
                <Image
                  src={"/icons/PlayerAdd.svg"}
                  height={"45px"}
                  width={"45px"}
                />
                <Typography
                  marginY={2}
                  color="white"
                  textTransform={"uppercase"}
                  fontWeight="700"
                  fontSize={"17px"}
                  lineHeight={"18px"}
                >
                  Add Player
                </Typography>
              </Box>
            </Box>
          </Slider>
        </Box>
      </Box>
      {!isMobile ? (
        <Box>
          <Typography color={"white"} variant={"h5"}>
            Team Graph
          </Typography>
          <Line options={options} data={data} />
        </Box>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            color={"white"}
            marginBottom={2}
          >
            Invite Player
          </Typography>
          <Box display="flex" justifyContent={"space-between"}>
            <Box>
              <TextField
                variant="outlined"
                placeholder="Enter Email"
                value={email}
                onChange={(e): void => {
                  setEmail(e.target.value);
                }}
                style={{ color: "white", marginTop: 2 }}
              />
              {error ? <FormHelperText>{error}</FormHelperText> : null}
            </Box>
            <Box>
              <Button style={{ marginLeft: "2px" }} onClick={invitePlayer}>
                Send
              </Button>
            </Box>
          </Box>
          <Box>
            <Button
              style={{ marginLeft: "2px" }}
              color={"secondary"}
              onClick={(): void => {
                gotoFreeAgencyMarketPage();
              }}
              variant={"outlined"}
            >
              Open Free Agency Market
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default TeamMembers;
