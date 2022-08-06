import { Typography, Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import commonStyles from "../../styles/common.module.css";
import styles from "./product.module.css";
import { useAppSelector, useAppDispatch } from "../../redux-store/redux-store";
import { cartSelector } from "../../redux-store/cart/cart-selector";
import { addProduct, updateQuantity } from "../../redux-store/cart/cart-slice";
import React, { useEffect } from "react";
import Image from "next/image";
export default function Product(props: any): JSX.Element {
  const router = useRouter();
  async function goToProductDetailsPage(): Promise<void> {
    await router.push("/store/product-detail/" + props.id);
  }

  const cart = useAppSelector(cartSelector);
  const [qty, setQty] = React.useState(0);

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
    <Box className={styles.container}>
      <Image
        src={props.img === "CREDIT" ? "/images/card.gif" : props.img}
        className={commonStyles.fillImage}
        height={"350px"}
        width={"350px"}
      />
      <Typography
        className={styles.text}
        style={{ color: "#FFFFFF", cursor: "pointer" }}
        onClick={goToProductDetailsPage}
      >
        {props.name}
      </Typography>
      <Typography
        className={styles.text}
        style={{ color: "rgba(255, 255, 255, 0.4)" }}
      >
        {props.description}
      </Typography>
      <Typography className={styles.text} style={{ color: "#6932F9" }}>
        ₹{props.price}
      </Typography>
      <Box className={styles.box}>
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
          <Button variant="text" className={styles.button2} onClick={addToCart}>
            <img src="/icons/Vector-Cart.png" style={{ width: "22px" }} />
          </Button>
        )}
      </Box>
    </Box>
  );
}
