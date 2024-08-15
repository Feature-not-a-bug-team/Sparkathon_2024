"use client";
import { InvoiceTable } from "@/components/InvoiceTable";
import NewInvoice from "@/components/NewInvoice";

export default function Invoice() {
  return (
    <div className="flex flex-col items-center  ">
      <InvoiceTable />
      <div className="mr-auto">
        <NewInvoice />
      </div>
    </div>
  );
}
