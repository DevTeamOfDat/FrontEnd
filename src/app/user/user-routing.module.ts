import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';



import { CardComponent } from './component/card/card.component';
import { VoucherComponent } from './component/voucher/voucher.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
    path: '',
    component: UserComponent,
    children: [
        {path: 'home', component: HomeComponent },
        {path: 'voucher' , component: VoucherComponent},
        {path: 'cart', component: CardComponent },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: '',
        },
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
