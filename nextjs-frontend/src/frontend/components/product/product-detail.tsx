import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import styles from "./product-detail.module.css";
import { useAppSelector, useAppDispatch } from "../../redux-store/redux-store";
import { cartSelector } from "../../redux-store/cart/cart-selector";
import { addProduct, updateQuantity } from "../../redux-store/cart/cart-slice";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ProductDetail(props: any): JSX.Element {
  const cart = useAppSelector(cartSelector);
  const [qty, setQty] = React.useState(0);
  const router = useRouter();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    const i = cart.products.findIndex((x: any) => x.id === props.id);
    if (i !== -1) {
      const item = cart.products[i];
      const q = item.quantity;
      setQty(q);
    } else {
      setQty(0);
    }
  }, [cart]);

  function addToCart(): void {
    appDispatch(
      addProduct({
        name: props.name,
        image: props.img,
        description: props.description,
        amount: props.price,
        id: props.id,
        product_code: props.product_code,
        quantity: 1,
        createdAt: props.created_at,
      })
    );
  }

  function updateQty(e: any): void {
    appDispatch(
      updateQuantity({
        id: props.id,
        quantity: e,
      })
    );
  }

  return (
    <>
      <Grid item xs={12} lg={8}>
        <Box className={styles.container}>
          <Image
            src={
              "/images/card.gif"
            }
            width={350}
            height={450}
          />
          {/* <Box className={styles.imgContainer}>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
            <img src={props.img}/>
          </Box> */}
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box className={styles.sideContainer}>
          <Typography className={styles.sideText1}>{props.name}</Typography>
          <Typography className={styles.sideText2}>
            {props.companyName}
          </Typography>
          <Typography className={styles.sideText3}>₹{props.price}</Typography>
          <Box className={styles.box1}>
            <Button
              variant="text"
              className={styles.button1}
              onClick={(): any => {
                if (qty <= 0) {
                  addToCart();
                }
                router.push("/checkout");
              }}
            >
              Buy Now
            </Button>
            {qty > 0 ? (
              <TextField
                id="qty"
                label="qty"
                type="number"
                value={qty}
                onChange={(event): void => {
                  updateQty(event.target.value);
                }}
                placeholder="qty"
                style={{ width: 75, marginLeft: "10px", marginTop: "20px" }}
              />
            ) : (
              <Button
                variant="text"
                className={styles.button2}
                onClick={addToCart}
              >
                <img src="/icons/Vector-Cart.png" style={{ width: "22px" }} />
              </Button>
            )}
          </Box>
          <Box className={styles.box2}>
            <Box className={styles.box3}>
              <img src="/icons/Product_delivery.png" />
              <Typography className={styles.sideText5}>
                FREE shipping
              </Typography>
            </Box>
            <Box className={styles.box3}>
              <img src="/icons/Clock_icon.png" />
              <Typography className={styles.sideText5}>
                Deliver Today
              </Typography>
            </Box>
            <Box className={styles.box3}>
              <img src="/icons/Store_icon.png" />
              <Typography className={styles.sideText5}>
                Pick up TODAY
              </Typography>
            </Box>
            <Box className={styles.box4}>
              <img src="/icons/Card_credit_logo.png" />
              <img src="/icons/Payment_social_visa_icon.png" />
            </Box>
          </Box>
          <Typography className={styles.sideText4}>
            {props.shortDescription}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Box className={styles.container2}>
          <Typography className={styles.sideText6}>
            Product Description
          </Typography>
          <Typography className={styles.sideText7}>
            {props.description}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
