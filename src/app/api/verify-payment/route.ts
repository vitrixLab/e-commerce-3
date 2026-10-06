import { NextResponse } from "next/server";

// MVP mock: no Khalti lookup. Decodes the mock pidx minted by
// /api/initiate-payment and reports a completed payment.
export async function POST(req: Request) {
  const { pidx } = await req.json();

  const parts = String(pidx ?? "").split(".");
  const paisa = Number(parts[1]);
  const transactionId = decodeURIComponent(parts[2] ?? "mock-transaction");
  const purchaseOrderName = decodeURIComponent(parts[3] ?? "Mock order");

  return NextResponse.json({
    status: "Completed",
    totalAmount: Number.isFinite(paisa) && paisa > 0 ? paisa : 0,
    purchase_order_name: purchaseOrderName,
    purchase_order_id: transactionId,
    transaction_id: transactionId,
  });
}
