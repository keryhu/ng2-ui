import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from "@angular/material";

import {SharedModule,NotFoundComponent} from "./shared";
import {CoreModule,SideMenuModule} from "./core";

import {AppComponent} from './app.component';
import { HomeComponent } from './components';
import {Ng2UiRoutingModule} from "./app-routing.module";




//navbarComponent ,不能放到coreModule里面

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2UiRoutingModule,
    SharedModule,
    CoreModule,
    SideMenuModule,
    MaterialModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
