import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transfer } from '../models/Transfer';
import { Wallet } from '../models/Wallet';

const AZURE_USER_WALLETS = 'https://wallet-app-niz.azurewebsites.net/api/user/'

const AZURE_WALLETS = 'https://wallet-app-niz.azurewebsites.net/api/wallets/'

const AZURE_CREATE_TRANSFER_URL = 'https://prod-24.northcentralus.logic.azure.com:443/workflows/828fecfaef574ace925d29c139a27e96/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kmKbGRW9GCpm_8BvVrlv_-dSXVzIwmP8ezOmVO8Ch64'


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  getUserWallets(userId: string){   
    return this.http.get(AZURE_USER_WALLETS + userId + '/wallets')
    // {'headers' : headers}
  }

  post(wallet: Wallet){  
    return this.http.post(AZURE_WALLETS, wallet)
  }

  createTransfer(transfer: Transfer, lowBalance: boolean){
    const headers= new HttpHeaders()
      .set('Content-Type', 'application/json')
    
    return this.http.post(AZURE_CREATE_TRANSFER_URL, transfer)
  }

  getTransfersWeekStats(walletId: string){     
    return this.http.get(AZURE_WALLETS + walletId + '/transfers/stats')
  }

  getAllWalletTransfers(walletId: string){
    return this.http.get(AZURE_WALLETS + walletId + '/transfers')
  }

  getWalletTransfersByCategory(walletId: string, category: string){
    return this.http.get(AZURE_WALLETS + walletId + '/transfers/categories/' + category)
  }

  getWalletDetails(walletId: string){
    return this.http.get(AZURE_WALLETS + walletId)
  }
}
