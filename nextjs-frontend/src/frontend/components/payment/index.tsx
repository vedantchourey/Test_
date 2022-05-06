import { Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/headers";

function PaymentButon(): any {
  const [razorPay, setRazorPay] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [amount, setAmount] = useState("");
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

  const addFunds = async (): Promise<void> => {
    if (amount === "") return setErrorMsg("Please enter amount");
    if (!razorPay) return setErrorMsg("Something went wrong. Try again later");
    const headers = await getAuthHeader();
    axios
      .post(
        `/api/payment/create-order`,
        {
          amount,
        },
        {
          headers,
        }
      )
      .then(({ data }): void => {
        const options = {
          ...data,
          name: "Learning To Code Online",
          description: "Test Wallet Transaction",
          handler: function (response: any): void {
            axios.post(`/api/payment/update-order`, response, { headers });
          },
        };
        // @ts-expect-error: ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((): void => {
        setErrorMsg("Something went wrong. Try again later");
      });
  };
  return (
    <>
      <div style={{ background: "black" }}>
        <Input
          value={amount}
          placeholder="Enter Amount"
          onChange={(e): void => setAmount(e.target.value)}
        />
        <Button onClick={addFunds}>Add Funds</Button>
        <h3> {errorMsg}</h3>
      </div>
    </>
  );
}
export default PaymentButon;
