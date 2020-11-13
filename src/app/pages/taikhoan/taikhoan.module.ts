import { NgModule } from '@angular/core';
import {TaikhoanComponent} from './taikhoan.component';
import {TaiKhoanRoutingModule} from './taikhoan-routing.module';;
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from '../../pipe/pipes/pipes.module';
import { CapnhattaikhoanComponent } from './taikhoan/capnhattaikhoan/capnhattaikhoan.component';
import { DanhsachtaikhoanComponent } from './taikhoan/danhsachtaikhoan/danhsachtaikhoan.component';
import { DanhsachloaitaikhoanComponent } from './loaitaikhoan/danhsachloaitaikhoan/danhsachloaitaikhoan.component';
import { CapnhatloaitaikhoanComponent } from './loaitaikhoan/capnhatloaitaikhoan/capnhatloaitaikhoan.component';
@NgModule({
    imports: [
     TaiKhoanRoutingModule,
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     NgbPaginationModule,
     Ng2SearchPipeModule,
     PipesModule
    ],
    declarations: [
      TaikhoanComponent,
      DanhsachtaikhoanComponent,
      CapnhattaikhoanComponent,
      DanhsachloaitaikhoanComponent,
      CapnhatloaitaikhoanComponent,
    ],
  })
export class TaiKhoanModule {
}
