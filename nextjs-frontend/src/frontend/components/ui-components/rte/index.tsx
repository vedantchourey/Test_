import { createStyles, makeStyles } from "@mui/styles";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";

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

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
];

function sourceFun (
  searchTerm: any,
  renderItem: any,
  mentionChar: any
): any {
  renderItem([], searchTerm);
  let values: any;
  if (mentionChar === "@" || mentionChar === "#") {
    values = atValues;
  }
  if (searchTerm.length === 0) {
    renderItem(values, searchTerm);
  } else {
    const matches = [];
    for (let i = 0; i < values.length; i++)
      if (
        values[i].value
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase() ) !== -1
      )
        matches.push(values[i]);
    renderItem(matches, searchTerm);
  }
}

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
}: INoobRichTextEditor): JSX.Element => {
  const classes = useStyles();
  
  return (
    <ReactQuill
      key={"abc"}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@", "#"],
          source: sourceFun,
        },
      }}
      className={classes.root}
      value={value}
      onChange={onChange}
      style={{ borderColor: error ? "red" : "", color: "#fff" }}
    />
  );
};

export default NoobReachTextEditor;
