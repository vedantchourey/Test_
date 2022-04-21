import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid } from "@mui/material";
import FormLabel from "../../ui-components/formlabel";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../ui-components/toggle-button-group";
import CardLayout from "../../ui-components/card-layout";
import * as yup from "yup";
import { useFormik } from "formik";
import AccordionAlt from "../../ui-components/accordion";
import {ReactComponent as CircleCloseIcon} from '../../../../../public/icons/close.svg';

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
}

interface PublishTournamentProps {
  onBack?: () => void;
  data?: PublishTournamentData;
  onSave?: (data: PublishTournamentData) => void;
}

const PublishPage: React.FC<PublishTournamentProps> = ({
  onBack,
  onSave,
  data,
}): JSX.Element => {
  const classes = useStyles();

  const validationSchema = yup.object({
    registration: yup.string().required("Registration field required"),
    society: yup.string().required("society field required"),
  });
  
 const formik = useFormik({
    initialValues: {
      registration: data?.registration || "published",
      society: data?.society || "private",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (onSave) {
        onSave(values);
      }
    },
  });

  React.useEffect(()=>{
    if(data){
      formik.setValues({...data});
    }
  },[data]);

  const changeHandler = (
    property: string,
    value: string | boolean | Date | null
  ): void => {
    formik.setFieldValue(property, value, true);
  };

  return (
    <React.Fragment>
      <AccordionAlt title="Publish Tournament" icon={{expanded:<CircleCloseIcon/>}}>
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
                  <NoobToggleButton value="published">Published</NoobToggleButton>
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
                <FormControlLabel
                  className={classes.checkbox}
                  control={<Checkbox style={{ marginRight: "26px" }} />}
                  label="Use Join Codes"
                />
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
