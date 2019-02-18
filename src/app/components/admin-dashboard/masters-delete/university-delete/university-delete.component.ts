import { Component, OnInit, OnDestroy } from '@angular/core';
import { University } from './../../../home/masters/university/university.model';
import { Subscription } from 'rxjs';
import { UniversityService } from './../../../home/masters/university/university.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-university-delete',
  templateUrl: './university-delete.component.html',
  styleUrls: ['./university-delete.component.css']
})
export class UniversityDeleteComponent implements OnInit, OnDestroy {

  deleted = false;
  universityId = null;
  university: University[] = [];
  private universitySub: Subscription;

  constructor(
    public universityService: UniversityService
  ) { }

  ngOnInit() {
    this.universityService.getUniversity();
    this.universitySub = this.universityService.getUniversityUpdatedListener()
      .subscribe((university) => {
        this.university = university;
      });
  }

  onSelectAcYear(event) {
    this.universityId = event.target['value'];
  }

  onDeleteUniveristy(form: NgForm) {
    this.universityService.deleteUniversity(this.universityId);
    this.deleted = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.universitySub) {
      this.universitySub.unsubscribe();
    }
  }

}
