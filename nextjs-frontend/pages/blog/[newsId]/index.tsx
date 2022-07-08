import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
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
      getnewsdata();
      setCurrentUrl(window.location.href);
    }
  }, [newsID]);

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
                  <Box mr={1}>
                    {liked
                      ? parseInt(currentNews.likeCount) + 1
                      : currentNews.likeCount}{" "}
                  </Box>
                  <ThumbUpOffAltIcon />
                  Like
                </Box>
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
