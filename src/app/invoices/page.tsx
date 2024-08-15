"use client";
import { InvoiceTable } from "@/components/InvoiceTable";
import NewInvoice from "@/components/NewInvoice";
import SearchComponent from "@/components/searchComponent/SearchComponent";
import { useInvoiceStore } from "@/store/zustand";

export default function Invoice() {
    return (
        <div className="flex flex-col items-center  ">
            {/* <SearchComponent /> */}
            <InvoiceTable />
            <div className="mr-auto">
                <NewInvoice />
            </div>
        </div>
    );
}
