import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wallet } from '../models/Wallet';

const AZURE_READ_USER_WALLETS_FUNCTION_CODE = 'QSR0tF5zkyyMFYyMlJxo9A63noz90G1q_HJZwlFO7fF0AzFu2Z3M5Q=='
const AZURE_READ_USER_WALLETS_FUNCTION_URL = 'https://wallet-app-niz.azurewebsites.net/api/user/'

const AZURE_CREATE_WALLET_FUNCTION_CODE = 'kfgn2PtI1YbUKeXRZZeJXLcQqgrSSfmE5PZG9hWhEFnIAzFucQjkJg=='
const AZURE_CREATE_WALLET_FUNCTION_URL = 'https://wallet-app-niz.azurewebsites.net/api/AddWalletFunction'

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  getUserWallets(userId: string){
    const headers= new HttpHeaders()
      .set('x-functions-key', AZURE_READ_USER_WALLETS_FUNCTION_CODE)
    
    return this.http.get(AZURE_READ_USER_WALLETS_FUNCTION_URL + userId)
    // {'headers' : headers}
  }

  post(wallet: Wallet){
    const headers= new HttpHeaders()
      .set('x-functions-key', AZURE_CREATE_WALLET_FUNCTION_CODE)
      .set('Content-Type', 'application/json')
    
    return this.http.post(AZURE_CREATE_WALLET_FUNCTION_URL, wallet)
  }


}
