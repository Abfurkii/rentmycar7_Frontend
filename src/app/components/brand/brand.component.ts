import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand:Brand;
  allBrand:Brand;
  @Output() brandId =new EventEmitter();

  constructor(private brandService:BrandService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  setCurrentBrand(){
    this.brandId.emit(this.currentBrand?.id.toString());
  }

  allBrandSelected(){
    return this.currentBrand==undefined ? true : false;
  }

  getCurrentBrand(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

}
