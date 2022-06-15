import { CircularProgress, Backdrop } from "@mui/material";

interface LoaderProps{
    loading:boolean
}
const Loader: React.FC<LoaderProps> = ({loading}) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
