import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImage[]=[];
  imageLoaded:boolean = false;
  dataLoaded:boolean=false;
  
  i:number=0;

  carDetailsWithImages:CarDetail[];

  carDetailsLoad=false
  rentalControl=false;
  rentalMessage="";

  constructor(private carService:CarService
    ,private carImageService:CarImageService
    ,private activatedRoute:ActivatedRoute,
    private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getImagesByCarId(params["carId"]);
        this.getCarByCarId(params["carId"]);
        this.getCarRentalControl(params["carId"]);
      }
    })
  }

   getCarByCarId(carId:number){
     this.carService.getCarsByCarId(carId).subscribe(response=>{
       this.carDetailsWithImages=response.data
       this.dataLoaded=true;
     })
   }

   getCarRentalControl(carId:number){
     this.rentalService.getRentalControl(carId).subscribe(response=>{
       this.rentalControl=response.success;
        this.rentalMessage=response.message;
     })
   }

   getImagesByCarId(carId:number){
     this.carImageService.getCarImagesById(carId).subscribe(response=>{
       this.carImages=response.data
       this.imageLoaded=true;
     })
   }

   getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  

}
