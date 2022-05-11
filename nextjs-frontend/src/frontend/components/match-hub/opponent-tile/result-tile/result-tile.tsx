import Image from "next/image";

// Third party packages
import { Button, Grid, Container } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// styles
import styles from "./result-tile.module.css";

interface ResultTileProps {
    isWon?: boolean
}

const ResultTile: React.FC<ResultTileProps> = (props) => {

    const { isWon } = props;

    return (
        <Grid container className={styles.resultTileContainer}>
            <Grid item xs={3}>
                <Button variant="outlined" className={styles.resultTileButton} style={{marginRight: "16px"}}>
                    <Image src="/images/legand-club.png" width={32} height={32} />
                    <span style={{marginLeft: "16px"}} className={styles.resultTileValue}>Legend Club</span>
                </Button>
            </Grid>

            {/* Result status */}
            <Grid item xs={6}>
                <p className={styles.resultTileValue}>ENDPOINTGG VS CEX ESPORTS [2]</p>
                <p className={styles.resultTileStatus} style={{color: isWon ? "green" : "red"}}>{isWon? "WON" : "LOST"}</p>
                <Container style={{display: "flex", justifyContent: "center"}}>
                    <Button className={styles.resultTileButton}>
                        View Result 
                        <ArrowForwardIcon />
                    </Button>
                </Container>
            </Grid>

            <Grid item xs={3} style={{display: "flex", justifyContent: "end"}}>
                <Button variant="outlined" className={styles.resultTileButton} style={{marginRight: "16px"}}>
                    <span style={{marginRight: "16px"}} className={styles.resultTileValue}>Legend Club</span>
                    <Image src="/images/legand-club.png" width={32} height={32} />
                </Button>
            </Grid>
        </Grid>
    );
}// End of ResultTile component


export default ResultTile;