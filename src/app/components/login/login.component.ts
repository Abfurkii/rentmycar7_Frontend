import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorage:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm= this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Giriş başarılı")
        this.localStorage.setItem("token",response.data.token)
        this.localStorage.setItem("email",this.loginForm.value.email)
        this.router.navigate(["/cars"])
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Eksik bilgi girdiniz","Hata")
    }
  }

}
