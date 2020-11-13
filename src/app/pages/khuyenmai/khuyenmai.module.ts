import { NgModule } from '@angular/core';
import {KhuyenmaiComponent} from './khuyenmai.component';
import {KhuyenMaiRoutingModule} from './khuyenmai-routing.module';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from '../../pipe/pipes/pipes.module';
import { DanhsachngaykhuyenmaiComponent } from './ngaykhuyenmai/danhsachngaykhuyenmai/danhsachngaykhuyenmai.component';
import { CapnhatngaykhuyenmaiComponent } from './ngaykhuyenmai/capnhatngaykhuyenmai/capnhatngaykhuyenmai.component';
import { DanhsachvoucherComponent } from './voicher/danhsachvoucher/danhsachvoucher.component';
import { CapnhatvoucherComponent } from './voicher/capnhatvoucher/capnhatvoucher.component';
import { DanhsachkhuyenmaisanphamComponent } from './khuyenmaisanpham/danhsachkhuyenmaisanpham/danhsachkhuyenmaisanpham.component';
import { CapnhatkhuyenmaisanphamComponent } from './khuyenmaisanpham/capnhatkhuyenmaisanpham/capnhatkhuyenmaisanpham.component';
@NgModule({
    imports: [
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     NgbPaginationModule,
     Ng2SearchPipeModule,
     PipesModule,
     KhuyenMaiRoutingModule
    ],
    declarations: [
    KhuyenmaiComponent,
    DanhsachngaykhuyenmaiComponent,
    CapnhatngaykhuyenmaiComponent,
    DanhsachvoucherComponent,
    CapnhatvoucherComponent,
    DanhsachkhuyenmaisanphamComponent,
    CapnhatkhuyenmaisanphamComponent
],
  })
export class KhuyenMaiModule {
}