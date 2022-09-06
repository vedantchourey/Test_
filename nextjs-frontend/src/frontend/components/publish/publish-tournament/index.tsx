import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Chip,
  Tooltip,
} from "@mui/material";
import FormLabel from "../../ui-components/formlabel";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../ui-components/toggle-button-group";
import CardLayout from "../../ui-components/card-layout";
import * as yup from "yup";
import { useFormik } from "formik";
import AccordionAlt from "../../ui-components/accordion";
import { ReactComponent as CircleCloseIcon } from "../../../../../public/icons/close.svg";
import { useRouter } from "next/router";

const randomString = (length: number): string => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const useStyles = makeStyles(() =>
  createStyles({
    checkbox: {
      borderRadius: 12,
      border: "1px solid rgba(255, 255, 255, 0.3)",
      width: "50%",
    },
  }));

export interface PublishTournamentData {
  registration: string;
  society: string;
  joinCode: string | null;
  templateCode?: string | null;
}

interface PublishTournamentProps {
  tournamentId?: string;
  onBack?: () => void;
  data?: PublishTournamentData;
  onSave?: (data: PublishTournamentData) => void;
}

const PublishPage: React.FC<PublishTournamentProps> = ({
  tournamentId,
  onBack,
  onSave,
  data,
}): JSX.Element => {
  const classes = useStyles();
  const validationSchema = yup.object({
    registration: yup.string().required("Registration field required"),
    society: yup.string().required("society field required"),
    joinCode: yup.string().notRequired()
.nullable(),
  });
  
  const router = useRouter();
  const [isCopied, setCopied] = React.useState(false);

  console.log('data 1 -> ', data)

  const formik = useFormik({
    initialValues: {
      registration: data?.registration || "draft",
      society: data?.society || "private",
      joinCode: data?.joinCode || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (onSave) {
        onSave({ ...values, templateCode: randomString(6) });
      }
    },
  });

  console.log('formik -> ', formik)

  React.useEffect(() => {
    if (data) {
      formik.setValues({
        registration: data.registration,
        society: data.society,
        joinCode: data?.joinCode || "",
      });
    }
  }, [data]);

  const changeHandler = (
    property: string,
    value: string | boolean | Date | null
  ): void => {
    formik.setFieldValue(property, value, true);
  };

  const changeJoinCode = (isJoinViaCode: boolean): void => {
    if (isJoinViaCode) {
      const code = randomString(6);
      changeHandler("joinCode", code);
    } else {
      changeHandler("joinCode", null);
    }
  };

  const copyJoinCode = (): void => {
    navigator.clipboard.writeText(formik.values.joinCode || "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "right" }}
      >
        <Button
          variant="contained"
          onClick={(): void => {
            router.push(`/view-tournament/${tournamentId}/details`);
          }}
        >
          Preview
        </Button>
      </div>
      <AccordionAlt
        title="Publish Tournament"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <CardLayout title="Publish">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel label="Publishing this tournament will enable registration and allow player to join"></FormLabel>
                <NoobToggleButtonGroup
                  exclusive
                  value={formik.values.registration}
                  onChange={(
                    e: React.MouseEvent<Element, MouseEvent>,
                    val: string
                  ): void => changeHandler("registration", val)}
                  fullWidth
                >
                  <NoobToggleButton value="draft">Draft</NoobToggleButton>
                  <NoobToggleButton value="published">
                    Published
                  </NoobToggleButton>
                </NoobToggleButtonGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel label="Publishing this tournament will enable registration and allow player to join"></FormLabel>
                <NoobToggleButtonGroup
                  exclusive
                  value={formik.values.society}
                  onChange={(
                    e: React.MouseEvent<Element, MouseEvent>,
                    val: string
                  ): void => changeHandler("society", val)}
                  fullWidth
                >
                  <NoobToggleButton value="private">Private</NoobToggleButton>
                  <NoobToggleButton value="public">Public</NoobToggleButton>
                </NoobToggleButtonGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel label="You can control who enter your tournament with join codes."></FormLabel>
                {!formik.values.joinCode ? (
                  <FormControlLabel
                    className={classes.checkbox}
                    onChange={(e, checked): void => changeJoinCode(checked)}
                    control={<Checkbox style={{ marginRight: "26px" }} />}
                    label="Use Join Codes"
                  />
                ) : (
                  <Tooltip title={"Copied!"} open={isCopied}>
                    <Chip
                      style={{ width: "110px" }}
                      label={formik.values.joinCode}
                      onClick={copyJoinCode}
                      variant={"outlined"}
                      onDelete={(): void => changeHandler("joinCode", null)}
                    />
                  </Tooltip>
                )}
              </FormControl>
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

export default PublishPage;
