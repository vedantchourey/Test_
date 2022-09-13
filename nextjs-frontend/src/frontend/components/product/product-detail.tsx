import {
  Grid,
  Box,
  Typography,
  Button,
  // TextField,
  Select,
  MenuItem
} from "@mui/material";
import styles from "./product-detail.module.css";
import { useAppDispatch } from "../../redux-store/redux-store";
// import { cartSelector } from "../../redux-store/cart/cart-selector";
// import { addProduct, updateQuantity } from "../../redux-store/cart/cart-slice";
import React, { useEffect } from "react";
// import { useRouter } from "next/router";
import Image from "next/image";
import backendConfig from "../../../backend/utils/config/backend-config";
import { getAuthHeader } from "../../utils/headers";
import axios from "axios";
import { setCartDetails } from "../../redux-store/wallet/wallet.-slice";
const { credit_config } = backendConfig;

export default function ProductDetail(props: any): JSX.Element {
  // const cart = useAppSelector(cartSelector);
  // const [qty, setQty] = React.useState(0);
  const [selectedCredit, setSelectedCredit] = React.useState<number>(1);
  const [razorPay, setRazorPay] = React.useState(false);
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

  // const router = useRouter();
  const appDispatch = useAppDispatch();

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

  

  const addFunds = async (): Promise<void> => {
    if (Number(selectedCredit) === 0)
    if (!razorPay) return alert("Something went wrong. Try again later");
    const headers = await getAuthHeader();
    axios
      .post(
        `/api/payment/create-order`,
        {
          amount: selectedCredit,
        },
        {
          headers,
        }
      )
      .then(({ data }): void => {
        console.warn(data);
        appDispatch(setCartDetails(data));
        const options = {
          ...data,
          name: "Learning To Code Online",
          description: "Test Wallet Transaction",
          handler: async function (response: any): Promise<void> {
            axios.post(`/api/payment/update-order`, response, { headers });
            location.replace("/");
          },
        };
        // @ts-expect-error: ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((): void => {
        alert("Something went wrong. Try again later");
      });
  };

  const creditAmount = selectedCredit * credit_config.price_per_credit;

  const creditsOptions = [
    // { label: "1 Credit", value: 1 * backendConfig.credit_config.price_per_credit },
    { label: "1 Credit", value: 1 },
    { label: "5 Credits", value: 5 },
    { label: "10 Credits", value: 10 },
    { label: "20 Credits", value: 20 },
    { label: "50 Credits", value: 50 },
  ];

  const serviceCharge = creditAmount * (credit_config.credit_service_percentage / 100); 
  const subtotal = creditAmount + serviceCharge;
  const gst = subtotal * (credit_config.credit_gst_percentage / 100);

  function getTotalAmount(): any {
    return (
      creditAmount +
      serviceCharge +
      gst
    );
  }

  return (
    <>
      <Grid item xs={12} lg={8}>
        <Box className={styles.container}>
          <Image src={"/images/coin.jpg"} width={350} height={480} />

          <Box className={styles.container2}>
            <Typography className={styles.sideText6}>
              Product Description
            </Typography>
            <Typography className={styles.sideText7} mt={2}>
              {props.description}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box className={styles.sideContainer}>
          <Typography className={styles.sideText1}>{props.name}</Typography>
          <Typography className={styles.sideText2}>
            {props.companyName}
          </Typography>
          <Typography className={styles.sideText4}>
            {props.shortDescription}
          </Typography>
          <Select
            sx={{ mt: 2 }}
            fullWidth
            value={selectedCredit.toString()}
            onChange={(e): any =>
              setSelectedCredit(parseInt(e.target.value.toString()))
            }
          >
            {creditsOptions.map((i) => (
              <MenuItem value={i.value} key={i.label}>
                {i.label}
              </MenuItem>
            ))}
          </Select>

          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>
              Credits Charges
            </Typography>
            <Typography className={styles.sideText7}>
              ₹{creditAmount}
            </Typography>
          </Box>
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Service charge</Typography>
            <Typography className={styles.sideText7}>
              ₹{serviceCharge}
            </Typography>
          </Box>
          <Box
            style={{
              borderBottomColor: "rgba(255,255,255,0.5)",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              display: "flex",
              width: "100%",
            }}
          />
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Sub Total</Typography>
            <Typography className={styles.sideText7}>₹{subtotal}</Typography>
          </Box>
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>GST (18%)</Typography>
            <Typography className={styles.sideText7}>
              ₹{gst}
            </Typography>
          </Box>
          <Box
            style={{
              borderBottomColor: "rgba(255,255,255,0.5)",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              display: "flex",
              width: "100%",
            }}
          />
          <Box className={styles.box1}>
            <Typography className={styles.sideText7}>Order Total</Typography>
            <Typography className={styles.sideText7}>
              ₹{getTotalAmount()}
            </Typography>
          </Box>
          {/* <Box className={styles.box1}> */}
          <Button
            variant="contained"
            fullWidth
            onClick={(): any => {
              addFunds();
              // if (qty <= 0) {
              //   addToCart();
              // }
              // router.push("/checkout");
            }}
          >
            Buy Now
          </Button>
        </Box>
      </Grid>
    </>
  );
}
