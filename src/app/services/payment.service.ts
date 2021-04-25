import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rental:Rental
  totalPrice:number

  apiUrl="https://localhost:44325/api/payments"

  constructor(private httpClient:HttpClient) { }

  add(payment:Payment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",payment)
  }

  setRental(){
    
  }

}
