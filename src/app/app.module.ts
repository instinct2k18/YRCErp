import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MastersComponent } from './components/masters/masters.component';
import { AcademicYearComponent } from './components/masters/academic-year/academic-year.component';
import { FinancialYearComponent } from './components/masters/financial-year/financial-year.component';
import { UniversityComponent } from './components/masters/university/university.component';
import { DistrictComponent } from './components/masters/district/district.component';
import { CollegeComponent } from './components/masters/college/college.component';
import { IncomeHeadsComponent } from './components/masters/income-heads/income-heads.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MastersComponent,
    AcademicYearComponent,
    FinancialYearComponent,
    UniversityComponent,
    DistrictComponent,
    CollegeComponent,
    IncomeHeadsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
