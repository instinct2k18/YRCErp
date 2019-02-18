import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { District } from './../../../home/masters/district/district.model';
import { DistrictService } from './../../../home/masters/district/district.service';

@Component({
  selector: 'app-district-delete',
  templateUrl: './district-delete.component.html',
  styleUrls: ['./district-delete.component.css']
})
export class DistrictDeleteComponent implements OnInit, OnDestroy {

  deleted = false;
  distId = null;
  dist: District[] = [];
  private distSub: Subscription;

  constructor(
    public districtService: DistrictService
  ) { }

  ngOnInit() {
    this.districtService.getDistrict();
    this.distSub = this.districtService.getDistrictUpdatedListener()
      .subscribe((d) => {
        this.dist = d;
      });
  }

  onSelectDistrict(event) {
    this.distId = event.target['value'];
  }

  onDeleteDistrict(form: NgForm) {
    this.districtService.deleteDistrict(this.distId);
    this.deleted = true;
    form.reset();
  }

  ngOnDestroy() {
    if (this.distSub) {
      this.distSub.unsubscribe();
    }
  }

}
