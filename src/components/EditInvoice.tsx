"use client";

import React, { useMemo, useState } from "react";
import { XCircle } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { IInvoice, IProduct } from "@/types";
import { useProductStore, useInvoiceStore } from "@/store/zustand";

export default function EditInvoice({ invoice }: { invoice: IInvoice }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { editI } = useInvoiceStore();
  const [loading, setIsLoadin] = useState<boolean>(false);
  const [editedInvoice, setEditedInvoice] = useState<IInvoice>(invoice);
  const { products, editMultiple } = useProductStore();
  const isSavable = useMemo(() => {
    return editedInvoice.products.every(
      (pr) =>
        pr.quantity <=
        (products.find((prr) => prr._id === pr._id)?.quantity || 0)
    );
  }, [editedInvoice, products]);
  const handleSave = async () => {
    setIsLoadin(true);
    (await (
      await fetch("/api/invoice/", {
        method: "PUT",
        body: JSON.stringify({
          newIInvoice: editedInvoice,
        }),
      })
    ).json()) as {
      updatedInvoice: IInvoice;
      updatedProductsFromDB: IProduct[];
    };
    onClose();
    location.reload();
  };

  return (
    <>
      <p onClick={onOpen} color="secondary" className="  py-3 rounded-md">
        Edit
      </p>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        placement="top-center"
        onClose={() => {
          setEditedInvoice(invoice);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Invoice
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Customer name"
                  defaultValue={editedInvoice.user.name}
                  onChange={(e) => {
                    setEditedInvoice({
                      ...editedInvoice,
                      user: { ...editedInvoice.user, name: e.target.value },
                    });
                  }}
                  variant="bordered"
                  className="outline-none"
                />

                {editedInvoice.products.map((product, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <div className="flex gap-3 w-full items-center ">
                      <div className="">{product.name}</div>
                      <XCircle
                        className="text-red-400 ml-auto mr-8 cursor-pointer hover:scale-110 opacity-0 hover:opacity-100 transition-all"
                        onClick={() => {
                          const updatedProdcts = editedInvoice.products.filter(
                            (p) => p._id != product._id
                          );
                          setEditedInvoice({
                            ...editedInvoice,
                            products: updatedProdcts,
                          });
                        }}
                      />
                    </div>
                    <Input
                      type="number"
                      label={`Quantity (${products.find((pr) => pr._id == product._id)?.quantity
                        } max)`}
                      value={product.quantity.toString()}
                      onChange={(e) => {
                        const int = parseInt(e.target.value);
                        const updatedProduct = editedInvoice.products.map(
                          (pr) => {
                            if (pr._id == product._id) {
                              if (e.target.value.length === 0) {
                                pr.quantity = 0;
                              } else {
                                pr.quantity = int;
                              }
                            }
                            return pr;
                          }
                        );
                        setEditedInvoice({
                          ...editedInvoice,
                          products: updatedProduct,
                        });
                      }}
                      variant="bordered"
                      className="outline-none"
                    />
                  </div>
                ))}
                <div className="flex w-full justify-between ">
                  <h1 className="font-bold text-2xl">Total Price:</h1>
                  <div>
                    {editedInvoice.products.map((p) => p.price * p.quantity)
                      .length > 0
                      ? editedInvoice.products
                        .map((p) => p.price * p.quantity)
                        .reduce((a, v) => {
                          return a + v;
                        })
                        .toLocaleString()
                      : 0}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleSave();
                  }}
                  color="primary"
                  isLoading={loading}
                  className="disabled:opacity-35 hover:disabled:opacity-60"
                >
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
