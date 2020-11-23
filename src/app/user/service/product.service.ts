import { Injectable } from "@angular/core";
import { Product } from "../models/product";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Product[] = [
    new Product(1, "Product 1", "this is dau buoi re rach vkl", 200),
    new Product(2, "Product 2", "this is dau buoi re rach vkl", 300),
    new Product(3, "Product 3", "this is dau buoi re rach vkl", 300),
    new Product(4, "Product 4", "this is dau buoi re rach vkl", 400),
    new Product(5, "Product 5", "this is dau buoi re rach vkl", 500),
    new Product(6, "Product 6", "this is dau buoi re rach vkl", 600),
  ];
  constructor() {}
  getProducts(): Product[] {
    //Todo : get Api and return Observe
    return this.products;
  }
}
