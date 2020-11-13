import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaikhoanComponent } from './taikhoan.component';
import { DanhsachtaikhoanComponent } from './taikhoan/danhsachtaikhoan/danhsachtaikhoan.component';
import { DanhsachloaitaikhoanComponent } from './loaitaikhoan/danhsachloaitaikhoan/danhsachloaitaikhoan.component';


const routes: Routes = [{
  path: '',
  component: TaikhoanComponent,
  children: [
    {
      path: 'taikhoan/danhsachtaikhoan',
      component: DanhsachtaikhoanComponent,
    },
    {
        path: 'loaitaikhoan/danhsachloaitaikhoan',
        component: DanhsachloaitaikhoanComponent,
      },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaiKhoanRoutingModule {
}
