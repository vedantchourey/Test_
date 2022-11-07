import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
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
  isThereAnyError,
  ValidationResult,
} from "../../../../common/utils/validation/validator";
import { setIsLoading } from "../../../redux-store/screen-animations/screen-animation-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux-store/redux-store";
import { avatarImageBlobUrlSelector } from "../../../redux-store/authentication/authentication-selectors";
import { ICreatePostRequest } from "../../../../backend/services/posts-services/create-post/i-create-post";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./post.module.css";
import {
  createPost,
  uploadPostImage,
} from "../../../service-clients/post-service-client";
import FilePicker from "../../utils/noob-file-picker";
import { IPostImageUploadResponse } from "../../../service-clients/messages/i-posts-response";
import { searchPeopleByText } from "../../../service-clients/search-service-client";
import { MentionsInput, Mention } from "react-mentions";
import { frontendSupabase } from "../../../services/supabase-frontend-service";

interface mediaInterface {
  contentUrl: string;
  contentType: "image" | "video";
}
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPosts: React.SetStateAction<any>;
}

interface ICreatePostRequestFrontend extends ICreatePostRequest {
  postContentText: string;
}

export default function CreatePostInput(props: IProps): JSX.Element {
  const { setPosts } = props;
  const appDispatch = useAppDispatch();
  const userAvatar = useAppSelector(avatarImageBlobUrlSelector);
  const [isUploading, setIsUploading] = useState(false);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [media, setMedia] = useState<Array<mediaInterface>>([]);

  const [request, setRequest] = useState<ICreatePostRequestFrontend>({
    postContentText: "",
    postContent: "",
    postImgUrl: "",
  });
  const [errors, setErrors] = useState<ValidationResult<ICreatePostRequest>>(
    {}
  );

  console.error(errors);

  async function UploadMedia(file: File): Promise<IPostImageUploadResponse> {
    return await uploadPostImage(file);
  }

  const fetchUsers = async (query: any, callback: any): Promise<any> => {
    const response = await searchPeopleByText({ search: query.toLowerCase() });
    callback(
      response
        .map((i) => ({
          id: i.username,
          display: i.username,
          avatarUrl: i.avatarUrl
            ? (frontendSupabase.storage
                .from("public-files")
                .getPublicUrl(i.avatarUrl).publicURL as string)
            : undefined,
        }))
        .filter((i) => i.display.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 3)
    );
  };

  async function onClickCreatePost(): Promise<void> {
    const newErrors = validatePostContent(request);
    setErrors(newErrors);
    if (isThereAnyError(newErrors)) return;
    try {
      appDispatch(setIsLoading(true));

      const updateRequest: ICreatePostRequest = {
        postContent: request.postContentText.replace(/~/g, ""),
        postImgUrl: request.postImgUrl,
      };

      const response = await createPost(updateRequest as ICreatePostRequest);

      if (!response.isError) {
        setPosts((prevState: []) => {
          return [response, ...prevState];
        });
        setMedia([]);
        setRequest({
          postContent: "",
          postImgUrl: "",
          postContentText: "",
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
        <MentionsInput
          value={request.postContent}
          onChange={(e): any => {
            setRequest({
              ...request,
              postContent: e.target.value,
              postContentText: e.target.value,
            });
          }}
          // style={style}
          style={{
            input: {
              color: "#fff",
              border: 0,
              letterSpacing: 0,
              lineHeight: 1.5,
            },
            suggestions: {
              list: {
                backgroundColor: "#0f0526",
                border: "1px solid rgba(0,0,0,0.15)",
                // borderRadius: 5,
                fontSize: 14,
              },
              item: {
                padding: "5px 15px",
                borderBottom: "1px solid rgba(0,0,0,0.15)",
                borderRadius: 5,
                "&focused": {
                  backgroundColor: "rgba(255,255,255, 0.1)",
                },
              },
            },
            flex: 1,
            border: 0,
          }}
          placeholder={"What's happening?"}
        >
          <Mention
            markup="@~__display__~"
            displayTransform={(username): any => `@${username}`}
            trigger="@"
            data={fetchUsers}
            renderSuggestion={(
              suggestion: any,
              search,
              highlightedDisplay
            ): any => (
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  src={suggestion.avatarUrl}
                  style={{ height: 20, width: 20, marginRight: 5 }}
                />
                <div className="user">{highlightedDisplay}</div>
              </Box>
            )}
            style={{ backgroundColor: "#6931F9" }}
          />
        </MentionsInput>

        <FilePicker
          onFileSelected={async (files): Promise<void> => {
            if (!files) return;
            const file = files[0];
            const fileType = file.type.split("/")[0];
            setIsUploading(true);
            try {
              const response = await UploadMedia(file);
              if (response) {
                if (fileType === "image") await createImageThumb(file);
                setRequest((pre) => {
                  return {
                    ...pre,
                    postImgUrl: response.url,
                  }
                })
                setIsImgUploaded(true);
                setIsUploading(false);
              }
            } catch(error) {
              console.error("Error: ", error);
            }
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
              setTimeout(() => {
                setShowPicker(false);
              }, 500);
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
