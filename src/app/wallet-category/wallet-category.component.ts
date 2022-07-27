import { WalletService } from 'src/app/services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet-category',
  templateUrl: './wallet-category.component.html',
  styleUrls: ['./wallet-category.component.css']
})
export class WalletCategoryComponent implements OnInit {

  category: string = 'default';
  transfers: any;

  constructor(private walletService: WalletService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParamMap.subscribe((x) => {
      let id = x.get('id') 
      this.category = x.get('category')
      
      this.walletService.getWalletTransfersByCategory(id, this.category).subscribe(x => {
        this.transfers = x
      })
    })
  }


  
}
