import { Theme } from '@mui/material';
import { createStyles, makeStyles, styled } from '@mui/styles';
import dynamic from 'next/dynamic'

const ReachTextEditor = dynamic(() => import("mui-rte"), {
  ssr: false,
});

const NoobReachTextEditorAlt = styled(ReachTextEditor)(() => ({
    background:"red"
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border:"1px solid rgba(255, 255, 255, 0.3);",
      minHeight:100,
      borderRadius:"10px"
    }
  })
);


const NoobReachTextEditor:React.FC<any> = (props) =>{
    const classes = useStyles();
    return <NoobReachTextEditorAlt classes={{root:classes.root}} {...props}/>
}

export default NoobReachTextEditor;
