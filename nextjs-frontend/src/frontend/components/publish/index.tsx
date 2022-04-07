import { Button } from "@mui/material";
import React from "react";
import {  TournamentData } from "../tournament";
import NavTabs from "../ui-components/navtabs";
import PublishTournament from "./publish-tournament";
import {ReactComponent as CircleCloseIcon} from '../../../../public/icons/close.svg';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccordionAlt from "../ui-components/accordion";
import { Box } from "@mui/system";



const useStyles = makeStyles(() =>
createStyles({
    icon: {
      borderRadius:"50%",
    border: "1px solid rgba(255, 255, 255, 0.3)"

    }
  })
);

const theme = createTheme();

export interface PublishProps{
  onSubmit? : (data: TournamentData) => void
}

const Publish:React.FC<PublishProps> = ({onSubmit}): JSX.Element => {
//   const tabs = ["Publish Tournament"];
  const [current, setCurrent] = React.useState(0);
  const classes  = useStyles();


  const renderComponent = (newCurrent: number): JSX.Element | null => {
    switch (newCurrent) {
    case 0:
      return <PublishTournament/>;
    default:
      return null;
    }
  };

  const action = <Button variant="contained" style={{height:"35px", width:"35px"}} className={classes.icon}><CircleCloseIcon  /></Button>;
  return (
      <React.Fragment>
      <AccordionAlt title="Publish Tournament">
          <PublishTournament />
    {/* <React.Fragment>
      <NavTabs
        // items={tabs}
        action={action}
        current={current}
        onClick={setCurrent}
      ></NavTabs>
      {renderComponent(current)}
    </React.Fragment> */}
    </AccordionAlt>
    <Box display="flex" justifyContent={"space-between"}>
    <Button
      variant="contained"
    //   onClick={onBack}
      startIcon={<img src="/icons/lessthan.svg" />}
    >
      Previous
    </Button>
    <Button
      variant="contained"
    //   onClick={formik.submitForm}
      endIcon={<img src="/icons/greater.svg" />}
    >
      Next
    </Button>
  </Box>
  </React.Fragment>
  );
};

export default Publish;
