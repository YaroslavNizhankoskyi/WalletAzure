import { WalletCategoryComponent } from './wallet-category/wallet-category.component';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { WalletComponent } from './wallet/wallet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'wallet/info',
    component: WalletInfoComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'wallet/category',
    component: WalletCategoryComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabledBlocking' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }