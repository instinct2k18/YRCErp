import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { College } from './../../../home/masters/college/college.model';
import { CollegeService } from './../../../home/masters/college/college.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-college-delete',
  templateUrl: './college-delete.component.html',
  styleUrls: ['./college-delete.component.css']
})
export class CollegeDeleteComponent implements OnInit, OnDestroy {

  deleted = false;
  clgId = null;
  college: College[] = [];
  private clgSub: Subscription;

  constructor(
    public collegeService: CollegeService
  ) { }

  ngOnInit() {
    this.collegeService.getCollege();
    this.clgSub = this.collegeService.getCollegeUpdatedListener()
      .subscribe((clg) => {
        this.college = clg;
      });
  }

  onSelectCollege(event) {
    this.clgId = event.target['value'];
  }

  onDeleteCollege(form: NgForm) {
    this.collegeService.deleteCollege(this.clgId);
    this.deleted = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.clgSub) {
      this.clgSub.unsubscribe();
    }
  }

}
