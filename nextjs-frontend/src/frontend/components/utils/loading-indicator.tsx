import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useAppSelector } from '../../redux-store/redux-store';
import { isLoadingSelector } from '../../redux-store/screen-animations/screen-animations-selectors';

export function LoadingIndicator(): JSX.Element {
  const isLoading = useAppSelector(isLoadingSelector);
  return (
    <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={isLoading}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  )
}
