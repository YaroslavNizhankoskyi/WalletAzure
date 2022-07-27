import { Transfer } from './../models/Transfer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WalletService } from '../services/wallet.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {

  walletId: string;
  walletName: string;
  amount: string;
  userEmail = 'yaroslav.nishankovskyi@gmail.com'

  categories = ['education', 'entertainment', 'medicine', 'clothes', 'traveling']

  constructor(private walletService: WalletService, 
    public modal: NgbActiveModal,
    private fb: FormBuilder) { }


  transferForm = this.fb.group({
    amount : ['',[
      Validators.required,
      Validators.min(-10000),
      Validators.max(10000)
      ]
    ],
    category: ['', Validators.required]
  })

  ngOnInit() {
  }

  create(){
    let transferForm = Object.assign({}, this.transferForm.value);
    let leftAmount = +(parseInt(this.amount) +  parseInt(transferForm.amount));
    
    let transfer: Transfer = {   
      userEmail: this.userEmail,
      amount: +transferForm.amount,
      walletId: this.walletId,
      leftAmount: +leftAmount,
      walletName: this.walletName,
      category: transferForm.category,
      id: uuidv4()      
    }

    console.log(transfer);
    
    let lowbalance = leftAmount < 100

    this.walletService.createTransfer(transfer, lowbalance).subscribe(x => {
      this.finalize()      
    }).add(this.finalize())
  }

  finalize(){
    this.modal.close(); 
    window.location.reload()
  }
}
