import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { DanhsachnhacungcapComponent } from './nhacungcap/danhsachnhacungcap/danhsachnhacungcap.component';
import { CapnhatnhacungcapComponent } from './nhacungcap/capnhatnhacungcap/capnhatnhacungcap.component';
import { PipesModule } from 'app/pipe/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DanhsachtintucComponent } from './tintuc/danhsachtintuc/danhsachtintuc.component';
import { CapnhattintucComponent } from './tintuc/capnhattintuc/capnhattintuc.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    PipesModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    PagesComponent,
    DanhsachnhacungcapComponent,
    CapnhatnhacungcapComponent,
    DanhsachtintucComponent,
    CapnhattintucComponent,
    
  ],
})
export class PagesModule {
}
