import { NgModule } from '@angular/core';
import {DonhangComponent} from './donhang.component';
import {DonHangRoutingModule} from './donhang-routing.module';

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from '../../pipe/pipes/pipes.module';
import { DanhsachtrangthaiComponent } from './trangthai/danhsachtrangthai/danhsachtrangthai.component';
import { CapnhattrangthaiComponent } from './trangthai/capnhattrangthai/capnhattrangthai.component';
import { DanhsachloaidonComponent } from './loaidon/danhsachloaidon/danhsachloaidon.component';
import { CapnhatloaidonComponent } from './loaidon/capnhatloaidon/capnhatloaidon.component';
import { DanhsachhoadonComponent } from './hoadon/danhsachhoadon/danhsachhoadon.component';
import { CapnhathoadonComponent } from './hoadon/capnhathoadon/capnhathoadon.component';
import { DanhsachphieunhapComponent } from './phieunhap/danhsachphieunhap/danhsachphieunhap.component';
import { CapnhatphieunhapComponent } from './phieunhap/capnhatphieunhap/capnhatphieunhap.component';
import { DanhsachchitiethoadonComponent } from './chitiethoadon/danhsachchitiethoadon/danhsachchitiethoadon.component';
import { CapnhatchitiethoadonComponent } from './chitiethoadon/capnhatchitiethoadon/capnhatchitiethoadon.component';
import { CapnhatchitietphieunhapComponent } from './chitietphieunhap/capnhatchitietphieunhap/capnhatchitietphieunhap.component';
import { DanhsachchitietphieunhapComponent } from './chitietphieunhap/danhsachchitietphieunhap/danhsachchitietphieunhap.component';

@NgModule({
    imports: [
     DonHangRoutingModule,
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     NgbPaginationModule,
     Ng2SearchPipeModule,
     PipesModule
    ],
    declarations: [
      DonhangComponent,
      DanhsachtrangthaiComponent,
      CapnhattrangthaiComponent,
      DanhsachloaidonComponent,
      CapnhatloaidonComponent,
      DanhsachhoadonComponent,
      CapnhathoadonComponent,
      DanhsachphieunhapComponent,
      CapnhatphieunhapComponent,
      DanhsachchitiethoadonComponent,
      CapnhatchitiethoadonComponent,
      CapnhatchitietphieunhapComponent,
      DanhsachchitietphieunhapComponent,
      
      
    ],
  })
export class DonHangModule {
}
