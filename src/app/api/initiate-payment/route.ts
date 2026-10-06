import { PaymentMethod, PaymentRequestData } from "@/app/lib/types";
import { NextResponse } from "next/server";

// MVP mock: no Khalti call. The "payment URL" points straight back at the
// success page, with the amount encoded in the mock pidx.
export async function POST(req: Request) {
  try {
    const paymentData: PaymentRequestData = await req.json();
    const { amount, productName, transactionId, method } = paymentData;

    if (!amount || !productName || !transactionId || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if ((method as PaymentMethod) !== "khalti") {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 },
      );
    }

    const amountNumber = parseFloat(String(amount));
    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paisa = Math.round(amountNumber * 100);
    const pidx = [
      "mock",
      paisa,
      encodeURIComponent(String(transactionId)),
      encodeURIComponent(String(productName)),
    ].join(".");

    return NextResponse.json({
      khaltiPaymentUrl: `/success?pidx=${encodeURIComponent(pidx)}`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error creating payment session",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
