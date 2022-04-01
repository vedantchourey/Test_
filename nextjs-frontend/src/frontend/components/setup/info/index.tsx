import React from "react";
import AccordionAlt from "../../ui-components/accordion";
import CardLayout from "../../ui-components/card-layout";
import NoobReachTextEditor from "../../ui-components/rte";
import {
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const Info = ():JSX.Element => {
  const [data, setData] = React.useState({ contactOption: "" });

  const changeHandler = (key: string, value: string):void => {
    setData({ ...data, [key]: value });
  };

  return (
    <CardLayout title="How Will Your Players Contact You">
      <Grid container columnSpacing={5}>
        <Grid item sm={data.contactOption !== "" ? 6 : 12}>
          <FormControl style={{ width: "100%" }}>
            <Select
              displayEmpty
              defaultValue={""}
              onChange={(e):void => changeHandler("contactOption", e.target.value)}
            >
              <MenuItem value="">Select Contact Option</MenuItem>
              <MenuItem value="FaceBook">FaceBook</MenuItem>
              <MenuItem value="Google">Google</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {data.contactOption !== "" ? (
          <Grid item sm={6}>
            <FormControl fullWidth variant="standard">
              <OutlinedInput placeholder="Enter your url" />
            </FormControl>
          </Grid>
        ) : null}
      </Grid>

      <AccordionAlt title="Contact Details">
        <NoobReachTextEditor />
      </AccordionAlt>
      <AccordionAlt title="Rules">
        <NoobReachTextEditor />
      </AccordionAlt>
      <AccordionAlt title="Prizes">
        <NoobReachTextEditor />
      </AccordionAlt>
      <AccordionAlt title="Schedule">
        <NoobReachTextEditor />
      </AccordionAlt>
    </CardLayout>
  );
};

export default Info;
