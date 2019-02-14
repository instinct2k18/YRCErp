import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/home/transactions/transactions.component';
import { ReceiptsComponent } from './components/home/transactions/receipts/receipts.component';
import { VoucherComponent } from './components/home/transactions/voucher/voucher.component';

import { AdminComponent } from './components/auth/admin/admin.component';
import { ClerkComponent } from './components/auth/clerk/clerk.component';
import { MastersComponent } from './components/home/masters/masters.component';
import { AcademicYearComponent } from './components/home/masters/academic-year/academic-year.component';
import { CollegeComponent } from './components/home/masters/college/college.component';
import { DistrictComponent } from './components/home/masters/district/district.component';
import { FinancialYearComponent } from './components/home/masters/financial-year/financial-year.component';
import { IncomeHeadsComponent } from './components/home/masters/income-heads/income-heads.component';
import { UniversityComponent } from './components/home/masters/university/university.component';


import { ReportsComponent } from './components/home/reports/reports.component';
import { UniversityWiseComponent } from './components/home/reports/university-wise/university-wise.component';
import { DistrictWiseComponent } from './components/home/reports/district-wise/district-wise.component';

import { CollectionsComponent } from './components/home/collections/collections.component';
import { DistrictCollectionComponent } from './components/home/collections/district-collection/district-collection.component';
import { UniversityCollectionComponent } from './components/home/collections/university-collection/university-collection.component';
import { CollegeCollectionComponent } from './components/home/collections/college-collection/college-collection.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AboutComponent } from './components/about/about.component';

import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {path: '', component: ClerkComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'masters', component: MastersComponent, canActivate: [AuthGuard] },
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  {path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard] },
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  {path: 'transactions/receipts', component: ReceiptsComponent, canActivate: [AuthGuard] },
  {path: 'transactions/vouchers', component: VoucherComponent, canActivate: [AuthGuard] },
  {path: 'masters/academic_year', component: AcademicYearComponent, canActivate: [AuthGuard] },
  {path: 'masters/college', component: CollegeComponent, canActivate: [AuthGuard] },
  {path: 'masters/district', component: DistrictComponent, canActivate: [AuthGuard] },
  {path: 'masters/financial_year', component: FinancialYearComponent, canActivate: [AuthGuard] },
  {path: 'masters/income_heads', component: IncomeHeadsComponent, canActivate: [AuthGuard] },
  {path: 'masters/university', component: UniversityComponent, canActivate: [AuthGuard] },
  {path: 'reports/district-wise', component: DistrictWiseComponent, canActivate: [AuthGuard]},
  {path: 'reports/university-wise', component: UniversityWiseComponent, canActivate: [AuthGuard]},
  {path: 'collections/college-collection', component: CollegeCollectionComponent, canActivate: [AuthGuard]},
  {path: 'collections/district-collection', component: DistrictCollectionComponent, canActivate: [AuthGuard]},
  {path: 'collections/university-collection', component: UniversityCollectionComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

export const ModulesList = [
  NavbarComponent,
  IndexComponent,
  HomeComponent,
  MastersComponent,
  AcademicYearComponent,
  FinancialYearComponent,
  UniversityComponent,
  DistrictComponent,
  CollegeComponent,
  IncomeHeadsComponent,
  AdminComponent,
  ReportsComponent,
  TransactionsComponent,
  ReceiptsComponent,
  VoucherComponent,
  DistrictWiseComponent,
  UniversityWiseComponent,
  CollectionsComponent,
  DistrictCollectionComponent,
  UniversityCollectionComponent,
  CollegeCollectionComponent,
  AboutComponent,
  ClerkComponent,
  AdminDashboardComponent
];
