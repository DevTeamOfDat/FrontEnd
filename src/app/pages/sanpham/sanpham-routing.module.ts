import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanphamComponent } from './sanpham.component';
import { DanhsachdactrungComponent } from './dactrung/danhsachdactrung/danhsachdactrung.component';
import { DanhsachthuonghieuComponent } from './thuonghieu/danhsachthuonghieu/danhsachthuonghieu.component';
import { DanhsachloaisanphamComponent } from './loaisanpham/danhsachloaisanpham/danhsachloaisanpham.component';
import { DanhsachsanphamComponent } from './san-pham/danhsachsanpham/danhsachsanpham.component';
import { DanhsachdactrungsanphamComponent } from './dactrungsanpham/danhsachdactrungsanpham/danhsachdactrungsanpham.component';
import { DanhsachhinhanhsanphamComponent } from './hinhanhsanpham/danhsachhinhanhsanpham/danhsachhinhanhsanpham.component';
import { DanhsachnhanxetComponent } from './nhanxet/danhsachnhanxet/danhsachnhanxet.component';

const routes: Routes = [{
  path: '',
  component: SanphamComponent,
  children: [
    {
      path: 'san-pham/danhsachsanpham',
      component: DanhsachsanphamComponent,
    },
    {
      path: 'dactrung/danhsachdactrung',
      component: DanhsachdactrungComponent,
    },
    {
      path: 'dactrungsanpham/danhsachdactrungsanpham',
      component: DanhsachdactrungsanphamComponent,
    },
    {
      path: 'hinhanhsanpham/danhsachhinhanhsanpham',
      component: DanhsachhinhanhsanphamComponent,
    },
    {
      path: 'nhanxet/danhsachnhanxet',
      component: DanhsachnhanxetComponent,
    },
    {
      path: 'loaisanpham/danhsachloaisanpham',
      component: DanhsachloaisanphamComponent,
    },
    {
      path: 'thuonghieu/danhsachthuonghieu',
      component: DanhsachthuonghieuComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SanPhamRoutingModule {
}
