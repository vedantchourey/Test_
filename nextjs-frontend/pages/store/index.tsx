import { Fragment } from 'react';
import { Container, Grid, Box, Typography, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import NoobPage from '../../src/frontend/components/page/noob-page';
import Product from '../../src/frontend/components/product/product';
import styles from "./store-sidebar.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';

const StoreIndex = (): JSX.Element => {

  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

  return (
    <NoobPage title="Store" metaData={{ description: "Noob Storm Store page" }}>
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"STORE"} />
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>

              {isDesktop && <div className={styles.sidebarContainer}>
                <Typography className={styles.text}>Categories</Typography>
                <Button variant="text" className={styles.button}>Headsets</Button>
                <Button variant="text" className={styles.button}>Mice</Button>
                <Button variant="text" className={styles.button}>PC Components</Button>
                <Button variant="text" className={styles.button}>Keyboards</Button>
                <Button variant="text" className={styles.button}>Monitors</Button>
                <Button variant="text" className={styles.button}>Networking</Button>
                <Button variant="text" className={styles.button}>Gaming Accessories</Button>
                <Button variant="text" className={styles.button}>Laptops</Button>
                <span className={styles.border}></span>
                <Typography className={styles.text}>Platform</Typography>
                <Box className={styles.searchBar}>
                  <TextField style={{ marginTop: '15px' }} placeholder="Search" variant="standard" InputProps={{ disableUnderline: true }} />
                  <SearchIcon color="primary" />
                </Box>
                <div className={styles.inputRow}>
                  <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>IPad</Typography>} />
                  <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>Nintendo switch</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>PC</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>PlayStation 4</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>PlayStation 5</Typography>}/>
                  <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>Xbox one</Typography>}/>
                </div>
              </div>}

              {!isDesktop && <Accordion className={styles.mainAccordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={styles.text}>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetail}>
                  <Button variant="text" className={styles.button}>Headsets</Button>
                  <Button variant="text" className={styles.button}>Mice</Button>
                  <Button variant="text" className={styles.button}>PC Components</Button>
                  <Button variant="text" className={styles.button}>Keyboards</Button>
                  <Button variant="text" className={styles.button}>Monitors</Button>
                  <Button variant="text" className={styles.button}>Networking</Button>
                  <Button variant="text" className={styles.button}>Gaming Accessories</Button>
                  <Button variant="text" className={styles.button}>Laptops</Button>
                  <Box style={{ display: 'flex' }}>
                    <span className={styles.border}></span>
                  </Box>              
                  <Typography className={styles.text}>Platform</Typography>
                  <Box className={styles.searchBar}>
                    <TextField style={{ marginTop: '15px' }} placeholder="Search" variant="standard" InputProps={{ disableUnderline: true }} />
                    <SearchIcon color="primary" />
                  </Box>
                  <div className={styles.inputRow}>
                    <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>IPad</Typography>} />
                    <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>Nintendo switch</Typography>}/>
                    <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>PC</Typography>}/>
                    <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>PlayStation 4</Typography>}/>
                    <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>PlayStation 5</Typography>}/>
                    <FormControlLabel control={<Checkbox />} label={<Typography className={styles.button}>Xbox one</Typography>}/>
                  </div>
                </AccordionDetails>
              </Accordion>}
            </Grid>
            {isDesktop && 
              <Grid item xs={12} lg={9} className={styles.containerDesktop}>
                <Product img="/images/card.gif" name="250 NoobStorm Credits" description="Use credits for join tournaments and play with other games." price="9.99" />
                <Product img="/images/card.gif" name="250 NoobStorm Credits" description="Use credits for join tournaments and play with other games." price="9.99" />
                <Product img="/images/card.gif" name="250 NoobStorm Credits" description="Use credits for join tournaments and play with other games." price="9.99" />
              </Grid>
            }
            {!isDesktop && 
              <Grid item xs={12} lg={9} className={styles.containerMobile}>
                <Product img="/images/card.gif" name="250 NoobStorm Credits" description="Use credits for join tournaments and play with other games." price="9.99" />
                <Product img="/images/card.gif" name="250 NoobStorm Credits" description="Use credits for join tournaments and play with other games." price="9.99" />
                <Product img="/images/card.gif" name="250 NoobStorm Credits" description="Use credits for join tournaments and play with other games." price="9.99" />
              </Grid>
            }
          </Grid>
        </Container>
      </Fragment>
    </NoobPage>
  )
}

export default StoreIndex