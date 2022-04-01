import React from 'react';
import { createStyles, makeStyles } from "@mui/styles";


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
    <label className={classes.root} htmlFor={htmlFor}>
      {label}
    </label>
  );
};

  
export default FormLabel;