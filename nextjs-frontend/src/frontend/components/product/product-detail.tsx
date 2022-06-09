import { Grid, Box, Typography, Button} from '@mui/material';
import styles from "./product-detail.module.css";

export default function ProductDetail(props:any): JSX.Element {

  return (
    <>
      <Grid item xs={12} lg={8}>
        <Box className={styles.container}>
          <img src={props.mainImage} style={{ width: '100%' }} />
          <Box className={styles.imgContainer}>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box className={styles.sideContainer}>
          <Typography className={styles.sideText1}>{props.name}</Typography>
          <Typography className={styles.sideText2}>{props.companyName}</Typography>
          <Typography className={styles.sideText3}>${props.price}</Typography>
          <Box className={styles.box1}>
            <Button variant="text" className={styles.button1}>Buy Now</Button>
            <Button variant="text" className={styles.button2}><img src="/icons/Vector-Cart.png" style={{ width: '22px' }} /></Button>
          </Box>
          <Box className={styles.box2}>
            <Box className={styles.box3}>
              <img src="/icons/Product_delivery.png" />
              <Typography className={styles.sideText5}>FREE shipping</Typography>
            </Box>
            <Box className={styles.box3}>
              <img src="/icons/Clock_icon.png"/>
              <Typography className={styles.sideText5}>Deliver Today</Typography>
            </Box>
            <Box className={styles.box3}>
              <img src="/icons/Store_icon.png"/>
              <Typography className={styles.sideText5}>Pick up TODAY</Typography>
            </Box>
            <Box className={styles.box4}>
              <img src="/icons/Card_credit_logo.png"/>
              <img src="/icons/Payment_social_visa_icon.png"/>
            </Box>
          </Box>
          <Typography className={styles.sideText4}>{props.shortDescription}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Box className={styles.container2}>
          <Typography className={styles.sideText6}>Product Description</Typography>
          <Typography className={styles.sideText7}>{props.description}</Typography>
        </Box>
      </Grid>
    </>
  );
}