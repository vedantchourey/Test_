import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Modal,
  TextField,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";
import styles from "./user-profile-card.module.css";
import { IPostCommentResponse } from "../../../service-clients/messages/i-posts-response";
import { useAppSelector } from "../../../redux-store/redux-store";
import {
  avatarImageBlobUrlSelector,
  userProfileSelector,
} from "../../../redux-store/authentication/authentication-selectors";
import {
  createComment,
  getPostComments,
  getCommentLikesCount,
  deleteComment,
  updateComment,
} from "../../../service-clients/post-service-client";
import Image from "../../../components/utils/supabase-image";
import config from "../../../utils/config/front-end-config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { getAuthHeader } from "../../../utils/headers";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#08001C",
  padding: "1px 0",
};

interface IProps {
  isModalOpen: boolean;
  handleClose: () => void;
  handleCustomUploadAvatarPicker: () => void;
}

const AvtarModal = (props: IProps): JSX.Element => {
  const userAvatar = useAppSelector(avatarImageBlobUrlSelector);
  const user = useAppSelector(userProfileSelector);
  const { isModalOpen, handleClose, handleCustomUploadAvatarPicker } = props;

  const handleimgupload = (imgurl: any) => {

    // const toDataURL = fetch(imgurl)
    //   .then(response => response.blob())
    //   .then(blob => new Promise((resolve, reject) => {
    //   const reader = new FileReader()
    //   reader.onloadend = () => resolve(reader.result)
    //   reader.onerror = reject
    //   reader.readAsDataURL(blob)
    //  }))

    console.log("formdata",imgurl)
  }

  const _renderAvatars = (): JSX.Element[] | JSX.Element | void[] => {
    const imglist = [
      {
        url: "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg",
      },
      {
        url: "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-blue-default-avatar-png-image_2813123.jpg",
      },
      {
        url: "https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-boys-default-avatar-png-image_2854357.jpg",
      },
    ];
    return (
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" sx={{ flexWrap: "wrap", width: '100%' }}>
          {imglist.map((data) => {
            return (
              <Avatar
                src={data.url}
                onClick={(e)=> handleimgupload(data.url)}
                sx={{ width: 130, height: 130, m: "auto", my: 1 }}
              />
            );
          })}
        </Stack>
      </Box>
    );
  };
  // };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box sx={style} className={styles.mainModalContainer}>
        <Box className={styles.commentsContainer}>
          <AppBar className={styles.appBar}>
            <Toolbar className={styles.customToolBar}>
              <Typography variant="body1" component="div">
                Default Avatars
              </Typography>
              <IconButton onClick={handleClose}>
                <img src="/icons/close.svg" alt="icon" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box mt={12} className={styles.renderPosts}>
            {_renderAvatars()}
          </Box>
          <Box className={styles.commentInputCotainer}>
            <Box className={styles.commentInput}>
              <Box>
                <Button
                  size="small"
                  variant={"contained"}
                  style={{
                    borderRadius: 99999,
                    textTransform: "capitalize",
                  }}
                  onClick={handleCustomUploadAvatarPicker}
                >
                  Upload From Device
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AvtarModal;
