import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useProductStore } from "@/store/zustand";
import { IProduct } from "@/types";

export default function AddProductToInvoice({
  selectedPrducts,
  addProduct,
}: {
  selectedPrducts: IProduct[];
  addProduct: (p: IProduct) => void;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [seleectedProudct, setSelectedProduct] = useState<IProduct>({
    name: "",
    _id: "",
    code: 0,
    quantity: 0,
    price: 0,
  });
  const [quantity, setQuantity] = useState(0);
  const { products } = useProductStore();
  const [open, setOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const handleAppProduct = () => {
    if (quantity > seleectedProudct.quantity) {
      alert(`quantity should be less than ${seleectedProudct.quantity}`);
      return;
    }
    addProduct({ ...seleectedProudct, quantity: quantity });
    setQuantity(0);
    setSelectedProduct({
      name: "",
      _id: "",
      code: 0,
      quantity: 0,
      price: 0,
    });
    onClose();
  };
  const myFilter = (textValue: string, inputValue: string) => {
    if (inputValue.length === 0) {
      return true;
    }

    return textValue.slice(0, inputValue.length) === inputValue;
  };

  useEffect(() => {
    const product = products.find((product) => product._id == inputCode);
    setSelectedProduct(
      product || {
        name: "",
        _id: "",
        code: 0,
        quantity: 0,
        price: 0,
      }
    );
  }, [inputCode]);

  return (
    <>
      <Button
        onPress={onOpen}
        variant="bordered"
        color="primary"
        className="w-[100px]"
      >
        Add Product
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        onClose={() => {
          setQuantity(0);
          setSelectedProduct({
            name: "",
            _id: "",
            code: 0,
            quantity: 0,
            price: 0,
          });
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select product
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  allowsCustomValue
                  className="max-w-xs"
                  defaultFilter={myFilter}
                  label="Search an product"
                  onSelectionChange={(e) => {
                    if (e == null) {
                      setSelectedProduct({
                        name: "",
                        _id: "",
                        code: 0,
                        quantity: 0,
                        price: 0,
                      });
                      setQuantity(0);
                      return;
                    }
                    const product = products.find(
                      (product) => product._id == e
                    );
                    setSelectedProduct(product as IProduct);
                  }}
                >
                  {products
                    .filter((product) => {
                      const p = selectedPrducts.find((sProduct) => {
                        return sProduct._id == product._id;
                      });
                      return p ? false : true;
                    })
                    .map((product) => (
                      <AutocompleteItem
                        key={product._id as string}
                        value={product.code}
                      >
                        {`${product.code}. ${product.name}`}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Input
                  disabled={seleectedProudct.price == 0 ? true : false}
                  type="number"
                  label={`Quantity (Maxq: ${seleectedProudct.quantity})`}
                  value={quantity.toString()}
                  onValueChange={(e) => {
                    try {
                      setQuantity(parseInt(e));
                    } catch {
                      return;
                    }
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleAppProduct}
                  disabled={quantity < 1}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
