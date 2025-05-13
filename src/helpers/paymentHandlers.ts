import { loadScript } from "./loadRazorpayScript";
// import logo from "@/assets/images/fakers/food-beverage-1.jpg";

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    address: string;
  };
  theme?: {
    color: string;
  };
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
export const handleRazorpayPayment = async () => {
  const script = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!script) {
    console.error("Razorpay SDK failed to load.");
    return;
  }

  const options: RazorpayOptions = {
    key: "rzp_test_XAZET8Tmmm4try", // 🔴 Use your test Razorpay key here
    amount: "50000", // in paise (₹500)
    currency: "INR",
    name: "Rahul Corp.",
    description: "Test Transaction - Frontend Only",
    image:
      "https://rahul.academet.com/static/media/logo.2ee99f5395bea0b68651.png",
    // order_id: "order_FakeOrderId123", // Fake for demo purposes
    handler: function (response: RazorpayPaymentResponse) {
      console.log("Payment successful!", response);
      alert("Payment successful! (Check console for details)");
    },
    prefill: {
      name: "Rahul Kumar",
      email: "rahulatthework@gmail.com",
      contact: "9999999999",
    },
    notes: {
      address: "RK Repo Corporate Office",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
