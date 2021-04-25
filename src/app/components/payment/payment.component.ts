import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Payment } from 'src/app/models/payment';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { from } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { Rental } from 'src/app/models/rental';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rentalAddForm: FormGroup;

  rentalDetail: RentalDetail;

  rental: Rental;
  payment: Payment={
    cardId:0,
    id:0,
    memberId:0,
    totalPrice:0
  }
  creditCart: CreditCard;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carId']) {
        this.setRentalDetail(param["carId"])
        //this.rentACar();

        this.createPaymentForm();
        this.paymentCalculator();
      }
    });
  }

  createPaymentForm() {
    this.rentalAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      creditCartNumber: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  setRentalDetail(rentalDetail: any) {
    this.rentalDetail = JSON.parse(rentalDetail);
  }

  rentACar() {
    // this.payment.memberId=Number(this.localStorage.get('userId'));
    // this.payment.carId=this.rental.carId
    // this.payment.processDate=this.getCurrentDate()
    // this.paymentCalculator();
    // console.log(this.payment)
    if (this.rentalAddForm.valid) {
      this.setPayment();
      this.setRental();
    } else {
      this.toastrService.error('Eksik bilgi girdiniz!');
    }
  }

  setPayment() {
    this.payment.cardId = this.rentalDetail.carId;
    this.memberService
      .getByEmail(this.localStorage.get('email'))
      .subscribe((response) => {
        this.payment.memberId = response.data.id;
      });
    this.payment.processDate = this.getCurrentDate();
    console.log(this.payment);
  }

  setRental(){
    this.rental.carId=this.rentalDetail.carId;
    this.rental.customerId=this.rentalDetail.customerId;
    this.rental.rentDate=this.rentalDetail.rentDate;
    this.rental.returnDate=this.rentalDetail.returnDate;
  }

  paymentCalculator() {
    if (this.rentalDetail.returnDate != null) {
      let date1 = new Date(this.rentalDetail.returnDate.toString());
      let date2 = new Date(this.rentalDetail.rentDate.toString());
      let difference = date1.getTime() - date2.getTime();
      let numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.payment.totalPrice = numberOfDays * this.rentalDetail.dailyPrice;
    }
    console.log(this.payment.totalPrice);
  }

  getCurrentDate(): Date {
    let currentDate = new Date(Date.now());
    return currentDate;
  }
}
