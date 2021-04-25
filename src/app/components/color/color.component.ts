import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  
  colors:Color[]=[]
  currentColor:Color;
  allColor:Color;
  @Output() colorId=new EventEmitter();

  constructor(private colorService:ColorService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  setCurrentColor(){
    this.colorId.emit(this.currentColor?.id.toString());
  }

  allColorSelected(){
    this.currentColor==undefined ? true : false;
  }

  getCurrentColor(color:Color){
    if(this.currentColor==color){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
