import Image from "next/image";

// Third party packages
import { Button, Grid } from "@mui/material";

// styles
import styles from "./opponent-tile.module.css"

const OpponentTile: React.FC = () => {
    return (
        <Grid container className={styles.opponentTileContainer}>
            <Grid item xs={2}>
                <p className={styles.opponentTileTitle}>Opponent:</p>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Image src="/images/legand-club.png" width={32} height={32} />
                    <span style={{marginLeft: "8px"}} className={styles.opponentTileValue}>Legend Club</span>
                </div>
            </Grid>
            <Grid item xs={3}>
                <p className={styles.opponentTileTitle}>Tournament name</p>
                <p className={styles.opponentTileValue}>ENDPOINTGG VS CEX ESPORTS [2]</p>
            </Grid>
            <Grid item xs={3}>
                <p>
                    <span className={styles.opponentTileTitle}>Round starts in:</span>
                    <span className={styles.opponentTileValue} style={{marginLeft: "24px"}}>00:15:45</span>
                </p>
                <p>
                    <span className={styles.opponentTileTitle}>Chech starts in::</span>
                    <span className={styles.opponentTileValue} style={{marginLeft: "24px"}}>00:18:45</span>
                </p>
            </Grid>
            <Grid item xs={4}>
                <Button variant="outlined" className={styles.opponentTileButton} style={{marginRight: "16px"}}>Match Hub</Button>
                <Button variant="contained" className={styles.opponentTileButton}>View Tournament</Button>
            </Grid>
        </Grid>
    );
}// End of OpponentTile component


export default OpponentTile;