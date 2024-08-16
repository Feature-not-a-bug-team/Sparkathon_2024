// types/product.ts
export interface RelatedProduct {
    product_id: string;
    name: string;
    quantity:number;
  }
  
  export interface Product {
    product_id: string;
    name:string;
    quantity:number;
    price:number;
    related_products: RelatedProduct[];
  }
  