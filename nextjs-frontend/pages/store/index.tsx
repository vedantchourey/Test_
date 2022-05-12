import { Fragment } from 'react';
import { Container, Grid } from '@mui/material';
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import NoobPage from '../../src/frontend/components/page/noob-page';
import Store from '../../src/frontend/components/store/store';

const StoreIndex = (): JSX.Element => {

  return (
    <NoobPage title="Store" metaData={{ description: "Noob Storm Store page" }}>
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"STORE"} />
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
            </Grid>
            <Grid item xs={12} lg={9} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
							<Store />
							<Store />
							<Store />
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    </NoobPage>
  )
}

export default StoreIndex