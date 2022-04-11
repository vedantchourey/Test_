import { createStyles, makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
// import ReachTextEditor from "mui-rte";

const ReachTextEditor = dynamic(() => import("mui-rte"), {
  ssr: false,
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: "1px solid rgba(255, 255, 255, 0.3);",
      minHeight: 100,
      borderRadius: "10px",
    },
  }));

/* eslint-disable @typescript-eslint/no-explicit-any */
const NoobReachTextEditor: React.FC<any> = (props) => {
  const classes = useStyles();
  return (
    <ReachTextEditor
      label="Type here..."
      classes={{ root: classes.root }}
      {...props}
    />
  );
};

export default NoobReachTextEditor;
