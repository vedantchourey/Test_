import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import NoobPage from "../../src/frontend/components/page/noob-page";
import ReactHtmlParser from "react-html-parser";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import axios from "axios";

export default function News(): JSX.Element {

  const [newsData, setData] = useState<any[]>([]);
  const [currentNews, setCurrentNews] = useState<any>(null)

  const getleaderboardgamedata = async (gameId: string): Promise<void> => {
    try {
      const endpoint = "/api/news/newslist";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { game_id: gameId }, headers: headers })
        .then((res) => {
          setData(res.data);
        })
        .catch(function (error) {
          console.error(error);
          setData([]);
        });
    } catch (err) {
      alert(err);
    }
  };

  React.useEffect(() => {
    getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257");
  }, []);

  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <Typography variant="h1">News</Typography>
        {!currentNews && (
          <Box display={"flex"} flexWrap={"wrap"}>
            {newsData.map((i: any, key) => (
              <Card
                sx={{ maxWidth: 345, m: 2 }}
                key={key}
                onClick={(): any => setCurrentNews(i)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={i.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontSize={16}
                    textAlign={"left"}
                    component="div"
                  >
                    {i.title}
                  </Typography>
                  <Typography
                    textAlign={"left"}
                    variant="h1"
                    fontSize={14}
                    mt={1}
                    color={"#6931F9"}
                  >
                    Author: {i.author} / Publishing Date:{" "}
                    {moment(i.created_at).format("DD MMM YYYY")}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {currentNews && (
          <Box textAlign={"left"}>
            <Button onClick={(): any => setCurrentNews(null)}>Back</Button>
            <Typography textAlign={"left"} variant="h5">
              {currentNews.title}
            </Typography>
            <Typography
              textAlign={"left"}
              variant="h6"
              fontSize={12}
              color={"rgba(255,255,255,0.7)"}
            >
              {currentNews.subtitle}
            </Typography>
            <Typography
              textAlign={"left"}
              variant="h1"
              fontSize={14}
              mt={1}
              color={"#6931F9"}
            >
              Author: {currentNews.author} / Publishing Date:{" "}
              {moment(currentNews.created_at).format("DD MMM YYYY")}
            </Typography>
            <Box mt={4} textAlign={"center"}>
              <img src={currentNews.image} style={{ width: "60vh" }} />
            </Box>
            <div
              style={{ fontFamily: "Inter", textAlign: "left", marginTop: 40 }}
            >
              {ReactHtmlParser(currentNews.description)}
            </div>
          </Box>
        )}
      </>
    </NoobPage>
  );
}
