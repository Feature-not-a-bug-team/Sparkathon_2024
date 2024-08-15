import React, { useState } from "react";
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
} from "@nextui-org/react";

export default function EditInvoiceItem({
  ogQuantity,
  limitQuantity,
  updateQuantity,
  id,
}: {
  ogQuantity: number;
  limitQuantity: number;
  updateQuantity: (id: string, q: number) => void;
  id: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(ogQuantity);
  const handleChange = () => {
    if (quantity > limitQuantity) {
      alert(`Quantity should be less  than ${limitQuantity} `);
      return;
    }
    console.log(quantity);
    updateQuantity(id, quantity);
    onClose();
  };

  return (
    <>
      <div onClick={onOpen} className="text-green-500 cursor-pointer">
        Edit
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={() => {
          setQuantity(ogQuantity);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Quantity
              </ModalHeader>
              <ModalBody>
                <Input
                  label={`Quantity (Maxq: ${limitQuantity})`}
                  placeholder="Change Quantity"
                  type="number"
                  variant="bordered"
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
                  onPress={handleChange}
                  disabled={quantity < 1 || !quantity}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
