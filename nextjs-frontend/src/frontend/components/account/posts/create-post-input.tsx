import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  IconButton,
  Avatar,
  Grid,
  Tooltip,
  CircularProgress,
  Box,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { validatePostContent } from "./validator";
import {
  getErrorForProp,
  isThereAnyError,
  propsHasError,
  ValidationResult,
} from "../../../../common/utils/validation/validator";
import { setIsLoading } from "../../../redux-store/screen-animations/screen-animation-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux-store/redux-store";
import { avatarImageBlobUrlSelector } from '../../../redux-store/authentication/authentication-selectors';
import { ICreatePostRequest } from "../../../../backend/services/posts-services/create-post/i-create-post";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./post.module.css";
import { createPost, uploadPostImage } from "../../../service-clients/post-service-client";
import FilePicker from '../../utils/noob-file-picker';
import { IPostImageUploadResponse } from '../../../service-clients/messages/i-posts-response';

interface mediaInterface {
  contentUrl: string;
  contentType: "image" | "video";
}
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPosts: React.SetStateAction<any>;
}

export default function CreatePostInput(props: IProps): JSX.Element {
  const { setPosts } = props;
  const appDispatch = useAppDispatch();
  const userAvatar = useAppSelector(avatarImageBlobUrlSelector);
  const [isUploading, setIsUploading] = useState(false);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [media, setMedia] = useState<Array<mediaInterface>>([]);

  const [request, setRequest] = useState<ICreatePostRequest>({
    postContent: "",
    postImgUrl: "",
  });
  const [errors, setErrors] = useState<ValidationResult<ICreatePostRequest>>(
    {}
  );

  async function UploadMedia(
    file: File
  ): Promise<IPostImageUploadResponse> {
    return await uploadPostImage(file);
  }

  async function onClickCreatePost(): Promise<void> {
    const newErrors = validatePostContent(request);
    setErrors(newErrors);
    if (isThereAnyError(newErrors)) return;
    try {
      appDispatch(setIsLoading(true));

      const response = await createPost(request as ICreatePostRequest);

      if (!response.isError) {
        setPosts((prevState: []) => {
          return [response, ...prevState];
        })
        setMedia([]);
        setRequest({
          postContent: "",
          postImgUrl: "",
        });
        setErrors({});
      } else {
        setErrors(response.errors);
      }
    } finally {
      appDispatch(setIsLoading(false));
    }
  }


  const createImageThumb = async (file: MediaSource | Blob): Promise<void> => {
    setMedia(() => {
      return [
        {
          contentUrl: URL.createObjectURL(file),
          contentType: "image",
        },
      ];
    });
  };

  const handleRemovePreviewImage = (index: number): void => {
    setMedia((_) => _.filter((_, i: number) => index !== i));
    setRequest((pre) => {
      return {
        ...pre,
        postImgUrl: "",
      };
    });
  };

  return (
    <Card sx={{ my: 2, borderRadius: 3, py: 3 }}>
      <CardContent
        sx={{
          display: "flex",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Avatar alt={"user avatar"} src={userAvatar} />
        <TextField
          placeholder={`What's happening?`}
          sx={{
            "& .MuiInput-root": {
              fontWeight: 300,
            },
          }}
          fullWidth
          multiline
          autoFocus
          minRows={1}
          value={request.postContent}
          error={propsHasError(errors, "postContent")}
          helperText={getErrorForProp(errors, "postContent")}
          onChange={(event): void =>
            setRequest({ ...request, postContent: event.target.value })
          }
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />

        <FilePicker
          onFileSelected={async (files): Promise<void> => {
            if (!files) return;
            const file = files[0];
            const fileType = file.type.split("/")[0];
            setIsUploading(true);
            UploadMedia(file)
              .then((data) => {
                if (fileType === "image") {
                  createImageThumb(file);
                }
                setRequest((pre) => {
                  return {
                    ...pre,
                    postImgUrl: data.url,
                  };
                });
                setIsImgUploaded(true);
                setIsUploading(false);
              })
              .catch((error) => {
                alert(error);
              });
          }}
          // eslint-disable-next-line no-console
          onError={(): void => console.log("Error")}
          allowedExtensions={[".jpeg", ".jpg", ".png"]}
          show={showPicker}
          maxFiles={1}
          minFiles={0}
          maxFileSizeInBytes={1024 * 1204}
        />
      </CardContent>
      
      {isUploading && (
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="inherit" />
          </Box>
        </CardContent>
      )}

      <CardActions
        sx={{ display: "flex", justifyContent: "end", gap: "15px", px: 3 }}
        disableSpacing
      >
        {media.map(({ contentType, contentUrl }, i) => {
          if (isImgUploaded) {
            return (
              <Grid item style={{ position: "relative" }} key={i}>
                {contentType === "image" ? (
                  <img
                    src={contentUrl}
                    alt={"media"}
                    className={styles.previewImageStyle}
                  />
                ) : (
                  <div></div>
                )}
                <Tooltip title="Remove">
                  <IconButton
                    color="default"
                    size="small"
                    className={styles.previewImageCancel}
                    onClick={(): void => handleRemovePreviewImage(i)}
                  >
                    <CloseIcon sx={{ fontSize: "10px" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            );
          }
        })}

        <div>
          <IconButton
            color="primary"
            sx={{ bgcolor: "primary.dark", mr: 2 }}
            size="small"
            onClick={(): void => {
              setShowPicker(true);
            }}
          >
            <ImageIcon />
          </IconButton>
          <Button
            size="small"
            variant={"contained"}
            style={{
              borderRadius: 99999,
            }}
            onClick={onClickCreatePost}
          >
            Share
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
