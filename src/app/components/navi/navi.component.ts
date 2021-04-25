import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  authControl:boolean=false;

  member:Member

  constructor(private authService:AuthService,
    private memberService:MemberService,
    private localStogeService:LocalStorageService) { }

  ngOnInit(): void {
    this.getAutoControl();
    this.getMember();
  }

  getAutoControl(){
    if(this.authService.isAuthenticated()==true){
      this.authControl=true;
    }else{
      this.authControl=false;
    }
  }

  getMember(){
    let email = this.localStogeService.get("email");
    this.memberService.getByEmail(email).subscribe(response=>{
      this.member=response.data;
    })
  }

}
