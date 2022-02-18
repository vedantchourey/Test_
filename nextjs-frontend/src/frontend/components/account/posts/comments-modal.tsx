import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, IconButton, Modal, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Skeleton } from '@mui/material';
import styles from "./post.module.css";
import { IPostCommentResponse } from '../../../service-clients/messages/i-posts-response';
import {
  useAppSelector,
} from "../../../redux-store/redux-store";
import { avatarImageBlobUrlSelector } from '../../../redux-store/authentication/authentication-selectors';
import { createComment, getPostComments } from "../../../service-clients/post-service-client";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  backgroundColor: "#08001C",
  padding: '1px 0'
}

interface IProps {
  isModalOpen: boolean;
  handleClose: () => void;
  postId: string
}

const CommentsModal = (props: IProps): JSX.Element => {
  const userAvatar = useAppSelector(avatarImageBlobUrlSelector);
  const { isModalOpen, handleClose } = props;
  const [comment, setComment] = useState<string>('');

  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(true)
  const [comments, setComments] = useState<IPostCommentResponse[]>([]);

  useEffect(() => {
    getComments();
  }, [])

  const getComments = async (): Promise<void> => {
    const data = await getPostComments(props.postId);
    setComments(data);
    setIsFetchingComments(false);
  }

  async function onClickCreateComment(): Promise<void> {
    if (!comment) {
      alert('Please enter you comment');
      return;
    }
    const result = await createComment({
      postId: props.postId,
      comment: comment
    });
    if (!result.isError) setComments((prevState: IPostCommentResponse[]) => [result, ...prevState]);
    setComment('');
  }

  const _renderComments = (): JSX.Element[] | JSX.Element | void[] => {
    if (isFetchingComments) {
      return (
        new Array(20).fill('')
          .map((_, i) => {
            return (
              <Box key={i} sx={{ px: 2 }} mb={3}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <div style={{ width: '90%' }}>
                    <Skeleton key={i} width={'40%'} height={14} />
                    <Skeleton key={i} height={14} />
                    <Skeleton key={i} height={14} />
                  </div>
                </div>
              </Box>
            )
          })
      )
    }
    else if (!isFetchingComments && comments.length) {
      return (
        comments.map((data, i) => {
          return (
            <Box key={Date.now() + i} className={styles.commentCard}>
              <Box sx={{ display: 'inline-flex' }}>
                <Avatar
                  className={styles.commentAvatar}
                  alt="Remy Sharp"
                  src={''}
                />
                <Box>
                  <Box sx={{ display: "inline-flex" }}>
                    <Typography variant={'body1'} color="white">
                      {
                        `${data.commentOwner.firstName} ${data.commentOwner.lastName}`
                      }
                    </Typography>
                    <Typography variant="subtitle2" color='#575265' ml={1}>
                      {
                        new Date(data.createdAt).toDateString()
                      }
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography
                      variant="body2"
                      color='white'
                      sx={{ textTransform: 'capitalize' }}>
                      {data.comment}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })
      )
    }
    // eslint-disable-next-line no-else-return
    else {
      return (
        <Box mt={5}>
          <Typography variant={'subtitle1'} color={'white'} textAlign="center">
            No comments
          </Typography>
        </Box>
      );
    }
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
    >
      <Box sx={style} className={styles.mainModalContainer} >
        <Box className={styles.commentsContainer} >
          <AppBar className={styles.appBar}>
            <Toolbar className={styles.customToolBar}>
              <Typography variant="body1" component="div">
                Comments
              </Typography>
              <IconButton onClick={handleClose} >
                <img src='icons/close.svg' alt='icon' />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box mt={12}>
            {_renderComments()}
          </Box>
          <Box className={styles.commentInputCotainer}>
            <Box className={styles.commentInput}>
              <Box sx={{ display: "inline-flex", alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, width: 35, height: 35 }} alt="avatar" src={userAvatar} />
                <TextField
                  placeholder={`Your comment`}
                  fullWidth
                  multiline
                  autoFocus
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(event): void => {
                    setComment(event.target.value)
                  }}
                />

              </Box>
              <Box>
                <Button
                  size="small"
                  variant={"contained"}
                  style={{
                    borderRadius: 99999,
                    textTransform: 'capitalize'
                  }}
                  onClick={onClickCreateComment}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal >
  )
}

export default CommentsModal