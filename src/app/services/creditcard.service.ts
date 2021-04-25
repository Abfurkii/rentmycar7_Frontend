import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  apiUrl="https://localhost:44325/api/creditcards"

  constructor(private httpClient:HttpClient) { }

  add(creditCart:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", creditCart);
  }

  getByMemberId(memberId:number):Observable<ListResponseModel<CreditCard>>{
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl+"getbymemberid")
  }

}
