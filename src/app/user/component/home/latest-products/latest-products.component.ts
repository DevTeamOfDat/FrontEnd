import { Component, OnInit } from "@angular/core";
import { sanphamModel } from "app/model/san-pham/sanpham/sanpham-model";
import { SanPhamService } from "app/services/san-pham/san-pham/san-pham.service";

@Component({
  selector: "ngx-latest-products",
  templateUrl: "./latest-products.component.html",
  styleUrls: ["./latest-products.component.css"],
})
export class LatestProductsComponent implements OnInit {
  products: Array<sanphamModel> = [];
  constructor(private sanphamService: SanPhamService) {}

  ngOnInit(): void {
    this.fetchDanhsachsanpham();
  }
  fetchDanhsachsanpham() {
    this.sanphamService.getAll().subscribe((data) => {
      this.products = data.data;
      
    });
  }
}
