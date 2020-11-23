import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { voucherModel } from 'app/model/khuyenmai/voucher/voicher-model';
import { dactrungsanphamModel } from 'app/model/san-pham/dactrungsanpham/dactrungsanpham-model';
import { HoadonService } from "app/services/donhang/hoadon/hoadon.service";
import { VoucherService } from "app/services/khuyen-mai/voucher/voucher.service";
import { DactrungService } from "app/services/san-pham/dactrung/dactrung.service";

@Component({
  selector: "ngx-hoa-don",
  templateUrl: "./hoa-don.component.html",
  styleUrls: ["./hoa-don.component.scss"],
})
export class HoaDonComponent implements OnInit {
  constructor(
    private hoadonService: HoadonService,
    private voucherService: VoucherService,
    private dactrung: DactrungService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  dactrungsanpham: Array<dactrungsanphamModel> = [];
  danhsachvoucher: Array<voucherModel> = [];

  
}
