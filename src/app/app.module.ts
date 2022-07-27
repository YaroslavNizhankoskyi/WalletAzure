import { WeekStatsComponent } from './stats/week-stats/week-stats.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WalletComponent } from './wallet/wallet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { CreateTransferComponent } from './create-transfer/create-transfer.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { WalletCategoryComponent } from './wallet-category/wallet-category.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [			
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WalletComponent,
    CreateWalletComponent,
      WalletInfoComponent,
      CreateTransferComponent,
      WeekStatsComponent,
      WalletCategoryComponent
   ],
  imports: [  
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.clientId,
        authority: `${environment.cloudInstance}/${environment.authority}`, 
        redirectUri: environment.redirectUri,
      },
      cache: {
        cacheLocation: environment.cacheLocation,
        storeAuthStateInCookie: isIE, 
      }
    }), {
      interactionType: InteractionType.Redirect, 
      authRequest: {
        scopes: [environment.permissions, "api://ba7c7804-3794-4739-abb3-8ae9525454a7/user_impersonation"]
      }
    }, {
      interactionType: InteractionType.Redirect, 
      protectedResourceMap: new Map([ 
          [environment.graphEndpoint, [environment.permissions]],
          ["https://wallet-app-niz.azurewebsites.net",
           ["api://ba7c7804-3794-4739-abb3-8ae9525454a7/user_impersonation"]]
      ])
    }),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }