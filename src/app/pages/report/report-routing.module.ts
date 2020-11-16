import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { BaocaohangtonkhoComponent } from './baocaohangtonkho/baocaohangtonkho.component';
import { BaocaophieunhapComponent } from './baocaophieunhap/baocaophieunhap.component';
import { BaocaohoadonComponent } from './baocaohoadon/baocaohoadon.component';
import { BaocaonhanvienComponent } from './baocaonhanvien/baocaonhanvien.component';


const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {
      path: 'baocaohangtonkho',
      component: BaocaohangtonkhoComponent,
    },
    {
      path: 'baocaophieunhap',
      component: BaocaophieunhapComponent,
    }, 
    {
      path: 'baocaohoadon',
      component: BaocaohoadonComponent,
    }, 
    {
      path: 'baocaonhanvien',
      component: BaocaonhanvienComponent,
    }, 
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {
}
