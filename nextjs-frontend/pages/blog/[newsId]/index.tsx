import { useRouter } from "next/router";
import {
  Button,
  Typography,
  Popover,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Box } from "@mui/system";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { alpha } from "@mui/material/styles";
import moment from "moment";
import React, { useState } from "react";
import NoobPage from "../../../src/frontend/components/page/noob-page";
import ReactHtmlParser from "react-html-parser";
import { getAuthHeader } from "../../../src/frontend/utils/headers";
import { frontendSupabase } from "../../../src/frontend/services/supabase-frontend-service";
import axios from "axios";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewsView(): JSX.Element {
  const router = useRouter();
  const newsID = router.query.newsId;

  const [currentNews, setCurrentNews] = useState<any>(null);
  const [currentURL, setCurrentUrl] = useState<any>(null);
  const [liked, setLiked] = useState<any>(false);
  const [likersList, setLikersList] = useState<any>(null);
  const [topNews, setTopNews] = useState<any[]>([]);

  // const [data, setData] = React.useState([]);

  const fetchUsers = async (): Promise<void> => {
    const messages: any = await frontendSupabase.from("post_likes").select("*");
    // .eq("postId", props.postId)
    // .leftJoin('profiles', 'post_comments.commentBy', 'profiles.id')

    const Data: any = [];
    if (messages.data?.length) {
      messages.data.filter((_doc: any) => {
        if (_doc.isBlocked || new Date(_doc.suspended) > new Date()) {
          Data.push(_doc);
        }
      });
    }
    // setData(Data as any);
  };

  const handleClickPopover = (event: any): void => {
    event.stopPropagation();
    setLikersList(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setLikersList(null);
  };

  const openPopover = Boolean(likersList);
  const id = openPopover ? "simple-popover" : undefined;

  const getnewsdata = async (): Promise<void> => {
    try {
      const endpoint = `/api/news/newsDetail?newsId=${newsID}`;
      const headers = await getAuthHeader();
      axios
        .get(endpoint, {
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200) {
            setCurrentNews(res.data.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getnewslist = async (gameId: string): Promise<void> => {
    try {
      const endpoint = "/api/news/newslist";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { game_id: gameId }, headers: headers })
        .then((res) => {
          setTopNews(res.data);
        })
        .catch(function (error) {
          console.error(error);
          setTopNews([]);
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
    if (newsID) {
      fetchUsers();
      getnewsdata();
      getnewslist("ce718f19-ad37-4e56-a958-216da59e9257");
      setCurrentUrl(window.location.href);
    }
  }, [newsID]);

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        {currentNews && (
          <Box textAlign={"left"}>
            <Button onClick={(): any =>router.back()}>Back</Button>
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
                  <Box
                    mr={1}
                    aria-describedby={id}
                    onClick={handleClickPopover}
                  >
                    {liked
                      ? parseInt(currentNews.likeCount) + 1
                      : currentNews.likeCount}{" "}
                  </Box>
                  <ThumbUpOffAltIcon />
                  Like
                </Box>
                <Popover
                  id={id}
                  open={openPopover}
                  anchorEl={likersList}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    The content of the Popover.
                  </Typography>
                </Popover>
                <Box
                  sx={{ display: "flex", alignItems: "center", ml: 2 }}
                  onClick={(): any => {
                    navigator.clipboard.writeText(currentURL);
                    setOpen(true);
                  }}
                >
                  <ShareOutlinedIcon />
                  Share
                </Box>
              </Box>
            </Box>

            <div
              style={{
                fontFamily: "Inter",
                textAlign: "left",
                marginTop: 20,
              }}
            >
              {ReactHtmlParser(currentNews.description)}
            </div>
            <Grid
              container
              columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}
              display="flex"
            >
              <Box>
                <Box style={{ marginTop: "15px", display: "flex", alignItems:"center", justifyContent:"space-between" }}>
                  <Typography
                    style={{
                      color: "#FFF",
                      fontSize: "30px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontFamily: "Chakra Petch",
                    }}
                  >
                    related post’s
                  </Typography>
                  <Button variant="contained" onClick={(): any => router.push(`/blog`)}>View All</Button>
                </Box>
                <Divider style={{marginTop:"10px"}}/>
                <Box display={"flex"}>
                  {topNews
                  .sort(function (a, b) {
                    const dateA = new Date(a.created_at).getTime();
                    const dateB = new Date(b.created_at).getTime();
                    return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
                  })
                  .filter((i)=>i.id!==newsID)
.map((i: any, key) => {
                    if (key < 4) {
                      return (
                        <Card
                          sx={{ maxWidth: 260, m: 2 }}
                          key={key}
                          onClick={(): any => router.push(`/blog/${i.id}`)}
                        >
                          {i.label && (
                            <Typography
                              style={{
                                position: "absolute",
                                backgroundColor: "#6932F9",
                                marginTop: "15px",
                                padding: "5px 25px",
                                color: "white",
                              }}
                            >
                              {i.label}
                            </Typography>
                          )}
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
                      );
                    }
                  })}
                </Box>
              </Box>
            </Grid>
          </Box>
        )}
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copy Link successfully.
          </Alert>
        </Snackbar>
      </>
    </NoobPage>
  );
}
