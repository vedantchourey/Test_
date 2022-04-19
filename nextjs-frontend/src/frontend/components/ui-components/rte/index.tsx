import { createStyles, makeStyles, styled } from "@mui/styles";
import dynamic from "next/dynamic";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

const myTheme = createTheme({
  // Set up your custom MUI theme here
});

const ReachTextEditor = dynamic(() => import("mui-rte"), {
  ssr: false,
});

const NoobReachTextEditorAlt = styled(ReachTextEditor)(() => ({
  background: "red",
}));

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: "1px solid rgba(255, 255, 255, 0.3);",
      minHeight: 100,
      borderRadius: "10px",
    },
    editor: {
      padding: 10,
      paddingLeft: 40
    }
  })
);

/* eslint-disable @typescript-eslint/no-explicit-any */
const NoobReachTextEditor: React.FC<any> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={myTheme}>
      <ReachTextEditor classes={{root:classes.root, editor: classes.editor}} {...props}/>
    </ThemeProvider>
  );
};

export default NoobReachTextEditor;
