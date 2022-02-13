import { useState, useRef } from 'react'
import { Button, Card, CardActions, CardContent, TextField, IconButton, Avatar, Grid, Tooltip, Paper, CircularProgress, Box } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { validatePostContent } from './validator'
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { useAppDispatch, useAppSelector } from '../../../redux-store/redux-store';
import { ICreatePostRequest } from '../../../../backend/services/posts-services/create-post/i-create-post';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./post.module.css"
import { v4 } from 'uuid';
import { uploadImage } from '../../../service-clients/image-service-client';

interface mediaInterface {
  contentUrl: string,
  contentType: 'image' | 'video'
}

export default function CreatePostInput() {

  const appDispatch = useAppDispatch()
  const userProfile = useAppSelector((state) => state.authentication.userProfile)
  const [isUploading, setIsUploading] = useState(false);

  const [media, setMedia] = useState<Array<mediaInterface>>([])

  const [request, setRequest] = useState<Partial<ICreatePostRequest>>({
    postContent: '',
    postImgUrl: ''
  })
  const [errors, setErrors] = useState<ValidationResult<ICreatePostRequest>>({})

  const imageInputRef = useRef()


  function generateFileUrl(prefix: string, file: File) {
    if (userProfile == null) throw new Error('user cannot be null');
    const fileExt = file.name
      .split('.')
      .pop()
      ?.toLowerCase();
    return `resources/${prefix}${userProfile.id}${v4()}.${fileExt}`;
  }

  async function UploadMedia(file: File): Promise<{ data: { Key: string } | null; error: Error | null }> {
    const CustomfileUrl = generateFileUrl('post-image', file)
    return await uploadImage('resources', CustomfileUrl, file);
  }

  async function onClickCreatePost() {

    const newErrors = validatePostContent(request);
    setErrors(newErrors);
    if (isThereAnyError(newErrors)) return;
    try {
      appDispatch(setIsLoading(true));
      console.log(request)
      // const response = await create(request as CreateOrEditTournamentRequest);
      const response = {
        isError: false,
        errors: {}
      }
      if (!response.isError) {
        setMedia([])
        setRequest({
          postContent: '',
          postImgUrl: ''
        })
        setErrors({});
      } else {
        setErrors(response.errors);
      }
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  const createVideoThumb = async (file: any) => {
    const blob = URL.createObjectURL(file);
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    video.src = blob;

    /* Load Video to generate thumbnail */
    video.load();
    video.onloadeddata = async function () {
      video.muted = true
      await video.play();
      setMedia((pre) => {
        return [
          ...pre,
          {
            contentUrl: blob,
            contentType: 'video'
          }
        ]
      })
    }

    return new Promise((resolve, reject) => {
      /* Create thumbnail after video is played */
      setTimeout(async () => {
        canvas.width = video.videoWidth / 2;
        canvas.height = video.videoHeight / 2;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
        canvas.toBlob((blob) => {
          if (blob) {
            const preview = URL.createObjectURL(blob);
            const fileName = 'image.jpeg';
            const file = new File([blob], fileName, {
              type: 'image/jpeg'
            });
            resolve({ preview: preview, videoThumbnail: file });
          }
        }, 'image/jpeg');
      }, 500);
    })

  }

  const createImageThumb = async (file: any) => {
    setMedia((pre) => {
      return [
        ...pre,
        {
          contentUrl: URL.createObjectURL(file),
          contentType: 'image'
        }
      ]
    })
  }

  const handleRemovePreviewImage = (index: number) => {
    setMedia((_) => _.filter((_, i: number) => index !== i))
    setRequest((pre) => {
      return {
        ...pre,
        postImgUrl: ''
      }
    })
  }

  return (
    <Card sx={{ my: 2, borderRadius: 3, py: 3 }}>
      <CardContent sx={{
        display: "flex",
        gap: "20px",
        padding: "20px"
      }}>
        <Avatar alt={"user avatar"} src={userProfile?.avatarUrl} />
        <TextField
          placeholder={`What's happening?`}
          fullWidth
          multiline
          autoFocus
          minRows={3}
          value={request.postContent}
          error={propsHasError(errors, 'postContent')}
          helperText={getErrorForProp(errors, 'postContent')}
          onChange={(event) => setRequest({ ...request, postContent: event.target.value })}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
        />
        <input type="file" ref={imageInputRef} multiple accept='image/*;video/*;' value='' hidden onChange={(event: InputEvent) => {
          const { files }: any = event.target

          // validating the input file
          for (let index = 0; index < files?.length; index++) {
            const file = files?.item(index);
            const fileType = file.type.split("/")[0]
            if (!['video', 'image'].includes(fileType)) {
              alert("Only video and image files are allowed to post")
              return
            }
          }

          if (files && (files.length + media.length) > 1) {
            alert("Only 1 media file is allowed with a post")
            return
          }
          if (files?.length >= 0) {
            for (let index = 0; index < files?.length; index++) {
              const file = files?.item(index);
              const fileType = file.type.split("/")[0]
              setIsUploading(true)
              UploadMedia(file)
                .then(({ data: { Key } }) => {
                  console.log("this is key", Key)
                  if (fileType === 'video') {
                    createVideoThumb(file)
                  }

                  if (fileType === 'image') {
                    createImageThumb(file)
                  }

                  setRequest((pre) => {
                    return {
                      ...pre,
                      postImgUrl: Key
                    }
                  })
                })
                .catch((error) => {
                  alert(error)
                })
                .finally(() => {
                  setIsUploading(false)
                })
            }
          }
        }} />
      </CardContent>

      <CardContent>

        {isUploading && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" />
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "end", gap: '15px', px: 3 }} disableSpacing>
        {media.map(({ contentType, contentUrl }, i) => (
          <Grid item style={{ position: 'relative' }} key={i}>
            {contentType === 'image' ? (
              <img
                src={contentUrl}
                alt={'media'}
                className={styles.previewImageStyle}
              />
            ) : (
              <div></div>
            )}
            <Tooltip title="Remove">
              <IconButton color='default' size='small' className={styles.previewImageCancel} onClick={() => handleRemovePreviewImage(i)}>
                <CloseIcon sx={{ fontSize: '10px' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        ))}

        <div>
          <IconButton color='primary' sx={{ bgcolor: 'primary.dark', mr: 2 }} size='small' onClick={() => imageInputRef.current.click()}>
            <ImageIcon />
          </IconButton>
          <Button size="small" variant={"contained"} style={{
            borderRadius: 99999
          }} onClick={onClickCreatePost}>Share</Button>
        </div>

      </CardActions>
    </Card>
  )
}