import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Modal,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import styles from "./user-profile-card.module.css";
import { avatarListWithUrl } from "../../../utils/config/default-avatars";
import { v4 } from "uuid";

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
  onUploadAvatar: (file: any) => void;
  handleCustomUploadAvatarPicker: () => void;
}

const AvtarModal = (props: IProps): JSX.Element => {
  const { isModalOpen, handleClose, handleCustomUploadAvatarPicker } = props;

  // const handleimgupload = (imgurl: any) => {

  //   const toDataURL = fetch(imgurl)
  //     .then(response => response.blob())
  //     .then(blob => new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onloadend = () => resolve(reader.result)
  //     reader.onerror = reject
  //     reader.readAsDataURL(blob)
  //    }))

  //   console.log("formdata",imgurl)
  // }

  const _renderAvatars = (): JSX.Element[] | JSX.Element | void[] => {
    const imglist = avatarListWithUrl;
    return (
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" sx={{ flexWrap: "wrap", width: '100%' }}>
          {imglist.map((data) => {
            return (
              <Avatar
                src={data.url as string}
                style={{cursor: "pointer"}}
                onClick={(): any => {
                  fetch(data.url as string)
                    .then((res) => res.blob()) // Gets the response and returns it as a blob
                    .then((blob: Blob) => {
                      const dt = new DataTransfer();
                      dt.items.add(
                        new File([blob], `${v4()}.png`, { type: "image/png" })
                      );
                      props.onUploadAvatar(dt.files);
                    });
                }}
                sx={{ width: 130, height: 130, m: "auto", my: 1 }}
                key={`1index-${data.url}`}
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
