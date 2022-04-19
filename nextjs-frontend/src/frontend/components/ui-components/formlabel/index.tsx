import React from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import {FormLabel as MuiLabel} from '@mui/material'


const useFormLabelStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "5px 0px 18px 0px",
      minHeight: "18px",
    },
  }));

interface FormLabelProp {
    label: string;
    htmlFor?: string;
  }
  


const FormLabel: React.FC<FormLabelProp> = ({ label, htmlFor }) => {
  const classes = useFormLabelStyles();
  return (
    <MuiLabel className={classes.root} style={{textAlign: "left"}} htmlFor={htmlFor}>
      {label}
    </MuiLabel>
  );
};

  
export default FormLabel;