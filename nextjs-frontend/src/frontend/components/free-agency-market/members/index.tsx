import { Box, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styled from "@emotion/styled";

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
    type: "Bronze",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "Gold",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "Diamond",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "Ruby",
    tags: ["Games", "Won", "Elo"],
  },
  {
    name: "Player",
    image: "/images/teams/player.png",
    type: "Silver",
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

  return (
    <React.Fragment>
      <Box>
        <Typography color={"white"} variant={"h5"} mt={8}>
          Team Members
        </Typography>
        <Box marginY={2}>
          <Slider {...settings}>
            {players.map((player) => {
              return <Member key={player.name} {...player} />;
            })}
            <Box>
              <Box
                border={"4px solid #6931F9"}
                borderRadius={"10px"}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.09)" }}
                minHeight={365}
                display="flex"
                alignContent={"center"}
                flexDirection="column"
                component={"div"}
                justifyContent="center"
              >
                <Image
                  src={"/icons/.svg"}
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
