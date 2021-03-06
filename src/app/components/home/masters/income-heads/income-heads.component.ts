import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


import { IncomeHeadsService } from './income-heads.service';
import { IncomeHeads } from './income-heads.model';


@Component({
  selector: 'app-income-heads',
  templateUrl: './income-heads.component.html',
  styleUrls: ['./income-heads.component.css']
})
export class IncomeHeadsComponent implements OnInit, OnDestroy {

  added = false;
  incomeHead: IncomeHeads[] = [];
  private incomeHeadSub: Subscription;

  constructor(
    public incomeService: IncomeHeadsService
  ) { }

  ngOnInit() {
    this.incomeService.getIncomeHeads();
    this.incomeHeadSub = this.incomeService.getIncomeHeadsUpdatedListener()
      .subscribe((ih) => {
        this.incomeHead = ih;
      });
  }

  ngOnDestroy() {
    if (this.incomeHeadSub) {
      this.incomeHeadSub.unsubscribe();
    }
  }

  onAddIncomeHead(form: NgForm) {
    const income: IncomeHeads = {
      id: null,
      income_head: form.value.i_income_head
    };
    this.incomeService.addIncomeHeads(income);
    this.added = true;
    form.reset();
  }

}
