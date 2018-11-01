import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { MastersComponent } from './components/home/masters/masters.component';
import { ReportsComponent } from './components/home/reports/reports.component';
import { AcademicYearComponent } from './components/home/masters/academic-year/academic-year.component';
import { CollegeComponent } from './components/home/masters/college/college.component';
import { DistrictComponent } from './components/home/masters/district/district.component';
import { FinancialYearComponent } from './components/home/masters/financial-year/financial-year.component';
import { IncomeHeadsComponent } from './components/home/masters/income-heads/income-heads.component';
import { UniversityComponent } from './components/home/masters/university/university.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'masters', component: MastersComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'masters/academic_year', component: AcademicYearComponent},
  {path: 'masters/college', component: CollegeComponent},
  {path: 'masters/district', component: DistrictComponent},
  {path: 'masters/financial_year', component: FinancialYearComponent},
  {path: 'masters/income_heads', component: IncomeHeadsComponent},
  {path: 'masters/university', component: UniversityComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ModulesList = [
  HomeComponent,
  MastersComponent,
  AcademicYearComponent,
  FinancialYearComponent,
  UniversityComponent,
  DistrictComponent,
  CollegeComponent,
  IncomeHeadsComponent,
  AdminComponent,
  ReportsComponent
];
