import { NgModule } from '@angular/core';
import {SanphamComponent} from './sanpham.component';
import {SanPhamRoutingModule} from './sanpham-routing.module';
import { DanhsachdactrungComponent } from './dactrung/danhsachdactrung/danhsachdactrung.component';
import { CapnhatdactrungComponent } from './dactrung/capnhatdactrung/capnhatdactrung.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from '../../pipe/pipes/pipes.module';
import { DanhsachthuonghieuComponent } from './thuonghieu/danhsachthuonghieu/danhsachthuonghieu.component';
import { CapnhatthuonghieuComponent } from './thuonghieu/capnhatthuonghieu/capnhatthuonghieu.component';
import { DanhsachloaisanphamComponent } from './loaisanpham/danhsachloaisanpham/danhsachloaisanpham.component';
import { CapnhatloaisanphamComponent } from './loaisanpham/capnhatloaisanpham/capnhatloaisanpham.component';
import { DanhsachsanphamComponent } from './san-pham/danhsachsanpham/danhsachsanpham.component';
import { CapnhatsanphamComponent } from './san-pham/capnhatsanpham/capnhatsanpham.component';
import { DanhsachdactrungsanphamComponent } from './dactrungsanpham/danhsachdactrungsanpham/danhsachdactrungsanpham.component';
import { CapnhatdactrungsanphamComponent } from './dactrungsanpham/capnhatdactrungsanpham/capnhatdactrungsanpham.component';
import { DanhsachhinhanhsanphamComponent } from './hinhanhsanpham/danhsachhinhanhsanpham/danhsachhinhanhsanpham.component';
import { CapnhathinhanhsanphamComponent } from './hinhanhsanpham/capnhathinhanhsanpham/capnhathinhanhsanpham.component';
import { DanhsachnhanxetComponent } from './nhanxet/danhsachnhanxet/danhsachnhanxet.component';
import { CapnhatnhanxetComponent } from './nhanxet/capnhatnhanxet/capnhatnhanxet.component';
@NgModule({
    imports: [
     SanPhamRoutingModule,
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     NgbPaginationModule,
     Ng2SearchPipeModule,
     PipesModule
    ],
    declarations: [
      SanphamComponent,
      DanhsachdactrungComponent,
      CapnhatdactrungComponent,
      DanhsachthuonghieuComponent,
      CapnhatthuonghieuComponent,
      DanhsachloaisanphamComponent,
      CapnhatloaisanphamComponent,
      DanhsachdactrungsanphamComponent,
      CapnhatdactrungsanphamComponent,
      DanhsachsanphamComponent,
      CapnhatsanphamComponent,
      DanhsachhinhanhsanphamComponent,
      CapnhathinhanhsanphamComponent,
      DanhsachnhanxetComponent,
      CapnhatnhanxetComponent,
      
    ],
  })
export class SanPhamModule {
}
