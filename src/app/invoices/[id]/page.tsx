"use client";
import { InvoicePDF } from "@/components/InvoicePdf";
import { useParams } from "next/navigation";
export default function Invoice() {
  const params = useParams<{ id: string }>();
  return (
    <div className="flex justify-center content-center  w-full h-full ">
      <InvoicePDF id={params.id}></InvoicePDF>
    </div>
  );
}
