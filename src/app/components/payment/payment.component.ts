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
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { from } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { Rental } from 'src/app/models/rental';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rentalAddForm: FormGroup;
  creditCardForm: CreditCard={
    creditCardNumber:"",
    ccv:"",
    memberId:0,
    month:0,
    name:"",
    year:0
  };

  rentalDetail: RentalDetail;
  memberId: number = 0;

  rental: Rental={
    carId:0,
    customerId:0,
    rentDate:new Date(),
    returnDate:new Date()
  };
  payment: Payment = {
    cardId: 0,
    memberId: 0,
    totalPrice: 0,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private creditCardsService: CreditcardService,
    private paymentService:PaymentService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.setRentalDetail(param['carId']);
    });

    this.createPaymentForm();
    this.paymentCalculator();
    this.getMemberIdByEmail();
  }

  //*
  createPaymentForm() {
    this.rentalAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      creditCardNumber: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      ccv: ['', Validators.required],
    });
  }

  //*
  setRentalDetail(rentalDetail: any) {
    this.rentalDetail = JSON.parse(rentalDetail);
  }

  rentACar() {
    if (this.rentalAddForm.valid) {
      this.creditCardForm = Object.assign({}, this.rentalAddForm.value);
      this.setPayment();
      this.setRental();
      this.rentalService.add(this.rental).subscribe();
      this.paymentService.add(this.payment).subscribe();
      this.toastrService.success("Ödeme başarılı!")
    } else {
      this.toastrService.error('Eksik bilgi girdiniz!');
    }
  }

  setPayment() {
    //this.rentalDetail.carId;
    this.payment.memberId = this.memberId;
    this.creditCardsService.getByMemberId(this.memberId).subscribe(
      (response) => {
        if (this.creditCardsService.creditCardControl(this.creditCardForm)) {
          this.payment.cardId = response.data.id;
        }else{
          this.toastrService.error("Kart bilgisi/bilgileri yanlış!");
        }
      },
      (responseError) => {
        this.toastrService.error('Kredi kartı bulunamadı!');
      }
    );
    this.payment.processDate = this.getCurrentDate();
  }

  setRental() {
    this.rental.carId = this.rentalDetail.carId;
    this.rental.customerId = this.rentalDetail.customerId;
    this.rental.rentDate = this.rentalDetail.rentDate;
    this.rental.returnDate = this.rentalDetail.returnDate;
  }

  //*
  paymentCalculator() {
    if (this.rentalDetail.returnDate != null) {
      let date1 = new Date(this.rentalDetail.returnDate.toString());
      let date2 = new Date(this.rentalDetail.rentDate.toString());
      let difference = date1.getTime() - date2.getTime();
      let numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.payment.totalPrice = numberOfDays * this.rentalDetail.dailyPrice;
    }
  }

  getCurrentDate(): Date {
    let currentDate = new Date(Date.now());
    return currentDate;
  }

  getMemberIdByEmail() {
    this.memberService
      .getByEmail(this.localStorage.get('email'))
      .subscribe((response) => {
        this.memberId = response.data.id;
      });
  }
}
