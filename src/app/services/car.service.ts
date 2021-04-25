import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string="https://localhost:44325/api/cars";

  constructor(private httpClient:HttpClient) { }

  getCarsByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/getcardetailsbycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/getcarsdetailsbybrandid?brandid="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/getcarsdetailsbycolorid?colorid="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/getcarsbybrandidandcolorid?brandid="+brandId+"&colorid="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsWithImage():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"/getallcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

}
