'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react';
import { IInvoice, IProduct, paymentType } from '@/types';
import { useInvoiceStore, useProductStore } from '@/store/zustand';
import AddProductToInvoice from './AddProduct';
import EditInvoiceItem from './EditInvoiceItem';

export default function NewInvoicec() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { addI } = useInvoiceStore();
  const [product, setProduct] = useState<{
    name: string;
    quantity: number;
    price: number;
  }>({
    name: '',
    price: 0,
    quantity: 0,
  });
  const { add, set } = useProductStore();
  const [loading, setIsLoadin] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [invoice, setInvoicee] = useState<IInvoice>({
    invoiceNumber: 0,
    user: {
      name: '',
      address: '',
      mobileNo: '',
      whatsAppNo: '',
    },
    paylmentType: paymentType.cash,
    products: [],
    totalPricec: 0,
  });
  const [tablePage, setTablePage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(invoice.products.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (tablePage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return invoice.products.slice(start, end);
  }, [tablePage, invoice.products]);

  const addProduct = (product: IProduct) => {
    setInvoicee({
      ...invoice,
      products: [...invoice.products, product],
    });
  };
  const isSavable = () => {
    return product.name.length > 0 && product.quantity > 0 && product.price > 0;
  };
  const isNext = () => {
    return Object.values(invoice.user).every((value) => value.length > 0);
  };

  const handleClick = async () => {
    if (page == 0) {
      if (!isNext()) {
        alert('Please fill everything');
        return;
      }
      setPage(1);
    } else {
      setIsLoadin(true);

      invoice.totalPricec = invoice.products
        .map((p) => p.price * p.quantity)
        .reduce((a, v) => {
          return a + v;
        });
      const NewInvoice = (await (
        await fetch('/api/invoice/', {
          method: 'POST',
          body: JSON.stringify(invoice),
        })
      ).json()) as { updateProdcuts: IProduct[]; newInvoice: IInvoice };
      setIsLoadin(false);
      addI(NewInvoice.newInvoice);
      set(NewInvoice.updateProdcuts);
      setIsLoadin(false);
      setPage(0);
      setInvoicee({
        invoiceNumber: 0,
        user: {
          name: '',
          address: '',
          mobileNo: '',
          whatsAppNo: '',
        },
        paylmentType: paymentType.cash,
        products: [],
        totalPricec: 0,
      });

      onClose();
    }
  };
  const updatedQuantity = (id: string, q: number) => {
    invoice.products.forEach((p) => {
      if (id == p._id) {
        p.quantity = q;
      }
    });
    setInvoicee({
      ...invoice,
      products: invoice.products,
    });
  };
  const { products } = useProductStore();
  const limitQuantity = (id: string) => {
    return products.find((p) => p._id == id)?.quantity;
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="secondary"
        className="w-[100px]  py-3 rounded-md"
      >
        New Invoice
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="full"
        onClose={() => {
          setIsLoadin(false);
          setPage(0);
          setInvoicee({
            invoiceNumber: 0,
            user: {
              name: '',
              address: '',
              mobileNo: '',
              whatsAppNo: '',
            },
            paylmentType: paymentType.cash,
            products: [],
            totalPricec: 0,
          });
        }}
      >
        <ModalContent className="overflow-y-scroll">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                New Invoice
              </ModalHeader>
              <ModalBody className="sm:px-32">
                {page == 0 ? (
                  <>
                    <div className="text-xl">Customer info</div>
                    <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-row-3   gap-3">
                      <Input
                        label="Customer name"
                        placeholder="name of the Customer "
                        variant="bordered"
                        radius="sm"
                        className="outline-none rounded-sm col-span-1 row-span-1 "
                        value={invoice.user.name}
                        onChange={(e) => {
                          setInvoicee({
                            ...invoice,
                            user: {
                              ...invoice.user,
                              name: e.target.value,
                            },
                          });
                        }}
                      />
                      <Textarea
                        label="Address"
                        placeholder="Address  of the Customer "
                        variant="bordered"
                        radius="sm"
                        className="outline-none rounded-sm col-span-1 row-span-2 max-h-full h-full"
                        maxRows={4}
                        minRows={4}
                        value={invoice.user.address}
                        onChange={(e) => {
                          setInvoicee({
                            ...invoice,
                            user: {
                              ...invoice.user,
                              address: e.target.value,
                            },
                          });
                        }}
                      />
                      <div className="flex sm:flex-row flex-col gap-3">
                        <Input
                          label="Mobile No."
                          placeholder="customer number"
                          variant="bordered"
                          radius="sm"
                          className="outline-none rounded-sm col-span-1 row-span-1"
                          value={invoice.user.mobileNo}
                          onChange={(e) => {
                            setInvoicee({
                              ...invoice,
                              user: {
                                ...invoice.user,
                                mobileNo: e.target.value,
                              },
                            });
                          }}
                        />
                        <Input
                          label="Whatapp No."
                          placeholder="customer number"
                          variant="bordered"
                          radius="sm"
                          className="outline-none rounded-sm col-span-1 row-span-1"
                          value={invoice.user.whatsAppNo}
                          onChange={(e) => {
                            setInvoicee({
                              ...invoice,
                              user: {
                                ...invoice.user,
                                whatsAppNo: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-2xl">Add Product</h1>
                    <AddProductToInvoice
                      selectedPrducts={invoice.products}
                      addProduct={addProduct}
                    />
                    {invoice.products.length > 0 && (
                      <>
                        <Table
                          removeWrapper
                          className=""
                          bottomContent={
                            <div className="flex w-full justify-center">
                              <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={tablePage}
                                total={pages}
                                onChange={(page) => {
                                  setTablePage(page);
                                }}
                              />
                            </div>
                          }
                        >
                          <TableHeader>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                            <TableColumn>Price per item</TableColumn>
                            <TableColumn>Total price</TableColumn>
                            <TableColumn>Action</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {items.map((product, key) => {
                              return (
                                <TableRow key={key}>
                                  <TableCell>{product.name}</TableCell>

                                  <TableCell>{product.quantity}</TableCell>

                                  <TableCell>{product.price}</TableCell>

                                  <TableCell>
                                    {product.quantity * product.price}
                                  </TableCell>

                                  <TableCell className="  flex gap-3">
                                    <EditInvoiceItem
                                      updateQuantity={updatedQuantity}
                                      limitQuantity={
                                        limitQuantity(
                                          product._id as string
                                        ) as number
                                      }
                                      ogQuantity={product.quantity}
                                      id={product._id as string}
                                    />

                                    <div
                                      className="text-red-500 cursor-pointer"
                                      onClick={() => {
                                        const updateInvoicec =
                                          invoice.products.filter((p) => {
                                            return p._id != product._id;
                                          });
                                        setInvoicee({
                                          ...invoice,
                                          products: updateInvoicec,
                                        });
                                      }}
                                    >
                                      Remove
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <div className=" flex gap-5 text-2xl sm:ml-auto">
                          <div className="font-bold  ">Total Amount:</div>
                          {invoice.products
                            .map((p) => p.price * p.quantity)
                            .reduce((a, v) => {
                              return a + v;
                            })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {page == 1 && (
                  <Button
                    onClick={() => {
                      setPage(0);
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  color="primary"
                  onPress={handleClick}
                  isLoading={loading}
                  disabled={page == 0 ? false : false}
                >
                  {page == 0 ? 'Next' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
