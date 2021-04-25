import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  apiUrl="https://localhost:44325/api/members/"

  constructor(private httpClient:HttpClient) { }

  getByEmail(email:string):Observable<SingleResponseModel<Member>>{
    return this.httpClient.get<SingleResponseModel<Member>>(this.apiUrl+"getmemberdtobyemail?email="+email)
  }

}
