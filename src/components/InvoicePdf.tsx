"use client";
import { useInvoiceStore } from "@/store/zustand";
import { IInvoice, keyOfUserdata } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";
export const InvoicePDF = ({ id }: { id: string }) => {
  const { invoices } = useInvoiceStore();
  const options = {
    page: {
      margin: Margin.NONE,
      // default is 'A4'
      // default is 'portrait'
    },
  };
  const getTargetElement = () => document.getElementById("content-id");
  const [invoice, setInvoice] = useState<IInvoice>();
  useEffect(() => {
    const foundInvoice = invoices.find((inv) => inv._id == id);
    setInvoice(foundInvoice);
  }, [id, invoices]);

  return (
    <div>
      <div className="w-full flex justify-center">
        <Button
          className="w-[100px] rounded-md "
          color="primary"
          type="button"
          onClick={() => generatePDF(getTargetElement, options)}
        >
          Download pdf
        </Button>
      </div>

      <div className="overflow-x-scroll max-h-[800px] overflow-y-scroll mt-5">
        <div
          className="text-black  bg-white w-[900px] min-h-[1250px]"
          id="content-id"
        >
          <div className="flex justify-center content-center font-bold text-[26px] ">
            Invoice
          </div>
          <div className="px-4 mt-5">
            <div className="w-full h-o border-1 "></div>
          </div>
          <div className="grid grid-cols-2 grid-row-3 gap-1  px-5 mt-5">
            <div className="font-bold flex gap-1">
              Name:<span className="font-normal">{invoice?.user.name}</span>
            </div>

            <div className="font-bold flex gap-1">
              Date:
              <span className="font-normal">
                {formatDate(invoice?.createdAt || "")}
              </span>
            </div>
          </div>

          <div className="px-4 mt-5">
            <div className="w-full h-o border-1 "></div>
          </div>
          <div className="px-5 mt-5">
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="bg-white rounded-none "
            >
              <TableHeader className="bg-white rounded-none text-black">
                <TableColumn className="bg-gray-400 text-black">
                  Sr no.
                </TableColumn>
                <TableColumn className="bg-gray-400 text-black">
                  Item code
                </TableColumn>
                <TableColumn className="bg-gray-400 text-black">
                  Item
                </TableColumn>
                <TableColumn className="bg-gray-400 text-black">
                  Quantity
                </TableColumn>
                <TableColumn className="bg-gray-400 text-black">
                  Base price
                </TableColumn>
                <TableColumn className="bg-gray-400 text-black">
                  Total
                </TableColumn>
              </TableHeader>
              <TableBody>
                {invoice ? (
                  invoice.products.map((product, index) => {
                    return (
                      <TableRow className="mt-3 text-black" key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{product.code}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          {(product.price * product.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow key="1">
                    <TableCell>Loading</TableCell>
                    <TableCell>Loading</TableCell>
                    <TableCell>Loading</TableCell>
                    <TableCell>Loading</TableCell>
                    <TableCell>Loading</TableCell>
                    <TableCell>Loading</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="px-4 mt-3">
            <div className="w-full h-o border-1 border-black "></div>
          </div>
          <div className="ml-5 mt-5">3% delivery charges applied (Cash)</div>
          <div className="ml-auto flex gap-5 text-black text-2xl mt-5 px-5 ">
            <div className="font-bold">Total:</div>
            <div className="">
              {(
                (invoice?.totalPricec || 0) +
                ((invoice?.totalPricec || 0) / 100) * 3
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
