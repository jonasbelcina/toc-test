import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './user/signup/signup.component';
import { UserService } from './user/user.service';
import { LoginComponent } from './user/login/login.component';
import { EventsComponent } from './events/events/events.component';
import { EventsService } from './events/events.service';
import { EventListComponent } from './events/event-list/event-list.component';
import { SearchPipe } from './events/search.pipe';
import { ProductPipe } from './events/product.pipe';
import { LocationPipe } from './events/location.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    EventsComponent,
    EventListComponent,
    SearchPipe,
    ProductPipe,
    LocationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
