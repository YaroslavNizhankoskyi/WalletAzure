import { WalletService } from './../services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  walletModel: FormGroup;
  userId: string;

  constructor(private fb: FormBuilder, 
    private walletService: WalletService, 
    public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.fillForm()
  }

  fillForm() {
    this.walletModel = this.fb.group({
      name: ['', [Validators.maxLength(50), Validators.required]],
      amount: [0, [Validators.required, Validators.min(0), Validators.max(20000)]],
      userId: [this.userId, Validators.required]
    });
  }

  createWallet(){
    let wallet = Object.assign({}, this.walletModel.value);
    wallet.amount = +wallet.amount    

    this.walletService.post(wallet).subscribe(x =>{
      this.modal.close();
    })
  }

}


