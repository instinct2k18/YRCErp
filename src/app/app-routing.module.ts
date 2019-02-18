import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/home/transactions/transactions.component';
import { ReceiptsComponent } from './components/home/transactions/receipts/receipts.component';
import { VoucherComponent } from './components/home/transactions/voucher/voucher.component';

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
import { AboutComponent } from './components/about/about.component';

import { AdminComponent } from './components/auth/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MastersEditComponent } from './components/admin-dashboard/masters-edit/masters-edit.component';
import { MastersDeleteComponent } from './components/admin-dashboard/masters-delete/masters-delete.component';
import { UpdateAffiliationComponent } from './components/admin-dashboard/update-affiliation/update-affiliation.component';
import {
  AcademicYearDeleteComponent
} from './components/admin-dashboard/masters-delete/academic-year-delete/academic-year-delete.component';
import { CollegeDeleteComponent } from './components/admin-dashboard/masters-delete/college-delete/college-delete.component';
import { DistrictDeleteComponent } from './components/admin-dashboard/masters-delete/district-delete/district-delete.component';
import {
  FinancialYearDeleteComponent
} from './components/admin-dashboard/masters-delete/financial-year-delete/financial-year-delete.component';
import { IncomeHeadsDeleteComponent } from './components/admin-dashboard/masters-delete/income-heads-delete/income-heads-delete.component';
import { UniversityDeleteComponent } from './components/admin-dashboard/masters-delete/university-delete/university-delete.component';
import { AcademicYearEditComponent } from './components/admin-dashboard/masters-edit/academic-year-edit/academic-year-edit.component';
import { CollegeEditComponent } from './components/admin-dashboard/masters-edit/college-edit/college-edit.component';
import { DistrictEditComponent } from './components/admin-dashboard/masters-edit/district-edit/district-edit.component';
import { FinancialYearEditComponent } from './components/admin-dashboard/masters-edit/financial-year-edit/financial-year-edit.component';
import { IncomeHeadsEditComponent } from './components/admin-dashboard/masters-edit/income-heads-edit/income-heads-edit.component';
import { UniversityEditComponent } from './components/admin-dashboard/masters-edit/university-edit/university-edit.component';


import { Roles } from './components/auth/roles.model';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {path: '', component: ClerkComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters', component: MastersComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'transactions/receipts', component: ReceiptsComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'transactions/vouchers', component: VoucherComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters/academic_year', component: AcademicYearComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters/college', component: CollegeComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters/district', component: DistrictComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters/financial_year', component: FinancialYearComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters/income_heads', component: IncomeHeadsComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'masters/university', component: UniversityComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'reports/district-wise', component: DistrictWiseComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'reports/university-wise', component: UniversityWiseComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {path: 'collections/college-collection', component: CollegeCollectionComponent, canActivate: [AuthGuard], data: { role: [Roles.Clerk] } },
  {
    path: 'collections/district-collection',
    component: DistrictCollectionComponent,
    canActivate: [AuthGuard],
    data: { role: [Roles.Clerk] }
  },
  {
    path: 'collections/university-collection',
    component: UniversityCollectionComponent,
    canActivate: [AuthGuard],
    data: { role: [Roles.Clerk] }
  },
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent, data: { role: [Roles.Admin] }},
  {path: 'admin/dashboard/masters-edit', component: MastersEditComponent, data: { role: [Roles.Admin] }},
  {path: 'admin/dashboard/masters-delete', component: MastersDeleteComponent, data: { role: [Roles.Admin] }},
  {path: 'admin/dashboard/update-affiliation', component: UpdateAffiliationComponent, data: { role: [Roles.Admin] }},
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
  AdminDashboardComponent,
  MastersEditComponent,
  MastersDeleteComponent,
  UpdateAffiliationComponent,
  AcademicYearDeleteComponent,
  CollegeDeleteComponent,
  DistrictDeleteComponent,
  FinancialYearDeleteComponent,
  IncomeHeadsDeleteComponent,
  UniversityDeleteComponent,
  AcademicYearEditComponent,
  CollegeEditComponent,
  DistrictEditComponent,
  FinancialYearEditComponent,
  IncomeHeadsEditComponent,
  UniversityEditComponent
];
