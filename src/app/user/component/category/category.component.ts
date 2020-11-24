import { Component, OnInit } from "@angular/core";
import { loaisanphamModel } from "app/model/san-pham/loaisanpham/loaisanpham-model";
import { sanphamModel } from "app/model/san-pham/sanpham/sanpham-model";
import { LoaiSanPhamService } from "app/services/san-pham/loai-san-pham/loai-san-pham.service";
import { SanPhamService } from "app/services/san-pham/san-pham/san-pham.service";

@Component({
  selector: "ngx-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categories: Array<loaisanphamModel> = [];
  products: Array<sanphamModel> = [];

  page = 1;
  pageSize = 5;
  p: number = 1;
  constructor(
    private categoryService: LoaiSanPhamService,
    private productsService: SanPhamService
  ) {}

  ngOnInit(): void {
    this.fetchCategory();
    this.fetchProduct();
  }

  fetchCategory() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data.data;
      (this.categories);
    });
  }

  // san pham

  fetchProduct() {
    this.productsService.getAll().subscribe((data) => {
      this.products = data.data;
    });
  }
}
