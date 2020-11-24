import { Component, OnInit } from "@angular/core";

import { taikhoanModel } from "app/model/taikhoan/taikhoan-model";
import { TaikhoanService } from "app/services/taikhoan/taikhoan.service";
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { SignInComponent } from 'app/user/login/sign-in/sign-in.component';
// import { SignUpComponent } from 'app/user/login/sign-up/sign-up.component';

@Component({
  selector: "ngx-header-area",
  templateUrl: "./header-area.component.html",
  styleUrls: ["./header-area.component.css"],
})
export class HeaderAreaComponent implements OnInit {
  taikhoan: taikhoanModel;

  constructor(private taikhoanService: TaikhoanService) {}
  isShowInfor: boolean;
  ngOnInit(): void {
    this.fetchTaiKhoan();
  }

  fetchTaiKhoan() {
    this.taikhoanService.getInfo().subscribe((data) => {
      this.taikhoan = data.data;
    });
    if (this.taikhoan != null) {
      this.isShowInfor = true;
    }
    if (this.taikhoan === null) {
      this.isShowInfor = false;
    }
  }
}
