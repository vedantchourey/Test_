import { useState, useRef } from 'react'
import { Button, Card, CardActions, CardContent, TextField, IconButton, Avatar, ImageListItem, ImageList, Box } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch } from 'react-redux';
import { validatePostContent } from './validator'
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { useAppDispatch } from '../../../redux-store/redux-store';
import { ICreatePostRequest } from '../../../../backend/services/posts-services/create-post/i-create-post';

export default function CreatePostInput() {

    const appDispatch = useAppDispatch()

    const [media, setMedia] = useState([])
    const [request, setRequest] = useState<Partial<ICreatePostRequest>>({
        postContent: '',
        postImgUrl: ''
    })
    const [errors, setErrors] = useState<ValidationResult<ICreatePostRequest>>({})

    const imageInputRef = useRef()

    async function onClickCreatePost() {
        console.log(media)
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
            if (response.isError) {
                setErrors(response.errors);
            } else {
                setErrors({});
                // onCreated();
            }
        } finally {
            // appDispatch(setIsLoading(false));
        }
    }

    return (
        <Card>
            <CardContent sx={{
                display: "flex",
                gap: "10px",
                padding: "20px"
            }}>
                <Avatar alt={"user avatar"} src={""} />
                <TextField
                    placeholder={`What's happening?`}
                    fullWidth
                    multiline
                    autoFocus
                    minRows={3}
                    value={request.postContent}
                    error={propsHasError(errors, 'postContent')}
                    helperText={getErrorForProp(errors, 'postContent')}
                    onChange={event => setRequest({ ...request, postContent: event.target.value })}
                    variant='standard'
                    InputProps={{
                        disableUnderline: true
                    }}
                />
                <input type="file" ref={imageInputRef} multiple accept='image/*;video/*;' hidden onChange={e => setMedia(e.target.files)} />
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "end", gap: '15px' }} disableSpacing>
                <IconButton color='primary' sx={{ bgcolor: 'primary.dark' }} size='small' onClick={() => imageInputRef.current.click()}>
                    <ImageIcon />
                </IconButton>
                <Button size="small" variant={"contained"} style={{
                    borderRadius: 99999
                }} onClick={onClickCreatePost}>Share</Button>
            </CardActions>
        </Card>
    )
}