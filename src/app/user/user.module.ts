import { NgModule } from '@angular/core';


import { HomeComponent } from './component/home/home.component';
import { HeaderAreaComponent } from './component/home/header-area/header-area.component';
import { CommonModule } from "@angular/common";
import { SiteBrandingAreaComponent } from './component/home/site-branding-area/site-branding-area.component';
import { MainMenuAreaComponent } from './component/home/main-menu-area/main-menu-area.component';
import { SlideAreaComponent } from './component/home/slide-area/slide-area.component';
import { LatestProductsComponent } from './component/home/latest-products/latest-products.component';
import { BrandAreaComponent } from './component/home/brand-area/brand-area.component';
import { FooterComponent } from './component/home/footer/footer.component';
import { WidgetAreaComponent } from './component/home/widget-area/widget-area.component';

import { MatDialogModule } from '@angular/material/dialog';
   

import { CardComponent } from './component/card/card.component';
import { PromoAreaComponent } from './component/home/promo-area/promo-area.component';
import { NewsComponent } from './component/home/news/news.component';
import { VoucherComponent } from './component/voucher/voucher.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DetailsComponent } from './component/details/details.component';


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    HeaderAreaComponent,
    SiteBrandingAreaComponent,
    MainMenuAreaComponent,
    SlideAreaComponent,
    LatestProductsComponent,
    BrandAreaComponent,
    FooterComponent,
    WidgetAreaComponent,
  
    CardComponent, 
    PromoAreaComponent,
    NewsComponent,
    VoucherComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule ,
    MatDialogModule,
    UserRoutingModule,
   
  ],
  providers: [],
  bootstrap: [UserComponent],
})
export class UserModule {}
