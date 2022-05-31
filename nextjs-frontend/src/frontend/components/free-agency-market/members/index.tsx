import styled from "@emotion/styled";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import {
  CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, TimeScale, Title,
  Tooltip
} from "chart.js";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAuthHeader } from "../../../utils/headers";
import Member, { MemberProp } from "../../team/members/member";

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

const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const getData = (): { x: string; y: number }[] => {
  let date = moment().subtract(10, "days");
  const data = [];
  data.push({ x: date.format("DD/MM/YYYY"), y: getRandomArbitrary(200, 700) });
  for (let i = 1; i <= 10; i++) {
    date = date.add(1, "day");
    data.push({
      x: date.format("DD/MM/YYYY"),
      y: getRandomArbitrary(200, 700),
    });
  }
  return data;
};

export const data = {
  datasets: [
    {
      label: "Dataset 1",
      data: getData(),
      borderColor: "rgb(105, 49, 249)",
      backgroundColor: "rgb(105, 49, 249)",
    },
  ],
};

const players: MemberProp[] = [
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "bronze",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "gold",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "diamond",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "ruby",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "silver",
    tags: ["Games", "Won", "Elo"],
  },
];

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState<MemberProp[] | []>([]);

  const fetchUsers = async () =>{
    const headers = await getAuthHeader();
    axios.get("/api/free-agency-market/list",{headers:headers}).then((res)=>{
      console.log('res.data -> ', res.data);
      const players: MemberProp[] = res.data.map((item: any) => ({
        name: `${item.firstName} ${item.lastName}`,
        image: "/images/teams/player.png",
        type: "bronze",
        tags: ["Games", "Won", "Elo"],
        elo: "10",
        won: "6",
        games: 12
      }));
      setData(players);
    })
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  console.log('data -> ', data)

  return (
    <React.Fragment>
      <Box>
        <Typography color={"white"} variant={"h5"} mt={8}>
          Team Members
        </Typography>
        <Box marginY={2}>
          <Slider {...settings}>
            {data.map((player: any) => {
              return <Member key={player.firstName} {...player} />;
            })}
          </Slider>
        </Box>
      </Box>
      {isMobile ? (
        <>
          <Box textAlign='center' mt={6}>
            <NoobButton variant="contained" style={{ backgroundColor: '#6932F9' }} fullWidth={true}>+ Add to Watch List</NoobButton>
          </Box>
          <Box textAlign='center' mt={2} mb={12}>
            <NoobButton variant="contained" style={{ backgroundColor: '#F09633' }} fullWidth={true}>Send Offer to Recurit</NoobButton>
          </Box>
        </>
      ) : (
        <Box textAlign='center' mt={6} mb={12}>
          <NoobButton variant="contained" style={{ backgroundColor: '#6932F9', margin: "0px 10px" }}>+ Add to Watch List</NoobButton>
          <NoobButton variant="contained" style={{ backgroundColor: '#F09633' }}>Send Offer to Recurit</NoobButton>
        </Box>

      )
      }
    </React.Fragment>
  );
};

export default TeamMembers;
