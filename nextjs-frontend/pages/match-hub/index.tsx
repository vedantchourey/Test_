import { NextPage } from "next";

// Third party packages
import { Card, CardContent, Container, Typography, Grid } from "@mui/material";

// components
import NoobPage from "../../src/frontend/components/page/noob-page";

// styles
import styles from "./match-hub.module.css";
import OpponentTile from "../../src/frontend/components/match-hub/opponent-tile/opponent-tile";
import ResultTile from "../../src/frontend/components/match-hub/opponent-tile/result-tile/result-tile";


const MatchHubPage: NextPage = (props) => {
    return (
        <NoobPage  
            title="Match hub"
            metaData={{
                description: "Match hub"
            }}
            >
            <Container>
                <div>
                    <Typography variant="h1" className={styles.matchHubHeading} style={{margin: "40px 0"}} >Match Hub </Typography>
                </div>
                <Card variant="outlined" className={styles.matchHubContainer}>
                    <CardContent>
                        <p className={styles.matchHubDescription}>Here you can see the tournaments you have participated in and determine the results.</p>

                        <Grid container style={{marginTop: "48px"}} spacing={2}>
                            <Grid item xs={12}>
                                <OpponentTile />
                            </Grid>
                            <Grid item xs={12}>
                                <OpponentTile />
                            </Grid>

                            <Grid item xs={12}>
                                <ResultTile isWon={true} />
                            </Grid>
                            <Grid item xs={12}>
                                <ResultTile />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </NoobPage>
    );
}// End of MatchHubPage


export default MatchHubPage;