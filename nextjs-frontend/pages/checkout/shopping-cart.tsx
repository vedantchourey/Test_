import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import styles from "./shopping-cart.module.css";
import React, { useEffect, useState } from "react";
import { cartSelector } from "../../src/frontend/redux-store/cart/cart-selector";
import {
  useAppSelector,
  useAppDispatch,
} from "../../src/frontend/redux-store/redux-store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  removeProduct,
  updateQuantity,
  clearCart,
} from "../../src/frontend/redux-store/cart/cart-slice";
import { useRouter } from "next/router";
import backendConfig from "../../src/backend/utils/config/backend-config";
const { credit_config } = backendConfig;
import axios from "axios";
import { getAuthHeader } from "../../src/frontend/utils/headers";

export default function ProductDetail(): JSX.Element {
  const [razorPay, setRazorPay] = useState(false);
  const cart = useAppSelector(cartSelector);
  const router = useRouter();
  
  const appDispatch = useAppDispatch();

  useEffect((): void => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = (): void => {
      setRazorPay(true);
    };
    script.onerror = (): void => {
      setRazorPay(false);
    };
    document.body.appendChild(script);
  }, []);

  function updateQty(id: any, quantity: any): void {
    appDispatch(
      updateQuantity({
        id: id,
        quantity: quantity,
      })
    );
  }

  function getTotalAmount(): any {
    return (
      cart.total +
      (credit_config.credit_gst_percentage / 100) * cart.total +
      (credit_config.credit_service_percentage / 100) * cart.total +
      0
      // (credit_config.shipping_service_percentage / 100) * cart.total
    );
  }

  const insertData = async (): Promise<void> => {

    if (!razorPay) return alert("Something went wrong. Try again later");
    const headers = await getAuthHeader();
    axios
      .post(
        "/api/order/create-order",
        {
          // eslint-disable-next-line newline-per-chained-call
          order_id: Math.random().toString(36).substring(2, 7),
          products: cart.products,
          amount: cart.total,
          payment_status: "pending",
          status: "Incomplete",
          paymentInfo: {},
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        const options = {
          ...res.data.createRazorPayOrder,
          name: "Noobstom credit",
          description: "Noobstom credit",
          handler: async function (response: any): Promise<void> {
            axios.post(
              `/api/order/update-order-payment-status`,
              { ...response, id: res.data.id },
              { headers }
            );
            appDispatch(clearCart());
            router.push("/wallet/success");
          },
        };
        // @ts-expect-error: ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((err) => {
        console.error(err);
      })
  };

  return (
    <>
      <Grid item xs={12} lg={8}>
        <Box className={styles.container}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
              <TableHead style={{ backgroundColor: "#201146", color: "white" }}>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((row: any, i: any) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                      <TextField
                        id="qty"
                        label="qty"
                        type="number"
                        value={row.quantity}
                        onChange={(event): void => {
                          updateQty(row.id, event.target.value);
                        }}
                        placeholder="qty"
                        style={{
                          width: 75,
                          marginLeft: "10px",
                          marginTop: "20px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.amount * row.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        style={{ color: "red", fontSize: "22px" }}
                        onClick={(): void => {
                          appDispatch(
                            removeProduct({
                              id: row.id,
                            })
                          );
                        }}
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={styles.box5}>
            <Button
              variant="text"
              className={styles.button4}
              onClick={(): any => {
                router.push("/store");
              }}
            >
              Continue shopping
            </Button>
            <Button
              variant="text"
              className={styles.button3}
              onClick={(): any => {
                appDispatch(clearCart());
              }}
            >
              Clear shopping cart
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Box className={styles.sideContainer}>
          <Typography className={styles.sideText1}>Summary</Typography>
          <Typography className={styles.sideText2}>
            Estimate Shipping and Tax
          </Typography>
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Subtotal</Typography>
            <Typography className={styles.sideText7}>₹{cart.total}</Typography>
          </Box>
          {/* <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Shipping</Typography>
            <Typography className={styles.sideText7}>
              ₹{cart.total * (credit_config.shipping_service_percentage / 100)}
            </Typography>
          </Box> */}
          <Typography className={styles.sideText4}>
            Shipping will be calculated at the next stage.
          </Typography>
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Service charge</Typography>
            <Typography className={styles.sideText7}>
              ₹{cart.total * (credit_config.credit_service_percentage / 100)}
            </Typography>
          </Box>
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>GST (18%)</Typography>
            <Typography className={styles.sideText7}>
              ₹{cart.total * (credit_config.credit_gst_percentage / 100)}
            </Typography>
          </Box>
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Order Total</Typography>
            <Typography className={styles.sideText7}>
              ₹{getTotalAmount()}
            </Typography>
          </Box>
          <Box className={styles.box1}>
            <Button
              variant="text"
              className={styles.button1}
              onClick={insertData}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
