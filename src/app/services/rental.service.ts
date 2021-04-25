import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rentingCar:Rental;

  apiUrl="https://localhost:44325/api/rentals/";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalControl(carId:number):Observable<ResponseModel>{
    let newPath=this.apiUrl+"getcarcontrol?carid="+carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  setRentingCar(rental:Rental){
    this.rentingCar=rental;
  }

  getRentingCar(){
    return this.rentingCar;
  }

  removeRentingCar(){
    this.rentingCar==null;
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"addrental";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

}
