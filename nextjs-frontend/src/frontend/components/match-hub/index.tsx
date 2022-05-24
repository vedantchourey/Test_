import { NextPage } from "next";

// Third party packages
import { Card, CardContent, Container, Typography, Grid } from "@mui/material";

// styles
import styles from "./match-hub.module.css";
import OpponentTile from "./opponent-tile/opponent-tile";
import ResultTile from "./opponent-tile/result-tile/result-tile";

interface Props{
    data :Match[];
    onMatchHub?:(match:Match) => void;
}

interface Opponent{
    firstName:string;
    id:string;
    lastName:string;
    player_elo_rating: number
    position: number
    result: string
    score?: number
    user_id?:string
    team_id?:string
    platform_id?:string
    game_id?:string
    elo_rating?:string
    name?:string
}

export interface Match {
    match_id:string;
    opponent1:Opponent;
    opponent2:Opponent;
    tournament_id:string;
    tournament_name:string;
    type:string;
}

const MatchHub: React.FC<Props> = ({data, onMatchHub}) => {
    return (
            <Container>
                <div>
                    <Typography variant="h1" className={styles.matchHubHeading} style={{margin: "40px 0"}} >Match Hub </Typography>
                </div>
                <Card variant="outlined" className={styles.matchHubContainer}>
                    <CardContent>
                        <p className={styles.matchHubDescription}>Here you can see the tournaments you have participated in and determine the results.</p>

                        <Grid container style={{marginTop: "48px"}} spacing={2}>
                            {
                                data.map((item)=>{
                                    const opponent1Name = item.opponent1.user_id?`${item.opponent1.firstName} ${item.opponent1.lastName}`: item.opponent1.name
                                    const opponent2Name = item.opponent2.user_id?`${item.opponent2.firstName} ${item.opponent2.lastName}`: item.opponent2.name
                                    return (
                                        <Grid item xs={12}>
                                            {
                                                !item.opponent1.result?(
                                                    <OpponentTile data={item} onMatchHub={onMatchHub}/>
                                                ):(
                                                    <ResultTile isWon={item.opponent1.result==="win"} opponent1Name={opponent1Name} opponent2Name={opponent2Name} />
                                                )
                                            }
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
    );
}// End of MatchHubPage


export default MatchHub;



