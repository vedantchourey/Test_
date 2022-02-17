/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Card,
  CardMedia,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  Button,
  Grid
} from "@mui/material";
import styles from "./post.module.css";
import { IPostsResponse } from "../../../service-clients/messages/i-posts-response";
import { getImageSignedUrl } from "../../../service-clients/image-service-client";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentsModal from './comments-modal'

interface IProps {
  data: IPostsResponse;
}

const PostCard = (props: IProps): JSX.Element => {
  const [values, setValues] = useState<IPostsResponse>(props.data);
  const [openCommentsModal, setOpenCommentsModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("")


  const handleOpenComments = (): void => setOpenCommentsModal((pre) => !pre)
  const handleCloseComments = (): void => setOpenCommentsModal(false);
  const handleCloseMenu = (): void => setShowMenu(false);
  const handleToggleMenu = (): void => setShowMenu((pre) => !pre)

  const handleToggleLike = (): void => {
    setValues({ ...values, isLiked: true });
  };

  useEffect(() => {
    (async (): Promise<void> => {
      const { signedURL } = await getImageSignedUrl(
        "resources",
        values.postImgUrl
      );
      setImgUrl(signedURL);
    })();
    (async (): Promise<void> => {
      const { signedURL } = await getImageSignedUrl(
        "resources",
        values.postOwner.avatarUrl
      )
      setAvatarUrl(signedURL);
    })()
  }, []);

  return (
    <Grid item md={12}>
      <Card className={styles.postCard} sx={{ my: 3 }} elevation={0}>
        <Box sx={{
          width: "100%",
          display: 'inline-flex',
          justifyContent: "space-between",

        }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar
              className={styles.postAvatar}
              alt="Remy Sharp"
              src={avatarUrl}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline',
              paddingLeft: "10px"
            }}>
              <Typography variant={'h3'} fontSize={15}>
                {values.postOwner.firstName + " " + values.postOwner.lastName}
              </Typography>
              <Typography variant="subtitle2" color='#575265'>
                {new Date(values.createdAt).toDateString()}
              </Typography>
            </Box>
          </Box>

          <div>
            <IconButton sx={{ padding: '10px' }} onClick={handleToggleMenu} >
              <MoreHorizIcon />
            </IconButton>
            {showMenu && (
              <List className={styles.postCardOptionsContainer}>
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    className={styles.postCardOptionsBtn}
                    sx={{ color: 'red', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }}
                  >
                    <img src='icons/error.svg' alt='icon' />
                    Report Post
                  </Button>
                </ListItem>
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    className={styles.postCardOptionsBtn}
                    sx={{ color: 'red', margin: '2px 0', borderRadius: '0px' }}
                  >
                    <img src='icons/copy.svg' alt='icon' />
                    Copy Link
                  </Button>
                </ListItem>
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    onClick={handleCloseMenu}
                    className={styles.postCardOptionsBtn}
                    sx={{ color: 'black', borderTopLeftRadius: 0, borderTopRightRadius: 0, }}
                  >
                    Cancel
                  </Button>
                </ListItem>
              </List>
            )}
          </div>

        </Box>
        <Typography my={2} align='left' fontSize={14} fontWeight={100} paragraph>
          {values.postContent}
        </Typography>

        {imgUrl && (
          <>
            {/* Action Button Blur Container */}
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                className={styles.postImage}
                image={imgUrl || ""}
                alt="user avatar"
                key={"as"}
              />
              <Box className={styles.actionButtons}>
                <Box className={styles.blurContainer}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <IconButton
                        onClick={handleToggleLike}
                        className={styles.postBtn}
                        sx={{ padding: '12px' }}
                      >
                        <img src='icons/heart.svg' alt='icon' />
                      </IconButton>
                      {50}
                    </Box>
                    <Box mx={1}>
                      <IconButton
                        className={styles.postBtn}
                        onClick={handleOpenComments}
                        sx={{ padding: '15px' }}
                      >
                        <img src='icons/message.svg' alt='icon' />
                      </IconButton>
                      {50}
                    </Box>
                    <Box>
                      <IconButton
                        onClick={handleToggleLike}
                        className={styles.postBtn}
                      >
                        <img src='icons/share.svg' alt='icon' />
                      </IconButton>
                      5
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box mt={5} sx={{ textAlign: 'center' }}>
              <img width={85} src='images/noobstorm-logo-small.png' />
            </Box>
          </>
        )}
      </Card>

      <CommentsModal isModalOpen={openCommentsModal} handleClose={handleCloseComments} />

    </Grid>
  );
};

export default PostCard;
