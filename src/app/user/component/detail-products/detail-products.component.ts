import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { hoadonModel } from "app/model/donhang/hoadon/hoadon-model";
import { voucherModel } from "app/model/khuyenmai/voucher/voicher-model";
import { nhanxetModel } from "app/model/nhanxet/nhanxet.model";
import { dactrungsanphamModel } from "app/model/san-pham/dactrungsanpham/dactrungsanpham-model";
import { sanphamModel } from "app/model/san-pham/sanpham/sanpham-model";
import { HoadonService } from "app/services/donhang/hoadon/hoadon.service";
import { VoucherService } from "app/services/khuyen-mai/voucher/voucher.service";
import { NhanXetService } from "app/services/nhanxet/nhan-xet.service";
import { DactrungsanphamService } from "app/services/san-pham/dactrungsanpham/dactrungsanpham.service";
import { SanPhamService } from "app/services/san-pham/san-pham/san-pham.service";

@Component({
  selector: "ngx-detail-products",
  templateUrl: "./detail-products.component.html",
  styleUrls: ["./detail-products.component.css"],
})
export class DetailProductsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private sanphamService: SanPhamService,
    private dactrungsanphamService: DactrungsanphamService,
    private nhanxetService: NhanXetService,
    private hoadonService: HoadonService,
    private voucherService: VoucherService
  ) {}
  sanpham: Array<sanphamModel> = [];
  dactrungsanpham: Array<dactrungsanphamModel> = [];
  nhanxets: Array<nhanxetModel> = [];

  allVoucher: Array<voucherModel> = [];
  id = "";
  name = "";
  ma_voucher: any;
  review: string;

  ngOnInit(): void {
    this.getID();
    this.fetchSanpham();
    this.fetchDactrung();
    this.fetchNhanXet();
    this.fetchAllVoucher();
  }
  getID() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("ma_san_pham");
      this.name = params.get("ten_san_pham");
    });
  }
  fetchSanpham() {
    this.sanphamService.detail(this.id).subscribe((data) => {
      this.sanpham = data.data;
    });
  }
  fetchDactrung() {
    this.dactrungsanphamService.detail(this.id).subscribe((data) => {
      this.dactrungsanpham = data.data;
    });
  }
  fetchNhanXet() {
    this.nhanxetService.getAll().subscribe((data) => {
      this.nhanxets = data.data;
    });
  }

  fetchAllVoucher() {
    this.voucherService.getAll().subscribe((data) => {
      this.allVoucher = data.data;
      console.log(this.allVoucher);
    });
  }
  doInsertBill(ma_voucher: any = null) {
    // let hoadon: modelBill;
    // hoadon = {
    //   ma_voucher: ma_voucher;
    // }
    // this.hoadonService.create().subscribe(res => {
    // });
  }
  doInsertReview() {
    // var nx: nhanxetModel;
    // if (this.review.length != 0) {
    //   nx = {
    //     binh_luan: this.review,
    //   };
    //   this.nhanxetService.create(nx).subscribe((res) => {});
    // }
  }
}
