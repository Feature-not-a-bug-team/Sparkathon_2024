// app/layout.tsx
"use client";
import { Providers } from "./provider";
import "./globals.css";
import NavBar from "../components/navbar/Navbar";
import { useEffect } from "react";
import { History, IInvoice, IProduct } from "@/types";
import {
  useProductStore,
  useInvoiceStore,
  useHistoryStore,
} from "@/store/zustand";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { set, setLoading } = useProductStore();
  const { setI, setLoadingI } = useInvoiceStore();

  const { setH, setLoadingH } = useHistoryStore();
  useEffect(() => {
    (async () => {
      setLoadingH();
      const history = (await (
        await fetch("/api/history/")
      ).json()) as History[];
      setH(history);
      setLoadingH();
    })();
    (async () => {
      setLoadingI();
      const invoicec = (await (
        await fetch("/api/invoice/")
      ).json()) as IInvoice[];
      setI(invoicec);
      setLoadingI();
    })();
    (async () => {
      setLoading();
      const products = (await (
        await fetch("/api/products/")
      ).json()) as IProduct[];
      set(products);
      setLoading();
    })();
  }, []);
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <NavBar />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
