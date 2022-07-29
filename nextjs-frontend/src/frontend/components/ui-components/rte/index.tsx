import { createStyles, makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";

const myTheme = createTheme({
  // Set up your custom MUI theme here
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: "1px solid rgba(255, 255, 255, 0.3);",
      minHeight: 100,
      borderRadius: "10px",
    },
    editor: {
      padding: 10,
      paddingLeft: 40,
    },
  }));
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface INoobRichTextEditor {
  onChange: (val: string) => void;
  value?: string;
  error?: boolean;
  name?: string;
  id?: string;
  modules?: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const NoobReachTextEditor = ({
  onChange,
  value = "",
  error = false,
  ...restProps
}: INoobRichTextEditor): JSX.Element => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={myTheme}>
      <ReactQuill
        {...restProps}
        // modules={modules}
        className={classes.root}
        value={value}
        onChange={onChange}
        style={{ borderColor: error ? "red" : "", color: "#fff" }}
      />
    </ThemeProvider>
  );
};

export default NoobReachTextEditor;
