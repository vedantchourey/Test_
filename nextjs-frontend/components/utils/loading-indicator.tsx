import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useAppSelector } from '../../store/redux-store';
import { isLoadingSelector } from '../../store/screen-animations/screen-animations-selectors';

export function LoadingIndicator() {
  const isLoading = useAppSelector(isLoadingSelector);
  return (
    <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
              open={isLoading}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  )
}
