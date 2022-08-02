import { WalletService } from './../services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTransferComponent } from '../create-transfer/create-transfer.component';
import { Wallet } from '../models/Wallet';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {

  wallet: any;
  transfers: any;
  stats: any;
  date: Date 
  statsLoaded = false;
  id: string

  constructor(private router: ActivatedRoute,
    private modal: NgbModal,
    private walletService: WalletService
    ) { }

  ngOnInit() {

    this.date = new Date('2022-07-22T09:56:05.5227794+00:00')

    console.log(this.date)

    this.router.queryParamMap.subscribe((x) => {
      this.id = x.get('id')      

      this.walletService.getWalletDetails(this.id).subscribe(x => {
        this.wallet = x
      })

      this.walletService.getAllWalletTransfers(this.id).subscribe(x =>{
        console.log(x)
        this.transfers = x
      })
    })

  }

  createTransfer(){
    const ref = this.modal.open(CreateTransferComponent, { centered: true, size: 'lg' });
    ref.componentInstance.walletId = this.wallet.id;
    ref.componentInstance.walletName = this.wallet.name;
    ref.componentInstance.amount = this.wallet.amount;
  }
}
