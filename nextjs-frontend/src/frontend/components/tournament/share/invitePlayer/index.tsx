import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { ReactComponent as CircleCloseIcon } from "../../../../../../public/icons/close.svg";
import { ReactComponent as FacebookIcon } from "../../../../../../public/icons/FacebookIcon.svg";
import { ReactComponent as RedditIcon } from "../../../../../../public/icons/RedditIcon.svg";
import { ReactComponent as TwitterIcon } from "../../../../../../public/icons/TwitterIcon.svg";

import AccordionAlt from "../../../ui-components/accordion";
import { ReactComponent as CopyIcon } from "../../../../../../public/icons/CopyIcon.svg";
import * as yup from "yup";
import {
  useFormik,
} from "formik";
import { useRouter } from "next/router";
import { TournamentContext } from "../..";
import CardLayout from "../../../ui-components/card-layout";
import FormLabel from "../../../ui-components/formlabel";


export interface InvitePlayerData {
  url: string;
}

const InvitePlayer: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { data, setData } = React.useContext(TournamentContext);

  const validationSchema = yup.object({
    url: yup.string().required("URL field required"),
  });

  const formik = useFormik({
    initialValues: {
      url: data?.invitePlayer?.url || "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setData({ ...data, invitePlayer: values });
    }
  });

  const onBack = (): void => {
    router.push(`/tournament/[...slug]`, `/tournament/create/publish`, {
      shallow: true,
    });
  };

  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(formik.values.url);

    setCopySuccess("Copied!");
  };

  return (
    <React.Fragment>
      <AccordionAlt
        title="Invite Players (Optional)"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <CardLayout title="Invite Players">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel label="Help Players find your tournament by sharing this link with them."></FormLabel>
                <FormHelperText>Invite Link </FormHelperText>
                <FormControl fullWidth variant="standard">
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={copyToClipboard}>
                          <CopyIcon />
                        </Button>
                        {copySuccess}
                      </InputAdornment>
                    }
                    id="url"
                    placeholder="http://battelfy.com/demo/section"
                    onChange={formik.handleChange}
                    value={formik.values.url}
                    onBlur={formik.handleBlur}
                    error={formik.touched.url && Boolean(formik.errors.url)}
                  />
                  {formik.touched.url && Boolean(formik.errors.url) ? (
                    <FormHelperText> {formik.errors.url} </FormHelperText>
                  ) : null}
                </FormControl>
              </FormControl>
              <Box>
                <FacebookIcon style={{ marginRight: "5px" }} />
                <RedditIcon style={{ marginRight: "5px" }} />
                <TwitterIcon style={{ marginRight: "5px" }} />
              </Box>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <Box display="flex" justifyContent={"space-between"}>
        <Button
          variant="contained"
          onClick={onBack}
          startIcon={<img src="/icons/lessthan.svg" />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          endIcon={<img src="/icons/greater.svg" />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default InvitePlayer;
