import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl:string="https://localhost:44325/api/brands/getall";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl)
  }
}
