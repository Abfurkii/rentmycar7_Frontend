import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  brandId:string="";
  colorId:string="";
  constructor(private router:Router,
    private localStorage:LocalStorageService) { }

  ngOnInit(): void {
  }

  currentBrandId(event:any){
    this.brandId=event;
  }

  currentColorId(event:any){
    this.colorId=event;
  }

  setRoute(){
    if(this.brandId && this.colorId){
      this.router.navigate(['cars/brands/'+this.brandId+'/colors/'+this.colorId]);
    }
    else if(this.brandId){
      this.router.navigate(['cars/brands/'+this.brandId]);
    }
    else if(this.colorId){
      this.router.navigate(['cars/colors/'+this.colorId]);
    }
    else{
      this.router.navigate(['cars/']);
    }
  }

  clearRoute(){
    this.router.navigate(['cars/']);
  }

  canView():boolean{
    if(this.localStorage.get("token")){
      return true;
    }
    return false;
  }

}
