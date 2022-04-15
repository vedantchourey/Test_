import { createStyles, makeStyles } from "@mui/styles";
import Editor from 'material-ui-editor'

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
    <Editor
      label="Type here..."
      classes={{ root: classes.root }}
      {...props}
    />
  );
};

export default NoobReachTextEditor;
