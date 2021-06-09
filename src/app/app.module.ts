import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarAddComponent } from './components/car-add/car-add.component';



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarComponent,
    CarDetailComponent,
    CarFilterPipePipe,
    SidebarComponent,
    RentalComponent,
    LoginComponent,
    RegisterComponent,
    PaymentComponent,
    FooterComponent,
    CarAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }) ,
    
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
