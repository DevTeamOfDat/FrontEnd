import { NgModule } from "@angular/core";

import { HomeComponent } from "./component/home/home.component";
import { HeaderAreaComponent } from "./component/home/header-area/header-area.component";
import { NgxPaginationModule } from "ngx-pagination";
import { SiteBrandingAreaComponent } from "./component/home/site-branding-area/site-branding-area.component";
import { MainMenuAreaComponent } from "./component/home/main-menu-area/main-menu-area.component";
import { SlideAreaComponent } from "./component/home/slide-area/slide-area.component";
import { LatestProductsComponent } from "./component/home/latest-products/latest-products.component";
import { BrandAreaComponent } from "./component/home/brand-area/brand-area.component";
import { FooterComponent } from "./component/home/footer/footer.component";
import { WidgetAreaComponent } from "./component/home/widget-area/widget-area.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./component/card/card.component";
import { PromoAreaComponent } from "./component/home/promo-area/promo-area.component";
import { NewsComponent } from "./component/home/news/news.component";
import { VoucherComponent } from "./component/voucher/voucher.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { DetailProductsComponent } from "./component/detail-products/detail-products.component";
import { ProductListComponent } from "./component/home/product-list/product-list.component";
import { ProductItemComponent } from "./component/home/product-list/product-item/product-item.component";
import { CartItemComponent } from "./component/card/cart-item/cart-item.component";
import { CategoryComponent } from "./component/category/category.component";

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
    DetailProductsComponent,
    ProductListComponent,
    ProductItemComponent,
    CartItemComponent,
    CategoryComponent,
  ],
  imports: [
    MatDialogModule,
    UserRoutingModule,
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [UserComponent],
})
export class UserModule {}
