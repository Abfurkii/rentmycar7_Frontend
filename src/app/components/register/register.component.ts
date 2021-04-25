import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerModel: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorage:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createRegisterModel();
  }

  createRegisterModel() {
    this.registerModel = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  register() {
    if (this.registerModel.valid) {
      let newRegisterModel = Object.assign({}, this.registerModel.value);
      this.authService.register(newRegisterModel).subscribe(
        (response) => {
          this.localStorage.setItem('token',response.data.token)
          this.localStorage.setItem("email",this.registerModel.value.email)
          this.toastrService.success('Kayıt olundu');
        },
        (responseError) => {
          if ((responseError.error == 'Kullanıcı zaten mevcut')) {
            this.toastrService.error(responseError.error);
          } else if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0;i < responseError.error.ValidationErrors.length;i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama hatası!');
            }
          }
        }
      );
    } else {
      this.toastrService.error("Eksik bilgi girdiniz!")
    }
  }
}
