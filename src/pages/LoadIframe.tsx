import { useEffect } from "react";
import { handleRazorpayPayment } from "../helpers/paymentHandlers";

function LoadIframe() {
  useEffect(() => {
    handleRazorpayPayment();
  }, []);
  return null;
}

export default LoadIframe;
