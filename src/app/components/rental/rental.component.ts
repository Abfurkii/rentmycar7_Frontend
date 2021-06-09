import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { DatePipe } from '@angular/common';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  customers:Customer[];
  customerId:number;
  rentDate: Date;
  returnDate : Date;
  @Input() car : CarDetail={
    brandId:0,
    brandName:"",
    carId:0,
    colorId:0,
    colorName:"",
    dailyPrice:0,
    modelYear:"",
    description:"",
    imagePath:""
  };
  

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private carService:CarService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
    this.activatedRoute.params.subscribe(p=>{
      if(p["carId"]){
        this.getCarsByCarId(p["carId"])
      }
    })
  }

  getCarsByCarId(carId:number){
    this.carService.getCarsByCarId(carId).subscribe(response=>{
      this.car=response.data[0];
    })
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let newDate = new Date();
      newDate.setDate(stringToDate.getDate() + 1);
      return newDate.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  createRental() {
    let MyRental: RentalDetail = {
      carId : this.car.carId,
      brandName : this.car.brandName,
      colorName : this.car.colorName,
      dailyPrice : this.car.dailyPrice,
      description : this.car.description,
      customerId : this.customerId,
      rentDate : this.rentDate,
      returnDate : this.returnDate,
    };
    if (MyRental.customerId == undefined || MyRental.rentDate == undefined) {
      this.toastrService.error("Eksik bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
      this.router.navigate(['/cars/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz...',
        'Ödeme İşlemleri'
      );
    }
  }
  setCustomerId(customerId: string) {
    this.customerId = +customerId;
  }
  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

}
