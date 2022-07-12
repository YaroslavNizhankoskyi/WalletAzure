import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile } from './models/Profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Wallet-app';
  isIframe = false;
  loginDisplay = false;
  profile!: Profile;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService, 
    private authService: MsalService,
    private http: HttpClient) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    } else {
      this.authService.loginRedirect()    
    }
  }

  logout() { 
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.redirectUri
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;    
    if(this.loginDisplay){      
      let profileData = localStorage.getItem('profileData')

      if(profileData == null){
        this.getProfile()
      }else{
        this.profile = JSON.parse(profileData)        
      }
    }
  }
  
  getProfile() {
    this.http.get(environment.graphEndpoint)
      .subscribe(profile => {
        this.profile = profile;
        var profileData = JSON.stringify(profile)
        localStorage.setItem('profileData', profileData)
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
    this.removeProfileData()
  }

  removeProfileData(){
    localStorage.removeItem('profileData')
  }
}