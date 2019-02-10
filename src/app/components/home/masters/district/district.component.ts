import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistrictService } from './district.service';
import { District } from './district.model';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  added = false;

  constructor(public districtService: DistrictService) { }

  ngOnInit() {
  }

  onAddDistrict(form: NgForm) {
    const district: District = { id: null, district_name: form.value.district_name };
    this.districtService.addDistrict(district);
    this.added = true;
    form.reset();
  }
}
