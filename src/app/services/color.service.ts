import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44325/api/colors/getall";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl)
  }

}
