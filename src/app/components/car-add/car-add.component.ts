import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;

  constructor(private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:['',Validators.required],
      colorId:['',Validators.required],
      modelYear:['',Validators.required],
      dailyPrice:['',Validators.required],
      description:['',Validators.required]
    })
  }

  addCar(){
    if(this.carAddForm.invalid){
      this.toastrService.error("Eksik bilgi girdiniz.");
    }
  }

}
