import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";


import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
     MatSelectModule,
     MatCheckboxModule,
     MatChipsModule,
     ReactiveFormsModule,
     FormsModule,
     MatIconModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatToolbarModule,
     MatGridListModule,
     MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OrderComponent],
})
export class AppModule { }
