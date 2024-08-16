'use client';
import { InvoiceTable } from '@/components/InvoiceTable';
import NewInvoice from '@/components/NewInvoice';
import SearchComponent from '@/components/searchComponent/SearchComponent';
import { useInvoiceStore } from '@/store/zustand';
import { useState, useEffect } from 'react';
import { Product, RelatedProduct } from '../../types/products';
import ProductCard from '@/components/product_card/ProductCard';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from '@nextui-org/react';
import {
  Navbar,
  NavbarContent,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';

export default function Invoice() {
  const [query, setQuery] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const handleSearch = async () => {
    const res = await fetch('/data/products.json');
    const products: Product[] = await res.json();

    // Find the product that matches the search query
    const foundProduct = products.find((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(foundProduct.related_products);
    } else {
      setProduct(null);
      setRelatedProducts([]);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      {/* <SearchComponent /> */}
      <h1 className="text-2xl mb-3">Product Search</h1>
      {/* <div className="w-full flex items-center justify-center"> */}
      <div className="flex justify-center gap-4 w-[75%]">
        <Input
          classNames={{
            base: 'max-w-full h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {product && (
        <div className="w-[75%]">
          <h3 className="font-extrabold mt-11 mb-5">
            Frequently Bought Together Products:
          </h3>
          <Table removeWrapper aria-label="Example static collection table ">
            <TableHeader>
              <TableColumn>Sr no</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Quantity</TableColumn>
            </TableHeader>
            <TableBody
            // loadingState={loading ? "loading" : "idle"}
            // loadingContent={<Spinner />}
            >
              {relatedProducts
                .filter((product) => product.name.length > 0)
                .map((product, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* {!product && <p>No product found for "{query}".</p>} */}
    </div>
  );
}

{
  /* const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  padding: '10px',
  borderBottom: '2px solid #ddd',
  textAlign: 'left',
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
}; */
}
