import { Component, OnInit } from '@angular/core';
import { FinancialYearService } from 'src/app/components/home/masters/financial-year/financial-year.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.css']
})
export class FinancialYearComponent implements OnInit {

  constructor(public financialYearService: FinancialYearService) { }

  ngOnInit() {
  }

  onAddFinancialYear(form: NgForm) {
    this.financialYearService.addFinancialYear(form.value.financial_year);
  }
}
