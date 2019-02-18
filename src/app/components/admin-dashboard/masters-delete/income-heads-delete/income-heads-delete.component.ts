import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IncomeHeads } from './../../../home/masters/income-heads/income-heads.model';
import { CollegeService } from './../../../home/masters/college/college.service';
import { NgForm } from '@angular/forms';
import { IncomeHeadsService } from './../../../home/masters/income-heads/income-heads.service';

@Component({
  selector: 'app-income-heads-delete',
  templateUrl: './income-heads-delete.component.html',
  styleUrls: ['./income-heads-delete.component.css']
})
export class IncomeHeadsDeleteComponent implements OnInit , OnDestroy {

  deleted = false;
  iHId = null;
  incomeHead: IncomeHeads[] = [];
  private iHSub: Subscription;

  constructor(
    public incomeHeadService: IncomeHeadsService
  ) { }

  ngOnInit() {
    this.incomeHeadService.getIncomeHeads();
    this.iHSub = this.incomeHeadService.getIncomeHeadsUpdatedListener()
      .subscribe((ih) => {
        this.incomeHead = ih;
      });
  }

  onSelectIncomeHead(event) {
    this.iHId = event.target['value'];
  }

  onDeleteIncomeHead(form: NgForm) {
    this.incomeHeadService.deleteIncomeHead(this.iHId);
    this.deleted = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.iHSub) {
      this.iHSub.unsubscribe();
    }
  }

}
