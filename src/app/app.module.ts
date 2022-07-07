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
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.clientId,
        authority: `${environment.cloudInstance}/${environment.authority}`, 
        redirectUri: environment.redirectUri
      },
      cache: {
        cacheLocation: environment.cacheLocation,
        storeAuthStateInCookie: isIE, 
      }
    }), {
      interactionType: InteractionType.Redirect, 
      authRequest: {
        scopes: [environment.permissions]
      }
    }, {
      interactionType: InteractionType.Redirect, 
      protectedResourceMap: new Map([ 
          [environment.graphEndpoint, [environment.permissions]]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }