import { Box, Grid, Typography } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles";
import moment from "moment"
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

const RoundStatus:React.FC<RoundStatusData> = ({round, isFinished,type}) =>{
    const styles = useRoundStatusStyles();
    const getRoundStatus = ():string=>{
        if(isFinished){
            return "Finished"
        }
        return moment().format("DD/MM/YYYY hh:mm");
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


const Bracket:React.FC<BracketProps> = () =>{
    const rounds:RoundStatusData[] = [{
        type:"Fracture",
        isFinished:true,
        round:1
    },{
        type:"Breeze",
        isFinished:true,
        round:2
    },{
        type:"Icebox",
        isFinished:false,
        round:3
    }]

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
        <Box marginX={"70px"} marginY={2} >
            <Grid container columnSpacing={2} rowSpacing={1}>
                {renderStatus()}
            </Grid>   
        </Box>
    )
}

export default Bracket;