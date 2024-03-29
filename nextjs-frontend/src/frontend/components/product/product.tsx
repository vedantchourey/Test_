import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import commonStyles from "../../styles/common.module.css";
import styles from "./product.module.css";
// import { useAppSelector, useAppDispatch } from "../../redux-store/redux-store";
// import { cartSelector } from "../../redux-store/cart/cart-selector";
// import { addProduct, updateQuantity } from "../../redux-store/cart/cart-slice";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "../../../../src/frontend/redux-store/redux-store";
import { isDeviceTypeSelector } from "../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../../../src/frontend/redux-store/layout/device-types";
export default function Product(props: any): JSX.Element {
  const router = useRouter();
  async function goToProductDetailsPage(): Promise<void> {
    await router.push("/store/product-detail/" + props.id);
  }
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop) );
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize(): void {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize(): any {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  // const cart = useAppSelector(cartSelector);
  // const [qty, setQty] = React.useState(0);

  // const appDispatch = useAppDispatch();

  // useEffect(() => {
  //   const i = cart.products.findIndex((x: any) => x.id === props.id);
  //   if (i !== -1) {
  //     const item = cart.products[i];
  //     const q = item.quantity;
  //     setQty(q);
  //   } else {
  //     setQty(0);
  //   }
  // }, [cart]);

  // function addToCart(): void {
  //   appDispatch(
  //     addProduct({
  //       name: props.name,
  //       image: props.img,
  //       description: props.description,
  //       amount: props.price,
  //       id: props.id,
  //       product_code: props.product_code,
  //       quantity: 1,
  //       createdAt: props.created_at,
  //     })
  //   );
  // }

  // function updateQty(e: any): void {
  //   appDispatch(
  //     updateQuantity({
  //       id: props.id,
  //       quantity: e,
  //     })
  //   );
  // }

  return (
    <Box
      className={
        isDesktop
          ? styles.container
          : windowSize.innerWidth <= 320
          ? styles.smallerMobileContainer
          : windowSize.innerWidth >= 320 && windowSize.innerWidth <= 375
          ? styles.midMobileContainer
          : styles.bigMobileContainer
      }
    >
      <Image
        src={props.img === "CREDIT" ? "/images/coin.jpg" : props.img}
        className={commonStyles.fillImage}
        height={isDesktop ? "220px" : "210px"}
        width={
          isDesktop
            ? "350px"
            : windowSize.innerWidth <= 320
            ? "230px"
            : windowSize.innerWidth >= 320 && windowSize.innerWidth <= 375
            ? "300px"
            : "350px"
        }
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
        style={{ color: "rgba(255, 255, 255, 0.4)", textAlign: "justify" }}
      >
        {props.description}
      </Typography>
      <Box className={styles.box}>
        <Button
          variant="text"
          className={styles.button1}
          // onClick={(): any => {
          //   if (qty <= 0) {
          //     addToCart();
          //   }
          //   router.push("/checkout");
          // }}
          onClick={goToProductDetailsPage}
        >
          Buy Now
        </Button>
        {/* {qty > 0 ? (
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
        )} */}
      </Box>
    </Box>
  );
}
