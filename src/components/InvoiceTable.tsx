"use client";
import { useInvoiceStore } from "@/store/zustand";
import { IInvoice, paymentType } from "@/types";
import {
  Navbar,
  NavbarContent,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Link,
} from "@nextui-org/react";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import EditInvoice from "./EditInvoice";

export const InvoiceTable = () => {
  const { invoices } = useInvoiceStore();
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [searchInvoice, setSearchInvoice] = useState<IInvoice>({
    invoiceNumber: 0,
    user: {
      name: "",
      address: "",
      mobileNo: "",
      whatsAppNo: "",
      nameOfLayout: "",
      district: "",
      tahasil: "",
      mauza: "",
      surveyNo: "",
      plotNo: "",
      araji: "",
    },
    paylmentType: paymentType.cash,
    products: [],
    totalPricec: 0,
  });

  const rowsPerPage = 7;

  const pages = Math.ceil(invoices.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    if (searchInvoice.invoiceNumber == 0) return invoices.slice(start, end);
    else return [searchInvoice];
  }, [page, invoices, searchInvoice]);

  return (
    <>
      <Autocomplete
        label="Search for customers"
        className="max-w-xs p-2 mb-4"
        shouldCloseOnBlur
        onSelectionChange={(e) => {
          console.log(e);

          const invoice = invoices.find((invoice) => invoice._id == e);
          setSearchInvoice(
            invoice || {
              invoiceNumber: 0,
              user: {
                name: "",
                address: "",
                mobileNo: "",
                whatsAppNo: "",
                nameOfLayout: "",
                district: "",
                tahasil: "",
                mauza: "",
                surveyNo: "",
                plotNo: "",
                araji: "",
              },
              paylmentType: paymentType.cash,
              products: [],
              totalPricec: 0,
            }
          );
        }}
      >
        {invoices.map((invoice) => (
          <AutocompleteItem key={invoice._id as string} value={invoice._id}>
            {invoice.user.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Invoice no</TableColumn>
          <TableColumn>User name</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn className="text-red-700">Edit</TableColumn>
          <TableColumn className="text-red-700">Invoice</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((invoice, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.user.name}</TableCell>
                <TableCell>{invoice.totalPricec}</TableCell>
                <TableCell className="  transition-all cursor-pointer text-green-400">
                  <EditInvoice invoice={invoice} />
                </TableCell>
                <TableCell className="  transition-all cursor-pointer text-blue-400">
                  <Link href={`/invoices/${invoice._id}`}>Invoice</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
