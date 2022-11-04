import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { alpha } from "@mui/material/styles";
import moment from "moment";
import React, { useState } from "react";
import NoobPage from "../../src/frontend/components/page/noob-page";
import ReactHtmlParser from "react-html-parser";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import axios from "axios";

export default function News(): JSX.Element {
  const [newsData, setData] = useState<any[]>([]);
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [liked, setLiked] = useState<any>(false);
  const router = useRouter();

  const getNewsData = async (): Promise<void> => {
    try {
      const endpoint = "/api/news/newslist";
      axios
        .get(endpoint)
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

  const likeNews = async (): Promise<void> => {
    try {
      const endpoint = "/api/news/likenews";
      const headers = await getAuthHeader();
      axios
        .post(
          endpoint,
          {
            newsId: currentNews.id,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setLiked(true);
          }
        })
        .catch(function (error) {
          console.error(error);
          // setData([]);
        });
    } catch (err) {
      console.error(err);
    }
  };
  const unLikeNews = async (): Promise<void> => {
    try {
      const endpoint = "/api/news/unlikenews";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, {
          params: { newsId: currentNews.id },
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200) {
            setLiked(false);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getNewsData();
  }, []);

  return (
    <NoobPage
      title="Blog"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <Typography variant="h1" mt={3}>Blogs</Typography>
        {!currentNews && (
          <Box display={"flex"} flexWrap={"wrap"}>
            {newsData
              .sort(function (a, b) {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
              })
              .map((i: any, key) => (
                <Card
                  sx={{ m: 2 }}
                  key={key}
                  onClick={(): any => router.push(`/blog/${i.id}`)}
                  // onClick={(): any => setCurrentNews(i)}
                >
                  {i.label&&
                  <Typography style={{position:'absolute',backgroundColor:'#6932F9',marginTop:"15px",padding:"5px 25px",color:"white"}}>{i.label}</Typography>}
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
            <Box mt={4} ml={2} style={{ float: "right" }}>
              <img src={currentNews.image} style={{ width: "60vh" }} />
            </Box>
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
            <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h1" fontSize={14} mt={1} color={"#6931F9"}>
                Author: {currentNews.author} / Publishing Date:{" "}
                {moment(currentNews.created_at).format("DD MMM YYYY")}
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                  fontWeight: "medium",
                  display: "flex",
                  fontSize: 14,
                  alignItems: "center",
                  "& svg": {
                    fontSize: 21,
                    mr: 0.5,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: liked ? "primary.main" : "",
                  }}
                  onClick={(): any => {
                    if (liked) {
                      unLikeNews();
                    } else {
                      likeNews();
                    }
                  }}
                >
                  <ThumbUpOffAltIcon />
                  Like
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <ShareOutlinedIcon />
                  Share
                </Box>
              </Box>
            </Box>

            <div
              style={{ fontFamily: "Inter", textAlign: "left", marginTop: 20 }}
            >
              {ReactHtmlParser(currentNews.description)}
            </div>
          </Box>
        )}
      </>
    </NoobPage>
  );
}
