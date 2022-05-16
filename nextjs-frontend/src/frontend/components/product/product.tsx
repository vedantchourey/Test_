import { Typography, Box, Button } from '@mui/material';
import commonStyles from '../../styles/common.module.css';
import styles from "./product.module.css";

export default function Product(props:any): JSX.Element {

  return (
    <Box className={styles.container}>
      <img src={props.img} className={commonStyles.fillImage} style={{ height: '230px' }}/>
      <Typography className={styles.text} style={{ color: '#FFFFFF'}}>{props.name}</Typography>
      <Typography className={styles.text} style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{props.description}</Typography>
      <Typography className={styles.text} style={{ color: '#6932F9' }}>${props.price}</Typography>
      <Box className={styles.box}>
        <Button variant="text" className={styles.button1}>Buy Now</Button>
        <Button variant="text" className={styles.button2}><img src="/icons/Vector-Cart.png" style={{ width: '22px' }} /></Button>
      </Box>
    </Box>
  );
}