"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product_card/ProductCard";
import ProductForm from "@/components/productForm/ProductForm";
import { useProductStore } from "@/store/zustand";
import {
  Navbar,
  NavbarContent,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { IProduct } from "@/types";

export default function Products() {
  const { products, loading } = useProductStore();
  const [inputCode, setInputCode] = useState("");
  const [search, setSearch] = useState(false);
  const [seleectedProudct, setSelectedProduct] = useState<IProduct>({
    name: "",
    _id: "",
    code: 0,
    quantity: 0,
    price: 0,
  });
  const handleSearch = () => {
    setSearch(true);
    const searchProduct = products.find((p) => p.code == parseInt(inputCode));
    setSelectedProduct(
      searchProduct || {
        name: "",
        _id: "",
        code: 0,
        quantity: 0,
        price: 0,
      }
    );
    console.log(seleectedProudct);
    console.log(products);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    const searchProduct = products.find((p) => p.code == parseInt(inputCode));
    setSelectedProduct(
      searchProduct || {
        name: "",
        _id: "",
        code: 0,
        quantity: 0,
        price: 0,
      }
    );
  }, [inputCode]);

  return (
    <div className="flex flex-col gap-2 mt-4 sm:px-10 px-5">
      {/* <SearchComponent /> */}
      <div className="flex justify-center gap-4">
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          onChange={(e) => {
            setInputCode(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {inputCode == "" ? (
        <ProductCard products={products} loading={loading} />
      ) : (
        <ProductCard products={[seleectedProudct]} loading={loading} />
      )}
      <ProductForm />
    </div>
  );
}
