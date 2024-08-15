import { Mongoose } from "mongoose";
export interface IProduct {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  code: number;
}

export interface IInvoice {
  _id?: string;
  invoiceNumber: number;
  user: {
    name: string;
    address: string;
    mobileNo: string;
    whatsAppNo: string;
    nameOfLayout: string;
    district: string;
    tahasil: string;
    mauza: string;
    surveyNo: string;
    plotNo: string;
    araji: string;
  };
  paylmentType: paymentType;
  products: {
    name: string;
    quantity: number;
    price: number;
    code: number;
    _id?: string;
  }[];
  totalPricec: number;
  createdAt?: string;
}

export type User = {
  name: string;
  address: string;
  mobileNo: string;
  whatsAppNo: string;
  nameOfLayout: string;
  district: string;
  tahasil: string;
  mauza: string;
  surveyNo: string;
  plotNo: string;
  araji: string;
};

export type keyOfUserdata = keyof User;

export enum paymentType {
  cash = "cash",
  instalment = "instalment",
}

export type History = {
  _id?: string;
  createdAt?: string;
  productName: string;
  productCode: number;
  type: HistoryType;
  data: {
    oldPricec: number | null;
    oldQUantity: number | null;
    newPrice: number;
    newQuantity: number;
  };
};

export enum HistoryType {
  Created = "Created",
  Edited = "Edited",
}

/* eslint-disable no-var */

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}
