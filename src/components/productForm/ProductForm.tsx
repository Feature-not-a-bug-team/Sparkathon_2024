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

export default function ProductForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [product, setProduct] = useState<{
    name: string;
    quantity: number;
    price: number;
  }>({
    name: "",
    price: 0,
    quantity: 0,
  });
  const { add } = useProductStore();
  const { addH } = useHistoryStore();

  const [loading, setIsLoadin] = useState<boolean>(false);
  const isSavable = () => {
    return product.name.length > 0 && product.quantity > 0 && product.price > 0;
  };

  const createProduct = async () => {
    if (isSavable()) {
      setIsLoadin(true);
      const res = (await (
        await fetch("/api/products/create", {
          method: "POST",
          body: JSON.stringify(product),
        })
      ).json()) as { createdProduct: IProduct; newHistoryEntry: History };
      setProduct({
        name: "",
        price: 0,
        quantity: 0,
      });
      setIsLoadin(false);
      addH(res.newHistoryEntry);
      add(res.createdProduct);

      onClose();
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="secondary"
        className="w-[100px]  py-3 rounded-md"
      >
        Add product
      </Button>
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
                Add Product
              </ModalHeader>
              <ModalBody>
                <Input
                  onValueChange={(e) => {
                    setProduct({
                      ...product,
                      name: e,
                    });
                  }}
                  label="Product name"
                  value={product.name}
                  placeholder="name of the product"
                  variant="bordered"
                  className="outline-none"
                />
                <Input
                  className="outline-none"
                  value={product.price.toString()}
                  onValueChange={(e) => {
                    try {
                      parseInt(e);
                      setProduct({
                        ...product,
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
                  value={product.quantity.toString()}
                  onValueChange={(e) => {
                    try {
                      parseInt(e);
                      setProduct({
                        ...product,
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
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
