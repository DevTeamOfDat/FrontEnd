import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KhuyenmaiComponent } from './khuyenmai.component';
import { DanhsachngaykhuyenmaiComponent } from './ngaykhuyenmai/danhsachngaykhuyenmai/danhsachngaykhuyenmai.component';
import { DanhsachvoucherComponent } from './voicher/danhsachvoucher/danhsachvoucher.component';
import { DanhsachkhuyenmaisanphamComponent } from './khuyenmaisanpham/danhsachkhuyenmaisanpham/danhsachkhuyenmaisanpham.component';

const routes: Routes = [{
  path: '',
  component: KhuyenmaiComponent,
  children: [
    {
      path: 'khuyenmaisanpham/danhsachkhuyenmaisanpham',
      component: DanhsachkhuyenmaisanphamComponent
    },
    {
      path: 'ngaykhuyenmai/danhsachngaykhuyenmai',
      component: DanhsachngaykhuyenmaiComponent
    },
    {
      path: 'voicher/danhsachvoucher',
      component: DanhsachvoucherComponent
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhuyenMaiRoutingModule {
}
