import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44325/api/carimage";

  constructor(private httpClient:HttpClient) { }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"/getimagebycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImagesByBrandId(brandId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"/getimagebybrandid?brandid="+brandId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesByColorId(colorId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"/getimagebycolorid?colorid="+colorId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  
  getCarImagesByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"/getimagebybrandidandcolorid?brandid="+brandId+"&colorid="+colorId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getAllImages():Observable<ListResponseModel<CarImage>>{
    let newPath="/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
