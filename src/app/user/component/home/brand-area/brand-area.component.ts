import { Component, OnInit } from "@angular/core";
import { thuonghieuModel } from "app/model/san-pham/thuong-hieu/thuonghieu-model";
import { ThuongHieuService } from "app/services/san-pham/thuong-hieu/thuong-hieu.service";

@Component({
  selector: "ngx-brand-area",
  templateUrl: "./brand-area.component.html",
  styleUrls: ["./brand-area.component.css"],
})
export class BrandAreaComponent implements OnInit {
  brands: Array<thuonghieuModel> = [];
  constructor(private brandsService: ThuongHieuService) {}

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands() {
    this.brandsService.getAll().subscribe((data) => {
      this.brands = data.data;
      console.log(this.brands);
    });
  }
}
