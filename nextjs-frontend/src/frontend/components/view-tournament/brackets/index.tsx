import { Box, Grid, Typography } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles";
import React from "react"

const useRoundStatusStyles = makeStyles(() =>
  createStyles({
    statusContainer: {
      display:"flex",
      padding:"5px 5px 5px 32px",
      border: "2px solid #6931F9",
      justifyContent:"space-between",
      borderRadius:"12px",
      alignItems:"center"
    },
    status:{
        background:"#6931F9",
        color:"white",
        borderRadius:"7px",
        padding:"10px 18px"
    },
    typeContainer:{
        height:130,
        background:"linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),url('/images/status-background.png')",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"12px",
    },
    type:{
        width:"90%",
        height:42,
        borderRadius:"12px",
        backgroundColor:"#0F0526",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
  }));

const RoundStatus:React.FC<RoundStatusData> = ({round, isFinished,type,startDate,startTime}) =>{
    const styles = useRoundStatusStyles();
    const getRoundStatus = ():string=>{
        if(isFinished){
            return "Finished"
        }
        return `${startDate} ${startTime}`;
    }
    return(
        <Box>
            <Box className={styles.statusContainer}>
                <Typography color={"white"}>Round {round}</Typography>
                <Box className={styles.status}>{getRoundStatus()}</Box>
            </Box>
            <Box marginTop={2} className={styles.typeContainer}>
                <Box className={styles.type}>
                    <Typography color={"white"} textTransform={"uppercase"}>
                        {type}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export interface RoundStatusData{
    type:string
    round:number
    isFinished:boolean
    startDate?:string
    startTime?:string
}

export interface BracketProps {
    rounds?:RoundStatusData[]
}


const Bracket:React.FC<BracketProps> = ({rounds=[]}) =>{
    const renderStatus = ():JSX.Element[] =>{
        return rounds.map((round)=>{
            return (
                <Grid key={round.round} item md={3}>
                    <RoundStatus {...round}/>
                </Grid>
            )
        })
    }
    return(
      <>
        <Box marginX={"70px"} marginY={2} >
            <Grid container columnSpacing={2} rowSpacing={1}>
                {renderStatus()}
            </Grid>   
        </Box>
        <Box marginX={"70px"} marginY={2} >
          <Grid container columnSpacing={2} rowSpacing={1}>
            <div className="bracket">
              <section className="round quarterfinals">
              <div className="winners">
                <div className="matchups">
                  <div className="matchup">
                    <div className="participants">
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                  <div className="matchup">
                    <div className="participants">
                    <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="connector">
                  <div className="merger"></div>
                  <div className="line"></div>
                </div>
              </div>
              <div className="winners">
                <div className="matchups">
                  <div className="matchup">
                    <div className="participants">
                    <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                  <div className="matchup">
                    <div className="participants">
                    <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="connector">
                  <div className="merger"></div>
                  <div className="line"></div>
                </div>
              </div>
            </section>
            <section className="round semifinals">
              <div className="winners">
                <div className="matchups">
                  <div className="matchup">
                    <div className="participants">
                    <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                  <div className="matchup">
                    <div className="participants">
                    <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="connector">
                  <div className="merger"></div>
                  <div className="line"></div>
                </div>
              </div>
            </section>
            <section className="round finals">
              <div className="winners">
                <div className="matchups">
                  <div className="matchup">
                    <div className="participants">
                    <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/Brawl_Icon 1.png"/>Legend Club</span>
                        <span className="span">-</span>
                      </div>
                      <div className="participant">
                      <span className="span">1 - </span>
                        <span className="span">
                          <img className="img" src="/icons/dragon-icon.png"/>Dragon Club</span>
                        <span className="span">-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Grid>
      </Box>
      </>
    )
}

export default Bracket;