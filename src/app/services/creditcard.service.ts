import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  apiUrl="https://localhost:44325/api/creditcards/"
  creditCardDB:CreditCard={
    creditCardNumber:"",
    ccv:"",
    memberId:0,
    month:0,
    name:"",
    year:0
  };

  constructor(private httpClient:HttpClient) { }

  add(creditCart:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", creditCart);
  }

  getAllByMemberId(memberId:number):Observable<ListResponseModel<CreditCard>>{
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl+"getallbymemberid?memberid="+memberId);
  }

  getByMemberId(memberId:number):Observable<SingleResponseModel<CreditCard>>{
    let result=this.httpClient.get<SingleResponseModel<CreditCard>>(this.apiUrl+"getbymemberid?memberid="+memberId)
    result.subscribe(response=>{
      this.creditCardDB=response.data;
    })
    return result;
  }

  creditCardControl(creditCard:CreditCard):boolean{
    if(creditCard.name.toUpperCase()==this.creditCardDB.name.toUpperCase() && creditCard.creditCardNumber.trim().replace(' ','').replace(' ','').replace(' ','')==this.creditCardDB.creditCardNumber.trim() && creditCard.month==this.creditCardDB.month
      && creditCard.year==this.creditCardDB.year && creditCard.ccv==this.creditCardDB.ccv){
        console.log(true)
         return true;
      }
    return false;
  }

}
