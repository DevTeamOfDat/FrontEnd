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
  realProducts: Array<sanphamModel> = [];
  products: Array<sanphamModel> = [];
  productList: Array<sanphamModel> = [];
  searchedKeyword: string;

  page = 1;
  pageSize = 8;
  p: number = 1;
  constructor(
    private categoryService: LoaiSanPhamService,
    private productsService: SanPhamService
  ) {}

  ngOnInit(): void {
    this.fetchCategory();
    this.fetchProduct();
    
  }
  doInsertProductList(cateId: any) {
    this.products = this.realProducts;
    this.productList = [];
    this.products.forEach((item) => {
      if (item.ma_loai_san_pham == cateId) {
        this.productList.push(item);
      }
    });
    this.products = this.productList;
  }

  doFilterProducts() {
    console.log(this.searchedKeyword);
    var filterResult = [];
    if (this.searchedKeyword.length == 0) {
      this.products = this.realProducts;
    } else {
      this.products = this.realProducts;
      var keyword = this.searchedKeyword.toLowerCase();
      this.products.forEach((item) => {
        var ten_loai_san_pham = item.ten_loai_san_pham.toLowerCase();
        var ten_san_pham = item.ten_san_pham.toLowerCase();
        var ten_thuong_hieu = item.ten_thuong_hieu.toLowerCase();
        var gia_ban = item.gia_ban.toString();
        if (
          ten_loai_san_pham.includes(keyword) ||
          ten_san_pham.includes(keyword) ||
          ten_thuong_hieu.includes(keyword) ||
          gia_ban.includes(keyword)
        ) {
          filterResult.push(item);
        }
      });
      this.products = filterResult;
      console.log(this.products);
    }
  }

  fetchCategory() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data.data;
    });
  }

  // san pham

  fetchProduct() {
    this.productsService.getAll().subscribe((data) => {
      this.products = data.data;
      this.realProducts = data.data;
    });
  }
}
