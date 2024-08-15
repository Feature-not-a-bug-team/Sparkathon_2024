"use client";

import React, { useState } from "react";
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
import { History, IProduct } from "@/types";
import { useHistoryStore, useProductStore } from "@/store/zustand";

export default function EditProduct({ product }: { product: IProduct }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [updatedProduct, setProduct] = useState<{
    name: string;
    quantity: number;
    price: number;
  }>(product);
  const { edit } = useProductStore();
  const { addH } = useHistoryStore();
  const [loading, setIsLoadin] = useState<boolean>(false);
  const isSavable = () => {
    return (
      product.name != updatedProduct.name ||
      product.quantity != updatedProduct.quantity ||
      product.price != updatedProduct.price
    );
  };

  const createProduct = async () => {
    if (isSavable()) {
      setIsLoadin(true);
      const res = (await (
        await fetch(`/api/product/${product._id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...updatedProduct,
            id: product._id,
            code: product.code,
          }),
        })
      ).json()) as { updatedProduct: IProduct; editedHistoryEntry: History };
      setProduct(res.updatedProduct);
      addH(res.editedHistoryEntry);
      setIsLoadin(false);
      edit(res.updatedProduct);
      onClose();
    }
  };

  return (
    <>
      <p onClick={onOpen} color="secondary" className="  py-3 rounded-md">
        Edit
      </p>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={() => {
          setIsLoadin(false);
          setProduct({
            name: "",
            price: 0,
            quantity: 0,
          });
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                edit Product
              </ModalHeader>
              <ModalBody>
                <Input
                  onValueChange={(e) => {
                    setProduct({
                      ...updatedProduct,
                      name: e,
                    });
                  }}
                  label="Product name"
                  value={updatedProduct.name}
                  placeholder="name of the product"
                  variant="bordered"
                  className="outline-none"
                />
                <Input
                  className="outline-none"
                  value={updatedProduct.price.toString()}
                  onValueChange={(e) => {
                    try {
                      parseInt(e);
                      setProduct({
                        ...updatedProduct,
                        price: parseInt(e),
                      });
                    } catch {
                      return;
                    }
                  }}
                  placeholder="Price of the product"
                  type="number"
                  label="Price"
                  variant="bordered"
                />
                <Input
                  label="Quantity"
                  className="outline-none"
                  placeholder="enter quanity"
                  type="number"
                  value={updatedProduct.quantity.toString()}
                  onValueChange={(e) => {
                    try {
                      parseInt(e);
                      setProduct({
                        ...updatedProduct,
                        quantity: parseInt(e),
                      });
                    } catch {
                      return;
                    }
                  }}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={createProduct}
                  isLoading={loading}
                  disabled={!isSavable()}
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
