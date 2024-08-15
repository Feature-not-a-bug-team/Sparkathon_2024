import { History, IInvoice, IProduct } from "@/types";
import { create } from "zustand";

type ProductStore = {
  products: IProduct[];
  loading: boolean;
  setLoading: () => void;
  set: (products: IProduct[]) => void;
  add: (products: IProduct) => void;
  edit: (product: IProduct) => void;
  editMultiple: (products: IProduct[]) => void;
};
type InvoiceStore = {
  invoices: IInvoice[];
  loadingI: boolean;
  setLoadingI: () => void;
  setI: (invoices: IInvoice[]) => void;
  addI: (invoices: IInvoice) => void;
  editI: (invoice: IInvoice) => void;
};
type HistoryStore = {
  historys: History[];
  loadingH: boolean;
  setH: (historys: History[]) => void;
  addH: (history: History) => void;
  setLoadingH: () => void;
};
export const useHistoryStore = create<HistoryStore>((set, get) => ({
  historys: [],
  loadingH: false,
  setH: (historys: History[]) => {
    return set({ historys: historys });
  },
  addH: (history: History) => {
    return set({ historys: [...get().historys, history] });
  },
  setLoadingH: () => set({ loadingH: !get().loadingH }),
}));
export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  loadingI: false,
  setI: (invoices: IInvoice[]) => {
    return set({ invoices: invoices });
  },
  addI: (invoice: IInvoice) => {
    return set({ invoices: [...get().invoices, invoice] });
  },
  editI: (invoice: IInvoice) => {
    const updtedInvoices = get().invoices.map((i) => {
      if (i._id == invoice._id) {
        return invoice;
      }
      return i;
    });
    return set({ invoices: updtedInvoices });
  },

  setLoadingI: () => set({ loadingI: !get().loadingI }),
}));

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  setLoading: () => set({ loading: !get().loading }),
  set: (products: IProduct[]) => set({ products: products }),
  add: (product: IProduct) => {
    return set({ products: [...get().products, product] });
  },
  edit: (product: IProduct) => {
    const updatedProducts = get().products.map((productMap) => {
      if (product._id == productMap._id) {
        return product;
      }
      return productMap;
    });
    return set({ products: updatedProducts });
  },
  editMultiple: (products: IProduct[]) => {
    const updatedProducts = get().products.map((pr) => {
      const fp = products.find((p) => p._id == pr._id);
      if (fp) {
        return fp;
      }
      return pr;
    });
  },
}));
