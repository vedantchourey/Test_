import React from "react";
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Theme
} from "@mui/material";
import FormLabel from "../../ui-components/formlabel";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../ui-components/toggle-button-group";
import CardLayout from "../../ui-components/card-layout";


const useStyles = makeStyles((theme: Theme) =>
createStyles({
    checkbox: {
      borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.3)",
      width: "50%"
    }
  })
);

const PublishPage  = ()=> {
    const [data, setData] = React.useState('published');
    const classes  = useStyles();

const changeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newData: string,
  ): void => {
    setData(newData);
  }


const theme = createTheme();

  return (
    <React.Fragment>
      <CardLayout title="Publish">
        <Grid container rowSpacing={1} columnSpacing={5}>
        <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel label="Publishing this tournament will enable registration and allow player to join"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data}
                onChange={changeHandler}
                fullWidth
              >
                <NoobToggleButton value="draft">
                  Draft
                </NoobToggleButton>
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
                value={data}
                onChange={changeHandler}
                fullWidth
              >
                <NoobToggleButton value="private">
                  Private
                </NoobToggleButton>
                <NoobToggleButton value="public">
                  Public
                </NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="You can control who enter your tournament with join codes."></FormLabel>
              <FormControlLabel className={classes.checkbox} control={<Checkbox style={{marginRight:"26px"}}/>} label="Use Join Codes" />
              </FormControl>

        </Grid>
        </Grid>
        </CardLayout>
    </React.Fragment>
  );
};

export default PublishPage;
