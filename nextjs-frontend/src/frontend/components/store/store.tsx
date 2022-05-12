import { Typography, Box, Button } from '@mui/material';
import commonStyles from '../../styles/common.module.css';
import styles from "./store.module.css";

export default function Store(): JSX.Element {

  return (
    <Box className={styles.container}>
      <img src="/images/card.gif" className={commonStyles.fillImage} style={{ height: '230px' }}/>
      
      <Typography className={styles.text} style={{ color: '#FFFFFF'}}>250 NoobStorm Credits</Typography>
      
      <Typography className={styles.text} style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Use credits for join tournaments and play with other games.</Typography>
      
      <Typography className={styles.text} style={{ color: '#6932F9' }}>$9.99</Typography>

      <Button variant="text" className={styles.button1}>Buy Now</Button>
      
      <Button variant="text" className={styles.button2}><img src="/icons/Vector-Cart.png" style={{ width: '22px' }} /></Button>
    </Box>
  );
}