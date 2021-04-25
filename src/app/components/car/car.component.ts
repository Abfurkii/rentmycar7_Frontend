import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  
  filterText: string = '';
  error:boolean=false;

  carDetailsWithImage:CarDetail[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByBrandIdAndColorId(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      }else{
        this.getCarDetailsWithImage();
      }
    });
  }

  getCarsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.carDetailsWithImage = response.data;
      },responseError=>{
        if(responseError.error.data==null){
          this.toastrService.error("Araç bulunamadı!")
          this.error=true
        }
      });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
        this.toastrService.error("Araç bulunamadı!")
      this.carDetailsWithImage = response.data;
    },responseError=>{
      if(responseError.error.data==null){
        this.toastrService.error("Araç bulunamadı!")
        this.error=true
      }
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.carDetailsWithImage = response.data;
    },responseError=>{
      this.toastrService.error("Araç bulunamadı!")
      this.error=true
    });
  }

  getCarDetailsWithImage(){
    this.carService.getCarDetailsWithImage().subscribe(response=>{
      this.carDetailsWithImage=response.data
    })
  }

}
