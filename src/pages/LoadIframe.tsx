import { useEffect } from "react";
import { handleRazorpayPayment } from "../helpers/paymentHandlers";

function LoadIframe() {
  useEffect(() => {
    handleRazorpayPayment();
  }, []);

  // useEffect(() => {
  //   // ✅ 1. Dispatch the `custom_provider_ready` event to GHL
  //   window.parent.postMessage(
  //     {
  //       type: "custom_provider_ready",
  //       loaded: true,
  //     },
  //     "*"
  //   );

  //   // ✅ 2. Listen for the `payment_initiate_props` event from GHL
  //   const messageListener = async (event: MessageEvent) => {
  //     const data = event.data;
  //     console.log("data", data)
  //     if (data?.type === "payment_initiate_props") {
  //       await handleRazorpayPaymentFromGHL(data);
  //     }
  //   };

  //   window.addEventListener("message", messageListener);

  //   // Cleanup on unmount
  //   return () => {
  //     window.removeEventListener("message", messageListener);
  //   };
  // }, []);

  return null;
}

export default LoadIframe;
