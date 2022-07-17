import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateWalletComponent } from '../create-wallet/create-wallet.component';
import { Profile } from '../models/Profile';
import { WalletService } from '../services/wallet.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
 
  wallets: any[] = new Array();
  profile: Profile;
  
  constructor(private modal: NgbModal,
  private walletService: WalletService) { }
    

  ngOnInit(): void {
    let userData = localStorage.getItem('profileData')
    this.profile = JSON.parse(userData)

    this.walletService.getUserWallets(this.profile.id).subscribe(wallets => {
      Object.assign(this.wallets, wallets)
    })
  }

  createWallet()
  {
    const ref = this.modal.open(CreateWalletComponent, { centered: true, size: 'lg' });
    ref.componentInstance.userId = this.profile.id;
  }

}
