import React, { useState } from "react";
import { AppBar, Avatar, Button, IconButton, Modal, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./post.module.css";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ICreateCommentRequest } from '../../../../backend/services/posts-services/create-comment/i-create-comment';
import { setIsLoading } from "../../../redux-store/screen-animations/screen-animation-slice";
import {
  useAppDispatch,
} from "../../../redux-store/redux-store";
import { createComment } from "../../../service-clients/post-service-client";



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
}

const CommentsModal = (props: IProps): JSX.Element => {
  const { isModalOpen, handleClose } = props;
  const appDispatch = useAppDispatch();
  const [request, setRequest] = useState<Partial<ICreateCommentRequest>>({
    comment: "",
  });


  async function onClickCreateComment(): Promise<void> {
    try {
      appDispatch(setIsLoading(true));
      await createComment(request as ICreateCommentRequest);
      setRequest({
        comment: "",
      });
    } finally {
      appDispatch(setIsLoading(false));
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
            {['', '', '', '', '', '', '', '', '', '', '', '', '', ''].map((i) => (
              <Box key={i} className={styles.commentCard}>
                <Box sx={{ display: 'inline-flex' }}>
                  <Avatar
                    className={styles.commentAvatar}
                    alt="Remy Sharp"
                    src='/static/images/avatar/1.jpg'
                  />
                  <Box>
                    <Box sx={{ display: "inline-flex" }}>
                      <Typography variant={'body1'} color="white">
                        Sandeep
                      </Typography>
                      <Typography variant="subtitle2" color='#575265' ml={1}>
                        7m
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography
                        variant="body2"
                        color='white'
                        sx={{ textTransform: 'capitalize' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box mt={3} mb={1} sx={{ display: 'inline-flex', color: '#6E767D' }}>
                  <Box className={styles.commetActionBtn}>
                    <IconButton className={styles.commetsAction}>
                      <FavoriteBorderIcon color='disabled' />
                    </IconButton>
                    50
                  </Box>
                  <Box mx={4} className={styles.commetActionBtn}>
                    <IconButton className={styles.commetsAction}>
                      <ChatBubbleOutlineIcon color='disabled' />
                    </IconButton>
                    {50}
                  </Box>
                  <Box className={styles.commetActionBtn}>
                    <IconButton className={styles.commetsAction}>
                      <ShareIcon color='disabled' />
                    </IconButton>
                    5
                  </Box>
                </Box>
              </Box>
            ))}

          </Box>
          <Box className={styles.commentInputCotainer}>
            <Box className={styles.commentInput}>
              <Box sx={{ display: "inline-flex", alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, width: 35, height: 35 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <TextField
                  placeholder={`Your comment`}
                  fullWidth
                  multiline
                  autoFocus
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(event): void =>
                    setRequest({ comment: event.target.value })
                  }
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