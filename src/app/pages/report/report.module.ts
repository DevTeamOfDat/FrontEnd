import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PipesModule } from '../../pipe/pipes/pipes.module';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { BaocaohangtonkhoComponent } from './baocaohangtonkho/baocaohangtonkho.component';
import { DirectiveModule } from 'app/directives/directive/directive.module';
import { BaocaophieunhapComponent } from './baocaophieunhap/baocaophieunhap.component';
import { BaocaohoadonComponent } from './baocaohoadon/baocaohoadon.component';
import { BaocaonhanvienComponent } from './baocaonhanvien/baocaonhanvien.component';
@NgModule({
    imports: [
     ReportRoutingModule,
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     NgbPaginationModule,
     Ng2SearchPipeModule,
     PipesModule,
     DirectiveModule
    ],
    declarations: [
      ReportComponent,
      BaocaohangtonkhoComponent,
      BaocaophieunhapComponent,
      BaocaohoadonComponent,
      BaocaonhanvienComponent,
    ],
  })
export class ReportModule {
}
