import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonhangComponent } from './donhang.component';
import { DanhsachtrangthaiComponent } from './trangthai/danhsachtrangthai/danhsachtrangthai.component';
import { DanhsachloaidonComponent } from './loaidon/danhsachloaidon/danhsachloaidon.component';
import { DanhsachhoadonComponent } from './hoadon/danhsachhoadon/danhsachhoadon.component';
import { DanhsachchitiethoadonComponent } from './chitiethoadon/danhsachchitiethoadon/danhsachchitiethoadon.component';
import { DanhsachphieunhapComponent } from './phieunhap/danhsachphieunhap/danhsachphieunhap.component';
import { DanhsachchitietphieunhapComponent } from './chitietphieunhap/danhsachchitietphieunhap/danhsachchitietphieunhap.component';


const routes: Routes = [{
  path: '',
  component: DonhangComponent,
  children: [
    {
      path: 'loaidon/danhsachloaidon',
      component: DanhsachloaidonComponent,
    },
    {
      path: 'hoadon/danhsachhoadon',
      component: DanhsachhoadonComponent,
    },
    {
      path: 'chitiethoadon/danhsachchitiethoadon',
      component: DanhsachchitiethoadonComponent,
    },
    {
      path: 'phieunhap/danhsachphieunhap',
      component: DanhsachphieunhapComponent,
    },
    {
      path: 'chitietphieunhap/danhsachchitietphieunhap',
      component: DanhsachchitietphieunhapComponent,
    },
    {
      path: 'trangthai/danhsachtrangthai',
      component: DanhsachtrangthaiComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonHangRoutingModule {
}
