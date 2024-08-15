import { useProductStore } from "@/store/zustand";
import {Navbar,NavbarContent,Input, Button} from  "@nextui-org/react"
import { useState } from "react";
export default function SearchComponent(){
  const { products, loading } = useProductStore();
  const[inputCode,setInputCode]=useState("");
  const handleSearch=()=>{
    return products.find((p)=>p.code==parseInt(inputCode))
  }
    return (
        <Navbar>
        <NavbarContent as="div" className="items-center">
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            type="search"
            onChange={(e)=>{setInputCode(e.target.value)}}
          />
          <Button onClick={handleSearch}>Search</Button>
          </NavbarContent>
          </Navbar>
    )
}